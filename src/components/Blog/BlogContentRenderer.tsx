import React from "react";
import Image from "next/image";

type Block =
  | { type: "paragraph"; text: string }
  | { type: "heading"; text: string; level?: number }
  | { type: "code"; code: string; language?: string }
  | { type: "image"; url: string; alt?: string }
  | { type: "bulletine"; items: string[] }
  | { type: "orderedList"; items: string[] }
  | { type: "divider" }
  | { type: "link"; url: string; text: string }
  | { type: "table"; headers: string[]; rows: string[][] };

interface BlogContentRendererProps {
  content: string;
}

// Helper function to convert Lexical nodes to our block format
function convertLexicalToBlocks(nodes: any[]): Block[] {
  const blocks: Block[] = [];

  for (const node of nodes) {
    if (node.type === 'paragraph') {
      const text = extractTextFromNode(node);
      if (text.trim()) {
        blocks.push({ type: 'paragraph', text });
      }
    } else if (node.type === 'heading') {
      const text = extractTextFromNode(node);
      const level = parseInt(node.tag?.replace('h', '') || '2');
      blocks.push({ type: 'heading', text, level });
    } else if (node.type === 'list') {
      const items = node.children?.map((item: any) => extractTextFromNode(item)) || [];
      if (node.listType === 'bullet') {
        blocks.push({ type: 'bulletine', items });
      } else if (node.listType === 'number') {
        blocks.push({ type: 'orderedList', items });
      }
    } else if (node.type === 'quote') {
      const text = extractTextFromNode(node);
      blocks.push({ type: 'paragraph', text }); // Render quotes as paragraphs for now
    } else if (node.type === 'code') {
      blocks.push({ type: 'code', code: node.code || '', language: node.language });
    }
  }

  return blocks;
}

// Helper to extract text from a Lexical node
function extractTextFromNode(node: any): string {
  if (!node.children) return '';

  return node.children
    .map((child: any) => {
      if (child.type === 'text') {
        return child.text || '';
      } else if (child.children) {
        return extractTextFromNode(child);
      }
      return '';
    })
    .join('');
}


export default function BlogContentRenderer({ content }: BlogContentRendererProps) {
  let blocks: Block[] = [];
  let isLexicalFormat = false;

  try {
    const parsed = JSON.parse(content);

    // Check if it's Lexical format (has root object)
    if (parsed.root && parsed.root.children) {
      isLexicalFormat = true;
      // Convert Lexical format to our block format for rendering
      blocks = convertLexicalToBlocks(parsed.root.children);
    } else if (Array.isArray(parsed)) {
      // Legacy custom block format
      blocks = parsed;
    } else {
      // Unknown format, fallback to HTML
      return <div dangerouslySetInnerHTML={{ __html: content }} />;
    }
  } catch {
    // Not JSON, try as HTML
    return <div dangerouslySetInnerHTML={{ __html: content }} />;
  }

  return (
    <div className="space-y-6">
      {blocks.map((block, idx) => {
        switch (block.type) {
          case "paragraph":
            return (
              <p key={idx} className="text-base leading-relaxed">
                {block.text}
              </p>
            );

          case "heading":
            const level = block.level || 2;
            const headingClasses = {
              1: "text-4xl font-bold mb-4 mt-8",
              2: "text-3xl font-bold mb-3 mt-6",
              3: "text-2xl font-bold mb-3 mt-5",
              4: "text-xl font-semibold mb-2 mt-4",
              5: "text-lg font-semibold mb-2 mt-3",
              6: "text-base font-semibold mb-2 mt-2",
            };
            return React.createElement(
              `h${level}`,
              { key: idx, className: headingClasses[level] },
              block.text
            );

          case "code":
            return (
              <div key={idx} className="my-4">
                {block.language && (
                  <div className="bg-gray-800 text-gray-300 px-4 py-2 text-xs font-mono rounded-t-md">
                    {block.language}
                  </div>
                )}
                <pre className={`bg-gray-900 text-green-400 p-4 overflow-x-auto ${block.language ? 'rounded-b-md' : 'rounded-md'}`}>
                  <code className="font-mono text-sm">{block.code}</code>
                </pre>
              </div>
            );

          case "image":
            return (
              <div key={idx} className="my-6">
                <div className="relative w-full h-auto">
                  <img
                    src={block.url}
                    alt={block.alt || "Blog image"}
                    className="w-full h-auto rounded-lg"
                  />
                </div>
                {block.alt && (
                  <p className="text-sm text-gray-600 dark:text-gray-400 text-center mt-2 italic">
                    {block.alt}
                  </p>
                )}
              </div>
            );

          case "bulletine":
            return (
              <ul key={idx} className="list-disc list-inside space-y-2 my-4">
                {block.items.map((item, i) => (
                  <li key={i} className="text-base leading-relaxed">
                    {item}
                  </li>
                ))}
              </ul>
            );

          case "orderedList":
            return (
              <ol key={idx} className="list-decimal list-inside space-y-2 my-4">
                {block.items.map((item, i) => (
                  <li key={i} className="text-base leading-relaxed">
                    {item}
                  </li>
                ))}
              </ol>
            );

          case "divider":
            return (
              <hr key={idx} className="my-8 border-t-2 border-gray-300 dark:border-gray-600" />
            );

          case "link":
            return (
              <div key={idx} className="my-4">
                <a
                  href={block.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline font-medium inline-flex items-center gap-2"
                >
                  {block.text}
                  <span>→</span>
                </a>
              </div>
            );

          case "table":
            return (
              <div key={idx} className="my-6 overflow-x-auto">
                <table className="min-w-full border border-gray-300 dark:border-gray-600 rounded-lg overflow-hidden">
                  <thead className="bg-gray-100 dark:bg-gray-800">
                    <tr>
                      {block.headers.map((header, i) => (
                        <th
                          key={i}
                          className="px-4 py-3 text-left text-sm font-semibold border-b border-gray-300 dark:border-gray-600"
                        >
                          {header}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {block.rows.map((row, rIdx) => (
                      <tr
                        key={rIdx}
                        className="border-b border-gray-200 dark:border-gray-700 last:border-b-0"
                      >
                        {row.map((cell, cIdx) => (
                          <td
                            key={cIdx}
                            className="px-4 py-3 text-sm"
                          >
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );

          default:
            return null;
        }
      })}
    </div>
  );
}

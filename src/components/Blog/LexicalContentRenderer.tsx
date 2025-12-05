import React from "react";

interface LexicalContentRendererProps {
  content: string;
}

export default function LexicalContentRenderer({ content }: LexicalContentRendererProps) {
  let editorState: any;

  try {
    editorState = JSON.parse(content);
  } catch {
    return <div dangerouslySetInnerHTML={{ __html: content }} />;
  }

  const renderNode = (node: any): React.ReactNode => {
    if (!node) return null;

    switch (node.type) {
      case 'paragraph':
        return (
          <p className="mb-4 text-base leading-relaxed">
            {node.children?.map((child: any, idx: number) => renderNode(child))}
          </p>
        );

      case 'heading':
        const HeadingTag = `h${node.tag?.replace('h', '') || '2'}`;
        const headingClasses = {
          h1: 'text-4xl font-bold mb-4 mt-6',
          h2: 'text-3xl font-bold mb-3 mt-5',
          h3: 'text-2xl font-bold mb-3 mt-4',
          h4: 'text-xl font-semibold mb-2 mt-3',
          h5: 'text-lg font-semibold mb-2 mt-2',
        };
        return React.createElement(
          HeadingTag,
          { className: headingClasses[node.tag as keyof typeof headingClasses] || headingClasses.h2 },
          node.children?.map((child: any, idx: number) => renderNode(child))
        );

      case 'list':
        const ListTag = node.listType === 'number' ? 'ol' : 'ul';
        const listClass = node.listType === 'number' 
          ? 'list-decimal list-inside ml-4 mb-4 space-y-2'
          : 'list-disc list-inside ml-4 mb-4 space-y-2';
        return React.createElement(
          ListTag,
          { className: listClass },
          node.children?.map((child: any, idx: number) => renderNode(child))
        );

      case 'listitem':
        return (
          <li className="text-base leading-relaxed">
            {node.children?.map((child: any, idx: number) => renderNode(child))}
          </li>
        );

      case 'quote':
        return (
          <blockquote className="border-l-4 border-gray-300 dark:border-gray-600 pl-4 italic my-4 text-gray-700 dark:text-gray-300">
            {node.children?.map((child: any, idx: number) => renderNode(child))}
          </blockquote>
        );

      case 'code':
        return (
          <pre className="bg-gray-900 text-green-400 p-4 rounded-md font-mono text-sm my-4 overflow-x-auto">
            <code>{node.children?.map((child: any) => child.text).join('')}</code>
          </pre>
        );

      case 'link':
        return (
          <a
            href={node.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 dark:text-blue-400 hover:underline"
          >
            {node.children?.map((child: any, idx: number) => renderNode(child))}
          </a>
        );

      case 'text':
        let textContent = node.text || '';
        let className = '';
        
        if (node.format) {
          const formats = [];
          if (node.format & 1) formats.push('font-bold');
          if (node.format & 2) formats.push('italic');
          if (node.format & 8) formats.push('underline');
          className = formats.join(' ');
        }

        return className ? <span className={className}>{textContent}</span> : textContent;

      case 'linebreak':
        return <br />;

      default:
        if (node.children) {
          return node.children.map((child: any, idx: number) => renderNode(child));
        }
        return null;
    }
  };

  const renderContent = () => {
    if (!editorState.root || !editorState.root.children) {
      return <p>No content available</p>;
    }

    return editorState.root.children.map((node: any, idx: number) => (
      <React.Fragment key={idx}>{renderNode(node)}</React.Fragment>
    ));
  };

  return <div className="prose dark:prose-invert max-w-none">{renderContent()}</div>;
}

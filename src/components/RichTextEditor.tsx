"use client";

import { useState } from "react";

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

interface RichTextEditorProps {
  content: Block[];
  onChange: (content: Block[]) => void;
}

export default function RichTextEditor({ content, onChange }: RichTextEditorProps) {
  const [activeBlock, setActiveBlock] = useState<number | null>(null);

  function handleBlockChange(idx: number, field: string, value: any) {
    const updated = content.map((block, i) =>
      i === idx ? { ...block, [field]: value } : block
    );
    onChange(updated);
  }

  function addBlock(type: Block["type"] = "paragraph") {
    let newBlock: Block;
    switch (type) {
      case "paragraph":
        newBlock = { type: "paragraph", text: "" };
        break;
      case "heading":
        newBlock = { type: "heading", text: "", level: 2 };
        break;
      case "code":
        newBlock = { type: "code", code: "", language: "javascript" };
        break;
      case "image":
        newBlock = { type: "image", url: "", alt: "" };
        break;
      case "bulletine":
        newBlock = { type: "bulletine", items: [""] };
        break;
      case "orderedList":
        newBlock = { type: "orderedList", items: [""] };
        break;
      case "divider":
        newBlock = { type: "divider" };
        break;
      case "link":
        newBlock = { type: "link", url: "", text: "" };
        break;
      case "table":
        newBlock = { type: "table", headers: ["Column 1"], rows: [[""]] };
        break;
      default:
        newBlock = { type: "paragraph", text: "" };
    }
    onChange([...content, newBlock]);
    setActiveBlock(content.length);
  }

  function removeBlock(idx: number) {
    onChange(content.filter((_, i) => i !== idx));
    setActiveBlock(null);
  }

  function moveBlock(idx: number, direction: "up" | "down") {
    if (direction === "up" && idx > 0) {
      const newContent = [...content];
      [newContent[idx - 1], newContent[idx]] = [newContent[idx], newContent[idx - 1]];
      onChange(newContent);
      setActiveBlock(idx - 1);
    } else if (direction === "down" && idx < content.length - 1) {
      const newContent = [...content];
      [newContent[idx], newContent[idx + 1]] = [newContent[idx + 1], newContent[idx]];
      onChange(newContent);
      setActiveBlock(idx + 1);
    }
  }

  return (
    <div className="space-y-4">
      {/* Toolbar */}
      <div className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 border-2 border-gray-200 dark:border-gray-700 rounded-lg p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-bold text-gray-700 dark:text-gray-200 uppercase tracking-wide">
            📝 Content Editor
          </h3>
          <span className="text-xs text-gray-500 dark:text-gray-400">
            {content.length} block{content.length !== 1 ? "s" : ""}
          </span>
        </div>
        
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => addBlock("paragraph")}
            className="px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-indigo-50 dark:hover:bg-indigo-900/20 hover:border-indigo-400 transition text-sm font-medium flex items-center gap-2"
          >
            <span>¶</span> Paragraph
          </button>
          <button
            type="button"
            onClick={() => addBlock("heading")}
            className="px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-indigo-50 dark:hover:bg-indigo-900/20 hover:border-indigo-400 transition text-sm font-medium flex items-center gap-2"
          >
            <span className="font-bold">H</span> Heading
          </button>
          <button
            type="button"
            onClick={() => addBlock("bulletine")}
            className="px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-indigo-50 dark:hover:bg-indigo-900/20 hover:border-indigo-400 transition text-sm font-medium flex items-center gap-2"
          >
            <span>•</span> Bullet List
          </button>
          <button
            type="button"
            onClick={() => addBlock("orderedList")}
            className="px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-indigo-50 dark:hover:bg-indigo-900/20 hover:border-indigo-400 transition text-sm font-medium flex items-center gap-2"
          >
            <span>1.</span> Numbered List
          </button>
          <button
            type="button"
            onClick={() => addBlock("code")}
            className="px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-indigo-50 dark:hover:bg-indigo-900/20 hover:border-indigo-400 transition text-sm font-medium flex items-center gap-2"
          >
            <span className="font-mono">{"</>"}</span> Code
          </button>
          <button
            type="button"
            onClick={() => addBlock("image")}
            className="px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-indigo-50 dark:hover:bg-indigo-900/20 hover:border-indigo-400 transition text-sm font-medium flex items-center gap-2"
          >
            <span>🖼️</span> Image
          </button>
          <button
            type="button"
            onClick={() => addBlock("link")}
            className="px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-indigo-50 dark:hover:bg-indigo-900/20 hover:border-indigo-400 transition text-sm font-medium flex items-center gap-2"
          >
            <span>🔗</span> Link
          </button>
          <button
            type="button"
            onClick={() => addBlock("divider")}
            className="px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-indigo-50 dark:hover:bg-indigo-900/20 hover:border-indigo-400 transition text-sm font-medium flex items-center gap-2"
          >
            <span>―</span> Divider
          </button>
          <button
            type="button"
            onClick={() => addBlock("table")}
            className="px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-indigo-50 dark:hover:bg-indigo-900/20 hover:border-indigo-400 transition text-sm font-medium flex items-center gap-2"
          >
            <span>⊞</span> Table
          </button>
        </div>
      </div>

      {/* Content Blocks */}
      <div className="space-y-3">
        {content.length === 0 ? (
          <div className="text-center py-12 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg">
            <p className="text-gray-500 dark:text-gray-400 mb-4">No content blocks yet</p>
            <button
              type="button"
              onClick={() => addBlock("paragraph")}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md font-medium transition"
            >
              Add Your First Block
            </button>
          </div>
        ) : (
          content.map((block, idx) => (
            <div
              key={idx}
              className={`group relative border-2 rounded-lg transition-all ${
                activeBlock === idx
                  ? "border-indigo-500 shadow-lg shadow-indigo-100 dark:shadow-indigo-900/20"
                  : "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600"
              }`}
              onClick={() => setActiveBlock(idx)}
            >
              {/* Block Header */}
              <div className="flex items-center justify-between px-4 py-2 bg-gray-50 dark:bg-gray-800/50 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono text-gray-500 dark:text-gray-400">#{idx + 1}</span>
                  <select
                    value={block.type}
                    onChange={(e) => {
                      const newType = e.target.value as Block["type"];
                      let newBlock: Block;
                      switch (newType) {
                        case "paragraph":
                          newBlock = { type: "paragraph", text: "" };
                          break;
                        case "heading":
                          newBlock = { type: "heading", text: "", level: 2 };
                          break;
                        case "code":
                          newBlock = { type: "code", code: "", language: "javascript" };
                          break;
                        case "image":
                          newBlock = { type: "image", url: "", alt: "" };
                          break;
                        case "bulletine":
                          newBlock = { type: "bulletine", items: [""] };
                          break;
                        case "orderedList":
                          newBlock = { type: "orderedList", items: [""] };
                          break;
                        case "divider":
                          newBlock = { type: "divider" };
                          break;
                        case "link":
                          newBlock = { type: "link", url: "", text: "" };
                          break;
                        case "table":
                          newBlock = { type: "table", headers: ["Column 1"], rows: [[""]] };
                          break;
                        default:
                          newBlock = { type: "paragraph", text: "" };
                      }
                      const updated = [...content];
                      updated[idx] = newBlock;
                      onChange(updated);
                    }}
                    className="text-sm px-2 py-1 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800 font-medium"
                  >
                    <option value="paragraph">Paragraph</option>
                    <option value="heading">Heading</option>
                    <option value="code">Code</option>
                    <option value="image">Image</option>
                    <option value="bulletine">Bullet List</option>
                    <option value="orderedList">Numbered List</option>
                    <option value="divider">Divider</option>
                    <option value="link">Link</option>
                    <option value="table">Table</option>
                  </select>
                </div>
                
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={(e) => { e.stopPropagation(); moveBlock(idx, "up"); }}
                    disabled={idx === 0}
                    className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded disabled:opacity-30 disabled:cursor-not-allowed transition"
                    title="Move up"
                  >
                    ↑
                  </button>
                  <button
                    type="button"
                    onClick={(e) => { e.stopPropagation(); moveBlock(idx, "down"); }}
                    disabled={idx === content.length - 1}
                    className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded disabled:opacity-30 disabled:cursor-not-allowed transition"
                    title="Move down"
                  >
                    ↓
                  </button>
                  <button
                    type="button"
                    onClick={(e) => { e.stopPropagation(); removeBlock(idx); }}
                    className="p-1 hover:bg-red-100 dark:hover:bg-red-900/20 text-red-600 dark:text-red-400 rounded transition"
                    title="Delete block"
                  >
                    🗑️
                  </button>
                </div>
              </div>

              {/* Block Content */}
              <div className="p-4">
                {block.type === "paragraph" && (
                  <textarea
                    placeholder="Start typing your paragraph..."
                    value={block.text || ""}
                    onChange={(e) => handleBlockChange(idx, "text", e.target.value)}
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
                  />
                )}

                {block.type === "heading" && (
                  <div className="space-y-2">
                    <div className="flex gap-2">
                      <select
                        value={block.level || 2}
                        onChange={(e) => handleBlockChange(idx, "level", Number(e.target.value))}
                        className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800"
                      >
                        <option value={1}>H1 - Main Title</option>
                        <option value={2}>H2 - Section</option>
                        <option value={3}>H3 - Subsection</option>
                        <option value={4}>H4 - Minor Heading</option>
                        <option value={5}>H5 - Small Heading</option>
                        <option value={6}>H6 - Tiny Heading</option>
                      </select>
                    </div>
                    <input
                      type="text"
                      placeholder="Enter heading text..."
                      value={block.text || ""}
                      onChange={(e) => handleBlockChange(idx, "text", e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 font-bold text-lg"
                    />
                  </div>
                )}

                {block.type === "code" && (
                  <div className="space-y-2">
                    <input
                      type="text"
                      placeholder="Language (e.g., javascript, python, html)"
                      value={block.language || ""}
                      onChange={(e) => handleBlockChange(idx, "language", e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-sm"
                    />
                    <textarea
                      placeholder="Paste your code here..."
                      value={block.code || ""}
                      onChange={(e) => handleBlockChange(idx, "code", e.target.value)}
                      rows={6}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-900 dark:bg-gray-950 text-green-400 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
                    />
                  </div>
                )}

                {block.type === "image" && (
                  <div className="space-y-2">
                    <input
                      type="text"
                      placeholder="Image URL (https://...)"
                      value={block.url || ""}
                      onChange={(e) => handleBlockChange(idx, "url", e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                    <input
                      type="text"
                      placeholder="Alt text (describe the image)"
                      value={block.alt || ""}
                      onChange={(e) => handleBlockChange(idx, "alt", e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                    {block.url && (
                      <div className="mt-2 p-2 border border-gray-200 dark:border-gray-700 rounded-md bg-gray-50 dark:bg-gray-900">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={block.url} alt={block.alt || "Preview"} className="max-w-full h-auto rounded" />
                      </div>
                    )}
                  </div>
                )}

                {block.type === "bulletine" && (
                  <div className="space-y-2">
                    {(block.items || [""]).map((item, i) => (
                      <div key={i} className="flex gap-2 items-start">
                        <span className="mt-2 text-gray-500">•</span>
                        <input
                          type="text"
                          placeholder={`Bullet point ${i + 1}`}
                          value={item}
                          onChange={(e) => {
                            const newItems = [...(block.items || [])];
                            newItems[i] = e.target.value;
                            handleBlockChange(idx, "items", newItems);
                          }}
                          className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            const newItems = [...(block.items || [])];
                            newItems.splice(i, 1);
                            handleBlockChange(idx, "items", newItems.length ? newItems : [""]);
                          }}
                          className="px-2 py-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded transition"
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={() => {
                        const newItems = [...(block.items || [])];
                        newItems.push("");
                        handleBlockChange(idx, "items", newItems);
                      }}
                      className="text-sm px-3 py-1 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded transition"
                    >
                      + Add Bullet
                    </button>
                  </div>
                )}

                {block.type === "orderedList" && (
                  <div className="space-y-2">
                    {(block.items || [""]).map((item, i) => (
                      <div key={i} className="flex gap-2 items-start">
                        <span className="mt-2 text-gray-500 font-medium">{i + 1}.</span>
                        <input
                          type="text"
                          placeholder={`List item ${i + 1}`}
                          value={item}
                          onChange={(e) => {
                            const newItems = [...(block.items || [])];
                            newItems[i] = e.target.value;
                            handleBlockChange(idx, "items", newItems);
                          }}
                          className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            const newItems = [...(block.items || [])];
                            newItems.splice(i, 1);
                            handleBlockChange(idx, "items", newItems.length ? newItems : [""]);
                          }}
                          className="px-2 py-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded transition"
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={() => {
                        const newItems = [...(block.items || [])];
                        newItems.push("");
                        handleBlockChange(idx, "items", newItems);
                      }}
                      className="text-sm px-3 py-1 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded transition"
                    >
                      + Add Item
                    </button>
                  </div>
                )}

                {block.type === "divider" && (
                  <div className="py-4">
                    <hr className="border-t-2 border-gray-300 dark:border-gray-600" />
                    <p className="text-center text-xs text-gray-400 mt-2">Horizontal divider</p>
                  </div>
                )}

                {block.type === "link" && (
                  <div className="space-y-2">
                    <input
                      type="text"
                      placeholder="Link text (what users will see)"
                      value={block.text || ""}
                      onChange={(e) => handleBlockChange(idx, "text", e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                    <input
                      type="text"
                      placeholder="URL (https://...)"
                      value={block.url || ""}
                      onChange={(e) => handleBlockChange(idx, "url", e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                    {block.text && block.url && (
                      <div className="mt-2 p-2 border border-gray-200 dark:border-gray-700 rounded-md bg-gray-50 dark:bg-gray-900">
                        <a href={block.url} target="_blank" rel="noopener noreferrer" className="text-indigo-600 dark:text-indigo-400 hover:underline">
                          {block.text} →
                        </a>
                      </div>
                    )}
                  </div>
                )}

                {block.type === "table" && (
                  <div className="space-y-2 overflow-x-auto">
                    <div className="mb-2">
                      <input
                        type="text"
                        placeholder="Column headers (comma separated)"
                        value={block.headers ? block.headers.join(", ") : ""}
                        onChange={(e) => handleBlockChange(idx, "headers", e.target.value.split(",").map(h => h.trim()).filter(Boolean))}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>
                    <div className="border border-gray-300 dark:border-gray-600 rounded-md overflow-hidden">
                      <table className="w-full">
                        <thead className="bg-gray-100 dark:bg-gray-800">
                          <tr>
                            {(block.headers || []).map((header, hIdx) => (
                              <th key={hIdx} className="px-3 py-2 text-left text-sm font-semibold border-r border-gray-300 dark:border-gray-600 last:border-r-0">
                                {header}
                              </th>
                            ))}
                            <th className="w-10"></th>
                          </tr>
                        </thead>
                        <tbody>
                          {(block.rows || [[]]).map((row, rIdx) => (
                            <tr key={rIdx} className="border-t border-gray-300 dark:border-gray-600">
                              {(block.headers || []).map((_, cIdx) => (
                                <td key={cIdx} className="px-2 py-1 border-r border-gray-300 dark:border-gray-600 last:border-r-0">
                                  <input
                                    type="text"
                                    value={row[cIdx] || ""}
                                    onChange={(e) => {
                                      const newRows = [...(block.rows || [])];
                                      if (!newRows[rIdx]) newRows[rIdx] = [];
                                      newRows[rIdx][cIdx] = e.target.value;
                                      handleBlockChange(idx, "rows", newRows);
                                    }}
                                    className="w-full px-2 py-1 bg-transparent focus:outline-none focus:bg-white dark:focus:bg-gray-800"
                                  />
                                </td>
                              ))}
                              <td className="px-2">
                                <button
                                  type="button"
                                  onClick={() => {
                                    const newRows = [...(block.rows || [])];
                                    newRows.splice(rIdx, 1);
                                    handleBlockChange(idx, "rows", newRows.length ? newRows : [[]]);
                                  }}
                                  className="text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded p-1"
                                >
                                  ✕
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        const newRows = [...(block.rows || [])];
                        const cols = block.headers ? block.headers.length : 1;
                        newRows.push(Array(cols).fill(""));
                        handleBlockChange(idx, "rows", newRows);
                      }}
                      className="text-sm px-3 py-1 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded transition"
                    >
                      + Add Row
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

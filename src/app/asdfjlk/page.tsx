// Block type definition for all content blocks
"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { useTheme } from "next-themes";
import type { Id } from "../../../convex/_generated/dataModel";
import RichTextEditor from "@/components/RichTextEditor";


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
export default function AdminDashboard() {
  const { theme } = useTheme();
  const blogs = useQuery(api.blogs.list.getPosts) || [];
  const loading = !blogs;
  const [form, setForm] = useState<{
    id: string | null;
    title: string;
    content: Block[];
    author: string;
    image_url: string;
    tags: string;
    excerpt: string;
    category: string;
    slug: string;
  }>({
    id: null,
    title: "",
    content: [
      { type: "paragraph", text: "" }
    ],
    author: "",
    image_url: "",
    tags: "",
    excerpt: "",
    category: "",
    slug: "",
  });
  const [editing, setEditing] = useState(false);
  const [activeTab, setActiveTab] = useState("posts");
  const [notification, setNotification] = useState({ show: false, message: "", type: "" });
  function showNotification(message: string, type = "success") {
    setNotification({ show: true, message, type });
    setTimeout(() => setNotification({ show: false, message: "", type: "" }), 3000);
  }




  function generateSlug(title) {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9 -]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim('-');
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = e.target;
    const updates: Partial<typeof form> = { [name]: value } as any;
    
    // Auto-generate slug when title changes (only if slug is empty or editing)
    if (name === 'title' && (!form.slug || !editing)) {
      updates.slug = generateSlug(value);
    }
    
    setForm({ ...form, ...updates });
  }

  // Content block handlers
  function handleBlockChange(idx: number, field: string, value: any) {
    const updated = form.content.map((block, i) =>
      i === idx ? { ...block, [field]: value } : block
    );
    setForm({ ...form, content: updated });
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
        newBlock = { type: "code", code: "", language: "" };
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
        newBlock = { type: "table", headers: [""], rows: [[""]] };
        break;
      default:
        newBlock = { type: "paragraph", text: "" };
    }
    setForm({
      ...form,
      content: [...form.content, newBlock],
    });
  }

  function removeBlock(idx: number) {
    setForm({
      ...form,
      content: form.content.filter((_, i) => i !== idx),
    });
  }

  const createBlog = useMutation(api.blogs.list.createBlog);
  const updateBlog = useMutation(api.blogs.list.updateBlog);
  const deleteBlog = useMutation(api.blogs.list.deleteBlog);


  // Only allow valid properties for each block type
  function sanitizeBlock(block: any) {
    switch (block.type) {
      case "paragraph":
        return { type: "paragraph", text: block.text || "" };
      case "heading":
        return { type: "heading", text: block.text || "", ...(block.level ? { level: block.level } : {}) };
      case "code":
        return { type: "code", code: block.code || "", ...(block.language ? { language: block.language } : {}) };
      case "image":
        return { type: "image", url: block.url || "", ...(block.alt ? { alt: block.alt } : {}) };
      case "bulletine":
        return { type: "bulletine", items: Array.isArray(block.items) ? block.items.filter(Boolean) : [] };
      case "orderedList":
        return { type: "orderedList", items: Array.isArray(block.items) ? block.items.filter(Boolean) : [] };
      case "divider":
        return { type: "divider" };
      case "link":
        return { type: "link", url: block.url || "", text: block.text || "" };
      case "table":
        return { type: "table", headers: Array.isArray(block.headers) ? block.headers : [], rows: Array.isArray(block.rows) ? block.rows : [] };
      default:
        return block;
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      const sanitizedContent = Array.isArray(form.content) ? form.content.map(sanitizeBlock) : [];
      if (editing) {
        await updateBlog({
          id: form.id as Id<"blogs">,
          title: form.title,
          content: sanitizedContent,
          author: form.author,
          image_url: form.image_url,
          tags: form.tags,
          excerpt: form.excerpt,
          category: form.category,
          slug: form.slug,
        });
        showNotification("Post updated successfully!");
      } else {
        await createBlog({
          title: form.title,
          content: sanitizedContent,
          author: form.author,
          image_url: form.image_url,
          tags: form.tags,
          excerpt: form.excerpt,
          category: form.category,
          slug: form.slug,
        });
        showNotification("Post created successfully!");
      }
      setForm({ id: null, title: "", content: [{ type: "paragraph", text: "" }], author: "", image_url: "", tags: "", excerpt: "", category: "", slug: "" });
      setEditing(false);
    } catch (error) {
      showNotification("Error saving post: " + error.message, "error");
    }
  }


  function handleEdit(blog: any) {
    setForm({
      ...blog,
      id: blog._id,
      content: Array.isArray(blog.content) ? blog.content : [{ type: "paragraph", text: blog.content || "" }],
      excerpt: blog.excerpt || "",
      category: blog.category || "",
      slug: blog.slug || "",
    });
    setEditing(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function handleDelete(id: Id<"blogs">) {
    if (confirm("Are you sure you want to delete this post?")) {
      await deleteBlog({ id });
      showNotification("Post deleted successfully!");
    }
  }


  return (
    <div className="max-w-6xl mx-auto px-4 py-8 font-sans text-gray-900 dark:text-gray-100">
      {/* Notification */}
      {notification.show && (
        <div className={`fixed top-5 right-5 px-5 py-3 rounded-md font-medium z-50 shadow-lg animate-slideIn transition-colors
          ${notification.type === "success" ? "bg-emerald-500 text-white" : "bg-red-500 text-white"}
        `}>
          {notification.message}
        </div>
      )}

      {/* Header */}
      <header className="flex flex-col md:flex-row md:justify-between md:items-center mt-10 pt-5 border-t border-gray-200 dark:border-gray-700 gap-4">
        <h1 className="text-3xl font-bold text-primary dark:text-primary-light mb-0">Admin Dashboard</h1>
        <div className="flex gap-3">
          <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-md font-medium transition" onClick={() => setActiveTab("create")}> 
            {editing ? "Editing Post" : "Create New Post"}
          </button>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div className="flex border-b border-gray-200 dark:border-gray-700 mb-8 mt-8">
        <button 
          className={`px-6 py-3 font-medium transition border-b-2 -mb-px focus:outline-none
            ${activeTab === "posts" ? "border-indigo-600 text-indigo-600 dark:text-indigo-400" : "border-transparent text-gray-500 dark:text-gray-400 hover:text-indigo-600"}`}
          onClick={() => setActiveTab("posts")}
        >
          All Posts ({blogs.length})
        </button>
        <button 
          className={`px-6 py-3 font-medium transition border-b-2 -mb-px focus:outline-none
            ${activeTab === "create" ? "border-indigo-600 text-indigo-600 dark:text-indigo-400" : "border-transparent text-gray-500 dark:text-gray-400 hover:text-indigo-600"}`}
          onClick={() => setActiveTab("create")}
        >
          {editing ? "Edit Post" : "Create Post"}
        </button>
      </div>

      {/* Create/Edit Form */}
      {activeTab === "create" && (
        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-xl border border-gray-200 dark:border-gray-800 overflow-hidden mb-8">
          {/* Form Header */}
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-8 py-6">
            <h2 className="text-2xl font-bold text-white mb-1">
              {editing ? "✏️ Edit Post" : "✨ Create New Post"}
            </h2>
            <p className="text-indigo-100 text-sm">
              {editing ? "Update your blog post content" : "Share your thoughts with the world"}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="p-8">
            <div className="space-y-8">
              {/* Title Section */}
              <div className="space-y-2">
                <label htmlFor="title" className="block text-sm font-semibold text-gray-700 dark:text-gray-200 uppercase tracking-wide">
                  Post Title *
                </label>
                <input
                  id="title"
                  name="title"
                  placeholder="Enter an engaging title for your post..."
                  value={form.title}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 text-lg border-2 border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 dark:focus:ring-indigo-900 transition"
                />
              </div>

              {/* Slug and Category Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="slug" className="block text-sm font-semibold text-gray-700 dark:text-gray-200 uppercase tracking-wide">
                    URL Slug *
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm">/</span>
                    <input
                      id="slug"
                      name="slug"
                      placeholder="url-friendly-slug"
                      value={form.slug}
                      onChange={handleChange}
                      required
                      className="w-full pl-8 pr-4 py-3 border-2 border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 dark:focus:ring-indigo-900 transition"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="category" className="block text-sm font-semibold text-gray-700 dark:text-gray-200 uppercase tracking-wide">
                    Category *
                  </label>
                  <input
                    id="category"
                    name="category"
                    placeholder="e.g., Technology, Design, Business"
                    value={form.category}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 dark:focus:ring-indigo-900 transition"
                  />
                </div>
              </div>

              {/* Excerpt */}
              <div className="space-y-2">
                <label htmlFor="excerpt" className="block text-sm font-semibold text-gray-700 dark:text-gray-200 uppercase tracking-wide">
                  Excerpt *
                </label>
                <textarea
                  id="excerpt"
                  name="excerpt"
                  placeholder="Write a compelling summary that will appear in previews and search results..."
                  value={form.excerpt}
                  onChange={handleChange}
                  required
                  rows={3}
                  className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 dark:focus:ring-indigo-900 transition resize-none"
                />
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {form.excerpt.length} characters
                </p>
              </div>


              {/* Rich Text Editor */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 uppercase tracking-wide">
                  Content *
                </label>
                <RichTextEditor
                  content={form.content}
                  onChange={(newContent) => setForm({ ...form, content: newContent })}
                />
              </div>

              {/* Author and Image Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="author" className="block text-sm font-semibold text-gray-700 dark:text-gray-200 uppercase tracking-wide">
                    Author *
                  </label>
                  <input
                    id="author"
                    name="author"
                    placeholder="Author name"
                    value={form.author}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 dark:focus:ring-indigo-900 transition"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="image_url" className="block text-sm font-semibold text-gray-700 dark:text-gray-200 uppercase tracking-wide">
                    Featured Image URL
                  </label>
                  <input
                    id="image_url"
                    name="image_url"
                    placeholder="https://example.com/image.jpg"
                    value={form.image_url}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 dark:focus:ring-indigo-900 transition"
                  />
                </div>
              </div>

              {/* Tags */}
              <div className="space-y-2">
                <label htmlFor="tags" className="block text-sm font-semibold text-gray-700 dark:text-gray-200 uppercase tracking-wide">
                  Tags
                </label>
                <input
                  id="tags"
                  name="tags"
                  placeholder="technology, design, business (comma separated)"
                  value={form.tags}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 dark:focus:ring-indigo-900 transition"
                />
              </div>

              {/* Submit Buttons */}
              <div className="flex gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
                <button 
                  type="submit" 
                  className="px-8 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5"
                >
                  {editing ? "💾 Update Post" : "🚀 Publish Post"}
                </button>
                {editing && (
                  <button 
                    type="button" 
                    className="px-6 py-3 bg-white dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 rounded-lg font-semibold hover:bg-gray-50 dark:hover:bg-gray-700 transition"
                    onClick={() => { 
                      setForm({ id: null, title: "", content: [{ type: "paragraph", text: "" }], author: "", image_url: "", tags: "", excerpt: "", category: "", slug: "" }); 
                      setEditing(false); 
                    }}
                  >
                    ✕ Cancel
                  </button>
                )}
              </div>
            </div>
          </form>
        </div>
      )}



      {/* Posts List */}
      {activeTab === "posts" && (
        <div className="bg-white/90 dark:bg-gray-900/90 rounded-lg shadow p-6">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6 gap-4">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-0">All Posts</h2>
            <div className="w-full md:w-auto">
              <input type="text" placeholder="Search posts..." className="w-full md:w-64 px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
            </div>
          </div>

          {loading ? (
            <div className="flex flex-col items-center py-10 text-gray-500 dark:text-gray-400">
              <div className="w-10 h-10 border-4 border-gray-200 dark:border-gray-700 border-t-indigo-600 dark:border-t-indigo-400 rounded-full animate-spin mb-4"></div>
              <p>Loading posts...</p>
            </div>
          ) : blogs.length === 0 ? (
            <div className="text-center py-10 text-gray-500 dark:text-gray-400">
              <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-2">No posts yet</h3>
              <p className="mb-4">Create your first post to get started</p>
              <button 
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-md font-medium transition"
                onClick={() => setActiveTab("create")}
              >
                Create New Post
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {blogs.map((blog) => (
                <div key={blog._id} className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden shadow hover:shadow-lg transition-transform hover:-translate-y-1 bg-white dark:bg-gray-800 flex flex-col">
                  {blog.image_url && (
                    <div className="relative w-full h-40 overflow-hidden bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
                      <Image
                        src={blog.image_url}
                        alt={blog.title}
                        fill
                        style={{ objectFit: "cover" }}
                        sizes="(max-width: 768px) 100vw, 33vw"
                        priority={false}
                      />
                    </div>
                  )}
                  <div className="flex-1 flex flex-col p-4">
                    <h3 className="text-lg font-bold text-primary dark:text-primary-light mb-2">{blog.title}</h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-3 line-clamp-3">
                      {blog.excerpt || (
                        Array.isArray(blog.content)
                          ? blog.content
                              .filter(block => block.type === "paragraph" || block.type === "heading")
                              .map(block => block.text)
                              .filter(Boolean)
                              .join(" ")
                              .slice(0, 100) + (blog.content.length > 0 ? "..." : "")
                          : typeof blog.content === "string"
                          ? blog.content.slice(0, 100) + (blog.content.length > 100 ? "..." : "")
                          : ""
                      )}
                    </p>
                    <div className="flex flex-col gap-1 text-sm mb-4">
                      <span className="text-gray-700 dark:text-gray-200 font-medium">By {blog.author}</span>
                      {blog.category && (
                        <span className="text-indigo-600 dark:text-indigo-400 font-medium">
                          Category: {blog.category}
                        </span>
                      )}
                      <span className="text-gray-500 dark:text-gray-400">
                        {Array.isArray(blog.tags) 
                          ? blog.tags.join(", ") 
                          : (blog.tags || "No tags")
                        }
                      </span>
                      {blog.slug && (
                        <span className="text-gray-400 dark:text-gray-500 text-xs">
                          Slug: /{blog.slug}
                        </span>
                      )}
                    </div>
                    <div className="flex gap-2 mt-auto">
                      <button 
                        onClick={() => handleEdit(blog)}
                        className="bg-amber-500 hover:bg-amber-600 text-white px-4 py-1.5 rounded-md text-sm font-medium transition"
                      >
                        Edit
                      </button>
                      <button 
                        onClick={() => handleDelete(blog._id)}
                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-1.5 rounded-md text-sm font-medium transition"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

"use client";
import { useState } from "react";
import { useQuery, useMutation } from "convex/react";
import { useRouter } from "next/navigation"; // Import the Next.js router
import { api } from "../../../convex/_generated/api";
import { Id } from "../../../convex/_generated/dataModel";
import { useUser, useClerk } from "@clerk/nextjs";
import {RainbowButton} from "../ui/rainbow-button";
// Helper function
function timeAgo(timestamp: number) {
  const now = Date.now();
  const diff = Math.floor((now - timestamp) / 1000);
  if (diff < 60) return `${diff}s ago`;
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return `${Math.floor(diff / 86400)}d ago`;
}

export default function CommentSection({ blogId }: { blogId: Id<"blogs"> }) {
  const { user, isLoaded } = useUser();
  const { openSignIn } = useClerk();
  const router = useRouter(); // Initialize the router hook

  const comments = useQuery(api.blogs.list.getCommentsForBlog, { blog_id: blogId });
  const addComment = useMutation(api.blogs.list.addComment);
  const deleteComment = useMutation(api.blogs.list.deleteComment);
  const editComment = useMutation(api.blogs.list.editComment);

  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [editingId, setEditingId] = useState<Id<"comments"> | null>(null);
  const [editContent, setEditContent] = useState("");

  // This function now pushes to Clerk sign-in with afterSignInUrl as a query param
  const redirectToSignIn = () => {
    if (!user && isLoaded) {
      router.push(`/sign-in?afterSignInUrl=${encodeURIComponent(window.location.pathname)}`);
    }
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!content.trim()) return setError("Comment cannot be empty");
    if (!user || !isLoaded) {
      // Use router.push to sign-in with afterSignInUrl to redirect back after sign-in
      router.push(`/sign-in?afterSignInUrl=${encodeURIComponent(window.location.pathname)}`);
      return;
    }

    setLoading(true);
    setError("");
    try {
      await addComment({
        blog_id: blogId,
        user_Id: user.id,
        comment: content,
        email: user.primaryEmailAddress?.emailAddress || "anon@example.com",
      });
      setContent("");
    } catch (err) {
      console.error(err);
      setError("Failed to add comment");
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(commentId: Id<"comments">) {
    try {
      await deleteComment({ commentId });
    } catch (err) {
      console.error(err);
    }
  }

  async function handleEditSave(commentId: Id<"comments">) {
    if (!editContent.trim()) return;
    try {
      await editComment({ commentId, content: editContent });
      setEditingId(null);
      setEditContent("");
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="mt-10">
      <h3 className="text-lg font-semibold mb-4">Comments</h3>

      {comments === undefined || !isLoaded ? (
        <div>Loading comments...</div>
      ) : comments.length === 0 ? (
        <div className="text-gray-500">No comments yet. Be the first!</div>
      ) : (
        <ul className="space-y-4 mb-6">
          {comments.map((c: any) => (
            <li key={c._id} className="bg-gray-50 dark:bg-gray-800 rounded p-4">
              <div className="flex items-center mb-2 justify-between">
                <div>
                  <span className="font-medium text-blue-600 dark:text-blue-300 mr-2">
                    {c.email.split("@")[0]}
                  </span>
                  <span className="text-xs text-gray-400">
                    {timeAgo(c._creationTime)}
                  </span>
                </div>

                {user?.id === c.user_Id && (
                  <div className="space-x-2 text-sm">
                    <button
                      className="text-yellow-600 hover:underline"
                      onClick={() => {
                        setEditingId(c._id);
                        setEditContent(c.comment);
                      }}
                    >
                      Edit
                    </button>
                    <button
                      className="text-red-600 hover:underline"
                      onClick={() => handleDelete(c._id)}
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>

              {editingId === c._id ? (
                <div className="flex flex-col gap-2">
                  <textarea
                    className="border rounded p-2"
                    value={editContent}
                    onChange={(e) => setEditContent(e.target.value)}
                  />
                  <div className="flex gap-2">
                    <button
                      className="bg-green-600 text-white rounded px-3 py-1"
                      onClick={() => handleEditSave(c._id)}
                    >
                      Save
                    </button>
                    <button
                      className="bg-gray-400 text-white rounded px-3 py-1"
                      onClick={() => setEditingId(null)}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div className="text-gray-800 dark:text-gray-200">{c.comment}</div>
              )}
            </li>
          ))}
        </ul>
      )}

      <form
        onSubmit={handleSubmit} // The submit handler is now always `handleSubmit`
        className="flex flex-col gap-2"
      >
        <textarea
          className="border rounded p-2 min-h-[60px]"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Write your comment or question..."
          disabled={loading}
          // The onFocus handler now uses the local redirectToSignIn function
          onFocus={redirectToSignIn}
        />
        {error && <div className="text-red-500 text-sm">{error}</div>}
        <RainbowButton className="w-50" type="submit" disabled={loading}>
          {loading ? "Sending..." : "Send Comment"}
        </RainbowButton>
      </form>
    </div>
  );
}
"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useUser, useClerk } from "@clerk/nextjs";
import { RainbowButton } from "../ui/rainbow-button";

// Mock comments data
const mockComments = [
  {
    _id: "1",
    email: "user1@example.com",
    comment: "Great article! Very informative.",
    user_Id: "mock_user_1",
    _creationTime: Date.now() - 3600000, // 1 hour ago
  },
  {
    _id: "2",
    email: "user2@example.com",
    comment: "Thanks for sharing this!",
    user_Id: "mock_user_2",
    _creationTime: Date.now() - 7200000, // 2 hours ago
  },
];

// Helper function
function timeAgo(timestamp: number) {
  const now = Date.now();
  const diff = Math.floor((now - timestamp) / 1000);
  if (diff < 60) return `${diff}s ago`;
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return `${Math.floor(diff / 86400)}d ago`;
}

export default function CommentSection({ blogId }: { blogId: string }) {
  const { user, isLoaded } = useUser();
  const router = useRouter();

  const comments = mockComments;

  const [content, setContent] = useState("");
  const [loading] = useState(false);
  const [error, setError] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editContent, setEditContent] = useState("");

  const redirectToSignIn = () => {
    if (!user && isLoaded) {
      router.push(`/sign-in?afterSignInUrl=${encodeURIComponent(window.location.pathname)}`);
    }
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("Comments are temporarily disabled while building the UI.");
  }

  async function handleDelete(commentId: string) {
    console.log("Delete disabled:", commentId);
  }

  async function handleEditSave(commentId: string) {
    console.log("Edit disabled:", commentId);
    setEditingId(null);
  }

  return (
    <div className="mt-10">
      <h3 className="text-lg font-semibold mb-4">Comments</h3>

      {!isLoaded ? (
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
        onSubmit={handleSubmit}
        className="flex flex-col gap-2"
      >
        <textarea
          className="border rounded p-2 min-h-[60px]"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Write your comment or question..."
          disabled={loading}
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
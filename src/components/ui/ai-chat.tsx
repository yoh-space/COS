"use client";
// TODO: [COMPLETED] Improved AI chat dark-mode contrast for better readability

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, X, Bot, User } from "lucide-react";
import { getChatResponse } from "@/lib/ai-chat";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

const QUICK_QUESTIONS = [
  "What programs do you offer?",
  "Tell me about research facilities",
  "How can I apply?",
  "What are the departments?",
];

// Format message to handle markdown-style formatting
function formatMessage(text: string): string {
  return text
    // Bold text: **text** or __text__
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/__(.+?)__/g, '<strong>$1</strong>')
    // Italic text: *text* or _text_
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/_(.+?)_/g, '<em>$1</em>')
    // Line breaks
    .replace(/\n/g, '<br/>')
    // Escape HTML to prevent XSS
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    // Re-enable our formatted tags
    .replace(/&lt;strong&gt;/g, '<strong>')
    .replace(/&lt;\/strong&gt;/g, '</strong>')
    .replace(/&lt;em&gt;/g, '<em>')
    .replace(/&lt;\/em&gt;/g, '</em>')
    .replace(/&lt;br\/&gt;/g, '<br/>');
}

export default function AIChatCard() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content: "Hello! I'm your AI assistant. How can I help you today?",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showQuickQuestions, setShowQuickQuestions] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (message?: string) => {
    const content = message || input.trim();
    if (!content || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setShowQuickQuestions(false);
    setIsLoading(true);

    try {
      const aiResponse = await getChatResponse(content);
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: aiResponse,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error("Error getting AI response:", error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "Sorry, I encountered an error. Please try again.",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex h-full flex-col bg-white dark:bg-gray-dark">
      {/* Header */}
      <div className="flex items-center gap-3 border-b border-gray-200 p-4 dark:border-gray-700">
        <div className="flex h-10 w-10 items-center justify-center rounded-full" style={{ background: "linear-gradient(to bottom right, #29b6ff, #1e90ff)" }}>
          <Bot className="h-5 w-5 text-white" />
        </div>
        <div>
          <h3 className="font-semibold text-black dark:text-white">AI Assistant</h3>
          <p className="text-xs text-body-color">Always here to help</p>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <motion.div
            key={message.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex gap-3 ${message.role === "user" ? "flex-row-reverse" : ""}`}
          >
            <div
              className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${
                message.role === "user"
                  ? "bg-primary dark:bg-blue-600"
                  : ""
              }`}
              style={message.role === "assistant" ? { background: "linear-gradient(to bottom right, #29b6ff, #1e90ff)" } : {}}
            >
              {message.role === "user" ? (
                <User className="h-4 w-4 text-white dark:text-gray-50" />
              ) : (
                <Bot className="h-4 w-4 text-white" />
              )}
            </div>
            <div
              className={`max-w-[75%] rounded-2xl px-4 py-2 ${
                message.role === "user"
                  ? "bg-primary text-white dark:bg-blue-600 dark:text-gray-50"
                  : "bg-gray-100 text-black dark:bg-gray-800 dark:text-gray-100"
              }`}
            >
              <div className="text-sm whitespace-pre-wrap" dangerouslySetInnerHTML={{ __html: formatMessage(message.content) }} />
            </div>
          </motion.div>
        ))}
        {isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex gap-3"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-full" style={{ background: "linear-gradient(to bottom right, #29b6ff, #1e90ff)" }}>
              <Bot className="h-4 w-4 text-white" />
            </div>
            <div className="flex items-center gap-1 rounded-2xl bg-gray-100 px-4 py-2 dark:bg-gray-800">
              <div className="h-2 w-2 animate-bounce rounded-full bg-gray-400" style={{ animationDelay: "0ms" }} />
              <div className="h-2 w-2 animate-bounce rounded-full bg-gray-400" style={{ animationDelay: "150ms" }} />
              <div className="h-2 w-2 animate-bounce rounded-full bg-gray-400" style={{ animationDelay: "300ms" }} />
            </div>
          </motion.div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Quick Questions */}
      {showQuickQuestions && messages.length === 1 && (
        <div className="border-t border-gray-200 px-4 py-3 dark:border-gray-700">
          <p className="mb-2 text-xs font-medium text-gray-600 dark:text-gray-400">Quick questions:</p>
          <div className="flex flex-wrap gap-2">
            {QUICK_QUESTIONS.map((question, index) => (
              <button
                key={index}
                onClick={() => handleSend(question)}
                className="rounded-full border border-gray-300 bg-white px-3 py-1.5 text-xs text-gray-700 transition-all hover:border-[#29b6ff] hover:bg-[#29b6ff]/5 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:hover:border-[#29b6ff] dark:hover:bg-[#29b6ff]/10"
              >
                {question}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input */}
      <div className="border-t border-gray-200 p-4 dark:border-gray-700">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your message..."
            className="flex-1 rounded-full border border-gray-300 bg-transparent px-4 py-2 text-sm text-black outline-none focus:border-[#29b6ff] dark:border-gray-600 dark:text-white"
            disabled={isLoading}
          />
          <button
            onClick={() => handleSend()}
            disabled={!input.trim() || isLoading}
            className="flex h-10 w-10 items-center justify-center rounded-full text-white transition-all hover:scale-105 disabled:opacity-50 disabled:hover:scale-100"
            style={{ background: "#29b6ff" }}
          >
            <Send className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

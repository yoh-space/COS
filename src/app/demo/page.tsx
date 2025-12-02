"use client";

import AIChatCard from "@/components/ui/ai-chat";

export default function DemoPage() {
  return (
    <div className="min-h-screen bg-gray-50 p-8 dark:bg-black">
      <div className="mx-auto max-w-4xl">
        <h1 className="mb-8 text-4xl font-bold text-black dark:text-white">
          AI Chat Demo
        </h1>
        <p className="mb-8 text-body-color">
          This is a demo page to test the AI chat component in isolation.
        </p>
        <div className="h-[600px] overflow-hidden rounded-2xl shadow-2xl">
          <AIChatCard />
        </div>
      </div>
    </div>
  );
}

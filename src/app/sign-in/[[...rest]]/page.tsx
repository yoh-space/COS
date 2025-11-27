"use client";
import { SignIn } from "@clerk/nextjs";
import { useSearchParams } from "next/navigation";

export default function SignInPage() {
  const searchParams = useSearchParams();
  const afterSignInUrl = searchParams.get("afterSignInUrl") || "/";
  return (
    <div className="flex min-h-screen items-center justify-center">
      <SignIn
        routing="hash"
        afterSignInUrl={afterSignInUrl}
      />
    </div>
  );
}
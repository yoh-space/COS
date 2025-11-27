"use client";
import { SignUp } from "@clerk/nextjs";
import { useSearchParams } from "next/navigation";

export default function SignUpPage() {
  const searchParams = useSearchParams();
  const afterSignInUrl = searchParams.get("afterSignInUrl") || "/";
  return (
    <div className="flex min-h-screen items-center justify-center">
      <SignUp
        routing="hash"
        afterSignInUrl={afterSignInUrl}
      />
    </div>
  );
}

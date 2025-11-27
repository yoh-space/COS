"use client";
import { ConvexReactClient } from "convex/react";

const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL || "";

if (!convexUrl) {
	console.error("NEXT_PUBLIC_CONVEX_URL is not set. Current value:", process.env.NEXT_PUBLIC_CONVEX_URL);
	console.error("All NEXT_PUBLIC_ vars:", Object.keys(process.env).filter(k => k.startsWith('NEXT_PUBLIC_')));
}

export const convex = new ConvexReactClient(convexUrl);
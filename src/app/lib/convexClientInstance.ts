import { ConvexReactClient } from "convex/react";

// Replace with your actual Convex deployment URL
const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL!;
export const convex = new ConvexReactClient(convexUrl);

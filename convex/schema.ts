import { v } from "convex/values";
import { defineSchema, defineTable } from "convex/server";

export default defineSchema({
  blogs: defineTable({
    author: v.string(),
    category: v.string(),
    content: v.array(
      v.union(
        v.object({
          type: v.literal("paragraph"),
          text: v.string(),
        }),
        v.object({
          type: v.literal("heading"),
          text: v.string(),
          level: v.optional(v.number()), // 1 for h1, 2 for h2, etc.
        }),
        v.object({
          type: v.literal("code"),
          code: v.string(),
          language: v.optional(v.string()),
        }),
        v.object({
          type: v.literal("image"),
          url: v.string(),
          alt: v.optional(v.string()),
        }),
        v.object({
          type: v.literal("bulletine"),
          items: v.array(v.string()),
        }),
        v.object({
          type: v.literal("orderedList"),
          items: v.array(v.string()),
        }),
        v.object({
          type: v.literal("divider"),
        }),
        v.object({
          type: v.literal("link"),
          url: v.string(),
          text: v.string(),
        }),
        v.object({
          type: v.literal("table"),
          headers: v.array(v.string()),
          rows: v.array(v.array(v.string())),
        })
      )
    ),
    created_at: v.string(),
    excerpt: v.string(),
    image_url: v.string(),
    slug: v.string(),
    tags: v.string(),
    title: v.string(),
    updated_at: v.string(),
    views: v.string(),
    totalComment: v.string(),
    paragraph: v.string(),
  }),
  comments: defineTable({
    name: v.string(),
    email: v.string(),
    comment: v.string(),
    blog_id: v.id("blogs"),
    user_Id: v.string(),
    _creationTime: v.number(),
  })
});
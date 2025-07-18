import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  cats: defineTable({
    name: v.string(),
    subtitle: v.string(),
    image: v.string(),
    description: v.string(),
    age: v.string(),
    color: v.string(),
    status: v.string(),
    price: v.string(),
    gallery: v.array(v.string()),
    gender: v.union(v.literal("male"), v.literal("female")),
    birthDate: v.string(),
    registrationNumber: v.optional(v.string()),
    isDisplayed: v.boolean(),
    freeText: v.optional(v.string()),
    tiktokVideo: v.optional(v.string()),
  }),
  
  pedigreeConnections: defineTable({
    parentId: v.id("cats"),
    childId: v.id("cats"),
    type: v.union(v.literal("mother"), v.literal("father")),
  })
    .index("by_child", ["childId"])
    .index("by_parent", ["parentId"])
    .index("by_child_type", ["childId", "type"]),
});
import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  // Main cats table
  cats: defineTable({
    name: v.string(),
    subtitle: v.string(),
    image: v.string(),
    description: v.string(),
    age: v.string(),
    color: v.string(),
    status: v.string(),
    gallery: v.array(v.string()),
    gender: v.union(v.literal("male"), v.literal("female")),
    birthDate: v.string(),
    registrationNumber: v.optional(v.string()),
    isDisplayed: v.boolean(),
    freeText: v.optional(v.string()),
    // New fields for gallery filtering
    category: v.optional(v.union(v.literal("kitten"), v.literal("adult"), v.literal("all"))),
    // JonaliMaineCoon marking
    isJonaliMaineCoon: v.optional(v.boolean()),
  })
    .index("by_displayed", ["isDisplayed"])
    .index("by_gender", ["gender"])
    .index("by_registration", ["registrationNumber"])
    .index("by_category", ["category"])
    .index("by_category_displayed", ["category", "isDisplayed"])
    .index("by_jonali", ["isJonaliMaineCoon"])
    .index("by_jonali_displayed", ["isJonaliMaineCoon", "isDisplayed"]),

  // Pedigree connections between cats
  pedigreeConnections: defineTable({
    parentId: v.id("cats"),
    childId: v.id("cats"),
    type: v.union(v.literal("mother"), v.literal("father")),
  })
    .index("by_parent", ["parentId"])
    .index("by_child", ["childId"])
    .index("by_child_type", ["childId", "type"]),

  // Saved pedigree trees
  pedigreeTrees: defineTable({
    rootCatId: v.id("cats"),
    name: v.string(),
    description: v.string(),
    // Store the tree structure as JSON for performance
    treeData: v.string(), // JSON stringified tree data
  })
    .index("by_root_cat", ["rootCatId"]),

  // Admin sessions for authentication
  adminSessions: defineTable({
    sessionId: v.string(),
    isValid: v.boolean(),
    expiresAt: v.number(), // Unix timestamp
    createdBy: v.optional(v.string()), // Could track who created the session
  })
    .index("by_session_id", ["sessionId"])
    .index("by_validity", ["isValid"]),

  // Optional: Contact form submissions
  contactSubmissions: defineTable({
    name: v.string(),
    email: v.string(),
    message: v.string(),
    status: v.union(
      v.literal("new"), 
      v.literal("read"), 
      v.literal("replied")
    ),
  })
    .index("by_status", ["status"]),

  // Optional: Image metadata if you want to track uploaded images
  images: defineTable({
    filename: v.string(),
    url: v.string(),
    uploadedAt: v.string(),
    associatedCatId: v.optional(v.id("cats")),
    imageType: v.union(
      v.literal("profile"), 
      v.literal("gallery"), 
      v.literal("general")
    ),
  })
    .index("by_cat", ["associatedCatId"])
    .index("by_type", ["imageType"]),

  // Global site settings
  siteSettings: defineTable({
    key: v.string(), // Unique setting key
    value: v.string(), // JSON stringified value
    type: v.union(
      v.literal("social_media"),
      v.literal("contact_info"), 
      v.literal("site_content"),
      v.literal("feature_toggle")
    ),
    description: v.optional(v.string()), // Human-readable description
  })
    .index("by_key", ["key"])
    .index("by_type", ["type"]),

  // TikTok videos for cats
  tiktokVideos: defineTable({
    catId: v.optional(v.id("cats")), // If null, it's a global video
    videoUrl: v.string(), // TikTok video URL
    embedId: v.optional(v.string()), // TikTok embed ID if available
    thumbnail: v.string(), // Thumbnail image URL
    title: v.string(),
    description: v.optional(v.string()),
    hashtags: v.array(v.string()),
    viewCount: v.optional(v.number()),
    likeCount: v.optional(v.number()),
    commentCount: v.optional(v.number()),
    shareCount: v.optional(v.number()),
    isActive: v.boolean(), // Can be disabled without deleting
    sortOrder: v.number(), // For manual ordering
  })
    .index("by_cat", ["catId"])
    .index("by_active", ["isActive"])
    .index("by_cat_active", ["catId", "isActive"])
    .index("by_sort_order", ["sortOrder"]),

  // Simple reservations table
  reservations: defineTable({
    customerName: v.string(),
    phoneNumber: v.string(),
    message: v.string(),
  }), // _creationTime is automatically indexed
}); 
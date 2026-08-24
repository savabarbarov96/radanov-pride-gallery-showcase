import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

const pageValidator = v.union(
  v.literal("breeding"),
  v.literal("kittens"),
  v.literal("litters"),
  v.literal("shows")
);

export const getActivePageMedia = query({
  args: { page: pageValidator },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("pageMedia")
      .withIndex("by_page_displayed", (q) => q.eq("page", args.page).eq("isDisplayed", true))
      .collect()
      .then((media) => media.sort((a, b) => a.sortOrder - b.sortOrder));
  },
});

export const getAllPageMedia = query({
  args: { page: pageValidator },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("pageMedia")
      .withIndex("by_page", (q) => q.eq("page", args.page))
      .collect()
      .then((media) => media.sort((a, b) => a.sortOrder - b.sortOrder));
  },
});

export const createPageMedia = mutation({
  args: {
    page: pageValidator,
    storageId: v.id("_storage"),
    url: v.string(),
    filename: v.string(),
    altText: v.string(),
    caption: v.optional(v.string()),
    isDisplayed: v.boolean(),
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("pageMedia")
      .withIndex("by_page", (q) => q.eq("page", args.page))
      .collect();

    return await ctx.db.insert("pageMedia", {
      ...args,
      sortOrder: existing.length,
      uploadedAt: new Date().toISOString(),
    });
  },
});

export const updatePageMedia = mutation({
  args: {
    id: v.id("pageMedia"),
    altText: v.optional(v.string()),
    caption: v.optional(v.string()),
    isDisplayed: v.optional(v.boolean()),
    sortOrder: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const { id, ...updates } = args;
    const cleanUpdates = Object.fromEntries(Object.entries(updates).filter(([, value]) => value !== undefined));
    await ctx.db.patch(id, cleanUpdates);
    return await ctx.db.get(id);
  },
});

export const deletePageMedia = mutation({
  args: { id: v.id("pageMedia"), storageId: v.id("_storage") },
  handler: async (ctx, args) => {
    await ctx.storage.delete(args.storageId);
    await ctx.db.delete(args.id);
  },
});

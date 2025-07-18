import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

// Query functions
export const getAllCats = query({
  args: {},
  returns: v.array(v.object({
    _id: v.id("cats"),
    _creationTime: v.number(),
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
  })),
  handler: async (ctx) => {
    return await ctx.db.query("cats").collect();
  },
});

export const getDisplayedCats = query({
  args: {},
  returns: v.array(v.object({
    _id: v.id("cats"),
    _creationTime: v.number(),
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
  })),
  handler: async (ctx) => {
    return await ctx.db
      .query("cats")
      .filter((q) => q.eq(q.field("isDisplayed"), true))
      .collect();
  },
});

export const getCatById = query({
  args: { id: v.id("cats") },
  returns: v.union(
    v.object({
      _id: v.id("cats"),
      _creationTime: v.number(),
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
    }),
    v.null()
  ),
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id);
  },
});

// Mutation functions
export const addCat = mutation({
  args: {
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
  },
  returns: v.id("cats"),
  handler: async (ctx, args) => {
    return await ctx.db.insert("cats", args);
  },
});

export const updateCat = mutation({
  args: {
    id: v.id("cats"),
    name: v.optional(v.string()),
    subtitle: v.optional(v.string()),
    image: v.optional(v.string()),
    description: v.optional(v.string()),
    age: v.optional(v.string()),
    color: v.optional(v.string()),
    status: v.optional(v.string()),
    price: v.optional(v.string()),
    gallery: v.optional(v.array(v.string())),
    gender: v.optional(v.union(v.literal("male"), v.literal("female"))),
    birthDate: v.optional(v.string()),
    registrationNumber: v.optional(v.string()),
    isDisplayed: v.optional(v.boolean()),
    freeText: v.optional(v.string()),
  },
  returns: v.null(),
  handler: async (ctx, args) => {
    const { id, ...updates } = args;
    // Remove undefined values
    const cleanUpdates = Object.fromEntries(
      Object.entries(updates).filter(([_, value]) => value !== undefined)
    );
    
    if (Object.keys(cleanUpdates).length > 0) {
      await ctx.db.patch(id, cleanUpdates);
    }
    return null;
  },
});

export const deleteCat = mutation({
  args: { id: v.id("cats") },
  returns: v.null(),
  handler: async (ctx, args) => {
    // First delete all pedigree connections involving this cat
    const connections = await ctx.db
      .query("pedigreeConnections")
      .filter((q) => 
        q.or(
          q.eq(q.field("parentId"), args.id),
          q.eq(q.field("childId"), args.id)
        )
      )
      .collect();
    
    for (const connection of connections) {
      await ctx.db.delete(connection._id);
    }
    
    // Then delete the cat
    await ctx.db.delete(args.id);
    return null;
  },
});

export const toggleCatDisplay = mutation({
  args: { id: v.id("cats") },
  returns: v.null(),
  handler: async (ctx, args) => {
    const cat = await ctx.db.get(args.id);
    if (cat) {
      await ctx.db.patch(args.id, { isDisplayed: !cat.isDisplayed });
    }
    return null;
  },
});
import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

// Query functions
export const getAllConnections = query({
  args: {},
  returns: v.array(v.object({
    _id: v.id("pedigreeConnections"),
    _creationTime: v.number(),
    parentId: v.id("cats"),
    childId: v.id("cats"),
    type: v.union(v.literal("mother"), v.literal("father")),
  })),
  handler: async (ctx) => {
    return await ctx.db.query("pedigreeConnections").collect();
  },
});

export const getParents = query({
  args: { catId: v.id("cats") },
  returns: v.object({
    mother: v.union(
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
    father: v.union(
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
  }),
  handler: async (ctx, args) => {
    const connections = await ctx.db
      .query("pedigreeConnections")
      .withIndex("by_child", (q) => q.eq("childId", args.catId))
      .collect();

    const motherConnection = connections.find(conn => conn.type === "mother");
    const fatherConnection = connections.find(conn => conn.type === "father");

    const mother = motherConnection ? await ctx.db.get(motherConnection.parentId) : null;
    const father = fatherConnection ? await ctx.db.get(fatherConnection.parentId) : null;

    return { mother, father };
  },
});

export const getChildren = query({
  args: { catId: v.id("cats") },
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
  handler: async (ctx, args) => {
    const connections = await ctx.db
      .query("pedigreeConnections")
      .withIndex("by_parent", (q) => q.eq("parentId", args.catId))
      .collect();

    const children = [];
    for (const connection of connections) {
      const child = await ctx.db.get(connection.childId);
      if (child) {
        children.push(child);
      }
    }

    return children;
  },
});

// Mutation functions
export const addConnection = mutation({
  args: {
    parentId: v.id("cats"),
    childId: v.id("cats"),
    type: v.union(v.literal("mother"), v.literal("father")),
  },
  returns: v.id("pedigreeConnections"),
  handler: async (ctx, args) => {
    // Validate: prevent self-parenting
    if (args.parentId === args.childId) {
      throw new Error("Cat cannot be parent of itself");
    }

    // Remove existing connection of the same type for this child
    const existingConnections = await ctx.db
      .query("pedigreeConnections")
      .withIndex("by_child_type", (q) => 
        q.eq("childId", args.childId).eq("type", args.type)
      )
      .collect();

    for (const connection of existingConnections) {
      await ctx.db.delete(connection._id);
    }

    // Create new connection
    return await ctx.db.insert("pedigreeConnections", args);
  },
});

export const removeConnection = mutation({
  args: { connectionId: v.id("pedigreeConnections") },
  returns: v.null(),
  handler: async (ctx, args) => {
    await ctx.db.delete(args.connectionId);
    return null;
  },
});
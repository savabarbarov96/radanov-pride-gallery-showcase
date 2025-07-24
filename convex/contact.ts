import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

// Submit a contact form
export const submitContact = mutation({
  args: {
    name: v.string(),
    email: v.string(),
    message: v.string(),
  },
  handler: async (ctx, args) => {
    const contactId = await ctx.db.insert("contactSubmissions", {
      name: args.name,
      email: args.email,
      message: args.message,
      status: "new",
    });

    return contactId;
  },
});

// Get all contact submissions (admin)
export const getAllContacts = query({
  handler: async (ctx) => {
    return await ctx.db
      .query("contactSubmissions")
      .order("desc")
      .collect();
  },
});

// Get contacts by status
export const getContactsByStatus = query({
  args: { 
    status: v.union(
      v.literal("new"), 
      v.literal("read"), 
      v.literal("replied")
    ) 
  },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("contactSubmissions")
      .withIndex("by_status", (q) => q.eq("status", args.status))
      .order("desc")
      .collect();
  },
});

// Update contact status
export const updateContactStatus = mutation({
  args: {
    contactId: v.id("contactSubmissions"),
    status: v.union(
      v.literal("new"), 
      v.literal("read"), 
      v.literal("replied")
    ),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.contactId, { status: args.status });
    return await ctx.db.get(args.contactId);
  },
});

// Mark contact as read
export const markContactAsRead = mutation({
  args: { contactId: v.id("contactSubmissions") },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.contactId, { status: "read" });
    return await ctx.db.get(args.contactId);
  },
});

// Mark contact as replied
export const markContactAsReplied = mutation({
  args: { contactId: v.id("contactSubmissions") },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.contactId, { status: "replied" });
    return await ctx.db.get(args.contactId);
  },
});

// Delete contact submission
export const deleteContact = mutation({
  args: { contactId: v.id("contactSubmissions") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.contactId);
    return { success: true };
  },
});

// Get contact statistics
export const getContactStatistics = query({
  handler: async (ctx) => {
    const allContacts = await ctx.db.query("contactSubmissions").collect();
    
    const newContacts = allContacts.filter(c => c.status === "new");
    const readContacts = allContacts.filter(c => c.status === "read");
    const repliedContacts = allContacts.filter(c => c.status === "replied");

    return {
      total: allContacts.length,
      new: newContacts.length,
      read: readContacts.length,
      replied: repliedContacts.length,
      responseRate: allContacts.length > 0 ? 
        (repliedContacts.length / allContacts.length) * 100 : 0
    };
  },
});

// Bulk update contact status
export const bulkUpdateContactStatus = mutation({
  args: {
    contactIds: v.array(v.id("contactSubmissions")),
    status: v.union(
      v.literal("new"), 
      v.literal("read"), 
      v.literal("replied")
    ),
  },
  handler: async (ctx, args) => {
    const results = [];
    
    for (const contactId of args.contactIds) {
      await ctx.db.patch(contactId, { status: args.status });
      const updatedContact = await ctx.db.get(contactId);
      results.push(updatedContact);
    }
    
    return results;
  },
}); 
import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

// Submit new reservation (public)
export const submitReservation = mutation({
  args: {
    customerName: v.string(),
    phoneNumber: v.string(),
    message: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("reservations", {
      customerName: args.customerName,
      phoneNumber: args.phoneNumber,
      message: args.message,
    });
  },
});

// Get all reservations (admin) - ordered by submission date (newest first)
export const getAllReservations = query({
  handler: async (ctx) => {
    return await ctx.db
      .query("reservations")
      .order("desc")
      .collect();
  },
});

// Delete reservation (admin)
export const deleteReservation = mutation({
  args: { 
    reservationId: v.id("reservations") 
  },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.reservationId);
  },
});
import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { auth } from "./auth";

export const current = query({
  args: {},
  handler: async (ctx) => {
    const userId = await auth.getUserId(ctx);

    if (userId === null) return null;

    const user = await ctx.db.get(userId);
    if (!user) throw new Error("User not found");

    return user;
  },
});

export const update = mutation({
  args: {
    id: v.id("users"),
    name: v.string(),
  },
  handler: async (ctx, args) => {
    const userId = await auth.getUserId(ctx);
    if (!userId) throw new Error("Unauthorized");

    await ctx.db.patch(args.id, {
      name: args.name,
    });

    return args.id;
  },
});

import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { auth } from "./auth";

export const current = query({
  args: {},
  handler: async (ctx) => {
    const userId = await auth.getUserId(ctx);

    if (userId === null) return;

    return await ctx.db.get(userId);
  },
});

export const getById = query({
  args: {
    id: v.id("users"),
  },
  handler: async (ctx, args) => {
    const userId = await auth.getUserId(ctx);
    if (!userId) return;

    const user = await ctx.db.get(args.id);

    return user;
  },
});

export const update = mutation({
  args: {
    id: v.id("users"),
    name: v.string(),
    image: v.optional(v.id("_storage")),
  },
  handler: async (ctx, args) => {
    const userId = await auth.getUserId(ctx);
    if (!userId) throw new Error("Unauthorized");

    if (userId !== args.id) throw new Error("Unauthorized");

    await ctx.db.patch(args.id, {
      name: args.name,
      image: args.image,
    });

    return args.id;
  },
});

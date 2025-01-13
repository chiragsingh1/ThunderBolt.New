import { GenericId, v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const CreateWorkspace = mutation({
    args: {
        messages: v.any(),
        user: v.id("users"),
    },
    handler: async (ctx, args) => {
        const workspaceId = await ctx.db.insert("workspace", {
            messages: args.messages,
            user: args.user as GenericId<"users">,
        });
        return workspaceId;
    },
});

export const GetWorkspace = query({
    args: {
        workspaceId: v.id("workspace"),
    },
    handler: async (ctx, args) => {
        const workspace = await ctx.db.get(args.workspaceId);
        return workspace;
    },
});

export const UpdateMessages = mutation({
    args: {
        workspaceId: v.id("workspace"),
        messages: v.any(),
    },
    handler: async (ctx, args) => {
        const result = await ctx.db.patch(args.workspaceId, {
            messages: args.messages,
        });
        return result;
    },
});

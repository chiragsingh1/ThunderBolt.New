import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const CreateUser = mutation({
    args: {
        name: v.string(),
        email: v.string(),
        picture: v.string(),
        uid: v.string(),
        token: v.number(),
    },
    handler: async (ctx, args) => {
        // check if user already exists.
        const user = await ctx.db
            .query("users")
            .filter((q) => q.eq(q.field("email"), args.email))
            .collect();
        // console.log("LOG:User found: ", user);

        if (user?.length === 0) {
            // create user
            const newUser = await ctx.db.insert("users", {
                name: args.name,
                email: args.email,
                picture: args.picture,
                uid: args.uid,
                token: 50000,
            });

            // console.log("LOG:New User created: ", newUser);
        }
    },
});

export const GetUser = query({
    args: {
        email: v.string(),
    },
    handler: async (ctx, args) => {
        const user = await ctx.db
            .query("users")
            .filter((q) => q.eq(q.field("email"), args.email))
            .collect();

        return user[0];
    },
});

export const UpdateToken = mutation({
    args: {
        userId: v.id("users"),
        tokenCount: v.number(),
    },
    handler: async (ctx, args) => {
        const result = await ctx.db.patch(args.userId, {
            token: args.tokenCount,
        });
        return result;
    },
});

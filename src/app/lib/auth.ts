
import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "@better-auth/mongo-adapter";

const mongoUrl = process.env.BETTER_AUTH_URL_DB;

if (!mongoUrl) {
    throw new Error("BETTER_AUTH_URL_DB environment variable is required");
}

const client = new MongoClient(mongoUrl);

const db = client.db("usertest");

export const auth = betterAuth({
    baseURL: process.env.BETTER_AUTH_URL,

    database: mongodbAdapter(db, {
        client,
    }),
    emailAndPassword: {
        enabled: true,
    },



});
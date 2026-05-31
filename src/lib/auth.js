

import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { MongoClient } from "mongodb";
import { jwt } from "better-auth/plugins"


console.log("MONGODB_URL =", process.env.MONGODB_URL);
console.log("GOOGLE_CLIENT_ID =", process.env.GOOGLE_CLIENT_ID);
console.log("BETTER_AUTH_URL =", process.env.BETTER_AUTH_URL);
console.log("NEXT_PUBLIC_ROOMS_DATA_URL =", process.env.NEXT_PUBLIC_ROOMS_DATA_URL);

if (!process.env.MONGODB_URL) {
  throw new Error("MONGODB_URL is missing");
}

const client = new MongoClient(process.env.MONGODB_URL);

await client.connect();

const db = client.db("StudyNook");

export const auth = betterAuth({
  database: mongodbAdapter(db),


    trustedOrigins: [
    "http://localhost:3000",
    "https://studynook-iota.vercel.app",
  ],

  emailAndPassword: {
    enabled: true,
  },


    socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    },
  },

  session:{
    cookieCache : {
      enabled: true,
      strategy: "jwt",
      maxAge: 5* 24 * 60 * 60 //in sec
    }
  },
      plugins: [
        jwt(), 
    ]

});
// import { betterAuth } from "better-auth";
// import { MongoClient } from "mongodb";
// import { mongodbAdapter } from "better-auth/adapters/mongodb";

// const client = new MongoClient(process.env.MONGODB_URL);
// const db = client.db("rooms");

// export const auth = betterAuth({
//   database: mongodbAdapter(db, {
//     // Optional: if you don't provide a client, database transactions won't be enabled.
//     client,
//   }),
//     trustedOrigins: [
//     "http://localhost:3000",
//     "http://localhost:3001",
//   ],
// });

import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { MongoClient } from "mongodb";

const client = new MongoClient(process.env.MONGODB_URL);

const db = client.db("rooms");

export const auth = betterAuth({
  database: mongodbAdapter(db),

  emailAndPassword: {
    enabled: true,
  },

  trustedOrigins: ["http://localhost:3000"],
});
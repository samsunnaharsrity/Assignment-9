

import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { MongoClient } from "mongodb";
import { jwt } from "better-auth/plugins"


const client = new MongoClient(process.env.MONGODB_URL);

const db = client.db("rooms");

export const auth = betterAuth({
  database: mongodbAdapter(db),

  emailAndPassword: {
    enabled: true,
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
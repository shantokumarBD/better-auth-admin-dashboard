import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";

const client = new MongoClient(process.env.BETTER_AUTH_DB_URL);
const db = client.db("dashboard-data");

export const auth = betterAuth({
  emailAndPassword: {
    enabled: true,
  },
   socialProviders: {
        google: { 
            clientId: process.env.BETTER_AUTH_CLIENT_ID , 
            clientSecret: process.env.BETTER_AUTH_SECRET, 
        }, 
         github: { 
            clientId: process.env.BETTER_AUTH_GITHUB_CLIENT_ID , 
            clientSecret: process.env.BETTER_AUTH_GITHUB_SECRET, 
        }, 
    },

  database: mongodbAdapter(db, {
    client,
  }),
});

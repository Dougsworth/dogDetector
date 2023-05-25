// Import the necessary modules
import express from "express";
import { ApolloServer, gql } from "apollo-server-express";
import * as dotenv from "dotenv";
import { DocumentNode } from "graphql";

// Load environment variables from a .env file into process.env
dotenv.config();

const Replicate: any = require("replicate");
// Retrieve the API token from the environment variables
const REPLICATE_API_TOKEN: string = process.env.REPLICATE_API_TOKEN || "";

// Define your GraphQL schema
const typeDefs: DocumentNode = gql`
  type Query {
    detectDog(imageUrl: String!): Boolean
  }
`;

// Initialize the Replicate instance with the API token
const replicate = new Replicate({
  auth: REPLICATE_API_TOKEN,
});

// Define your resolvers for the GraphQL queries
const resolvers: any = {
  Query: {
    detectDog: async (_: any, { imageUrl }: { imageUrl: string }) => {
      try {
        // Run the model with the given image URL and a question
        const output: any = await replicate.run(
          "andreasjansson/blip-2:4b32258c42e9efd4288bb9910bc532a69727f9acd26aa08e175713a0a857a608",
          {
            input: {
              image: imageUrl,
              question: "Is there a dog in this image?",
            },
          }
        );

        // If the output is a string, check if it includes "yes" (meaning there's a dog in the image)
        if (typeof output === "string") {
          const hasDog = output.toLowerCase().includes("yes");
          console.log(`Detection successful. Dog detected: ${hasDog}`);
          return hasDog;
        } else {
          // If the output is not a string, log it and throw an error
          console.error("Unexpected output:", output);
          throw new Error(
            "Unexpected output from the model: " + JSON.stringify(output)
          );
        }
      } catch (error) {
        if (error instanceof Error) {
          // If it's an Error object, use its message property
          throw new Error(error.message);
        } else {
          // If it's not, use a default message
          throw new Error("An unknown error occurred");
        }
      }
    },
  },
};

// Initialize the Apollo server with your type definitions and resolvers
const server: ApolloServer = new ApolloServer({ typeDefs, resolvers });

// Initialize an Express application
const app: express.Application = express();

// Start the Apollo server
server.start().then(() => {
  // Apply the Apollo server as a middleware to the Express application
  server.applyMiddleware({ app });

  // Start the Express server on port 4000
  app.listen({ port: 4000 }, () =>
    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
  );
});

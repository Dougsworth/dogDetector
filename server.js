const express = require("express");
const { ApolloServer, gql } = require("apollo-server-express");
const Replicate = require("replicate");

// Your actual API token
const REPLICATE_API_TOKEN = "r8_VmzqsPf7dUTvX5vP0zlSYRru68HEQEt1aWh3e";

// Construct a schema, using GraphQL schema language
const typeDefs = gql`
  type Query {
    hello: String
    detectDog(imageUrl: String!): Boolean
  }
`;

// Initialize the Replicate client
const replicate = new Replicate({
  auth: REPLICATE_API_TOKEN,
});

// Provide resolver functions for your schema fields
const resolvers = {
  Query: {
    hello: () => "Hello world!",
    detectDog: async (_, { imageUrl }) => {
      try {
        // Run the BLIP-2 model with the image URL
        const output = await replicate.run(
          "andreasjansson/blip-2:4b32258c42e9efd4288bb9910bc532a69727f9acd26aa08e175713a0a857a608",
          {
            input: {
              image: imageUrl,
              question: "Is there a dog in this image?",
            },
          }
        );

        // Check if output is a string
        if (typeof output === "string") {
          // Return true if the output indicates that a dog is present, false otherwise
          return output.toLowerCase().includes("yes");
        } else {
          console.error("Unexpected output:", output);
          throw new Error(
            "Unexpected output from the model: " + JSON.stringify(output)
          );
        }
      } catch (error) {
        // Handle any errors
        throw new Error(error);
      }
    },
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

const app = express();

// Start the server before applying middleware
server.start().then(() => {
  server.applyMiddleware({ app });
  app.listen({ port: 4000 }, () =>
    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
  );
});

const express = require("express");
const { ApolloServer, gql } = require("apollo-server-express");
const Replicate = require("replicate");

const REPLICATE_API_TOKEN = "r8_VmzqsPf7dUTvX5vP0zlSYRru68HEQEt1aWh3e";

const typeDefs = gql`
  type Query {
    hello: String
    detectDog(imageUrl: String!): Boolean
  }
`;

const replicate = new Replicate({
  auth: REPLICATE_API_TOKEN,
});

const resolvers = {
  Query: {
    detectDog: async (_, { imageUrl }) => {
      try {
        const output = await replicate.run(
          "andreasjansson/blip-2:4b32258c42e9efd4288bb9910bc532a69727f9acd26aa08e175713a0a857a608",
          {
            input: {
              image: imageUrl,
              question: "Is there a dog in this image?",
            },
          }
        );

        if (typeof output === "string") {
          return output.toLowerCase().includes("yes");
        } else {
          console.error("Unexpected output:", output);
          throw new Error(
            "Unexpected output from the model: " + JSON.stringify(output)
          );
        }
      } catch (error) {
        throw new Error(error);
      }
    },
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

const app = express();

server.start().then(() => {
  server.applyMiddleware({ app });
  app.listen({ port: 4000 }, () =>
    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
  );
});

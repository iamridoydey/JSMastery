import { ApolloServer,  BaseContext } from "@apollo/server";
import { userSchema } from "./user";

async function createGraphqlServer() {
  // Create graphql server
  const gqlServer = new ApolloServer<BaseContext>({
    // Schema
    typeDefs: `
      # All general types
      ${userSchema.typeDefs}

      # All queries
      ${userSchema.queries}
      
      # All mutations
      type Mutation {
        ${userSchema.mutations}
      }
    `,
    resolvers: {
      Query: { ...userSchema.resolvers.queries },
      Mutation: { ...userSchema.resolvers.mutations },
    },
  });

  // Start the graphql server
  await gqlServer.start();

  return gqlServer;
}

export default createGraphqlServer;

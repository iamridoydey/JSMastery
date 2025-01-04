import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import express, { Request, Response } from "express";

async function init() {
  const app = express();
  const PORT = Number(process.env.PORT) || 8000;

  // Body parser
  app.use(express.json());

  // Create graphql server
  const gqlServer = new ApolloServer({
    // Schema
    typeDefs: `
      type User {
        name: String!
      }

      type Query {
        hello: String
        hey(name: String!): String
      }
    `,

    resolvers: {
      Query: {
        hello: () => "Hello graphql",
        hey: (parent, { name }: { name: string }) =>
          `Hello, ${name}. How are you?`,
      },
    },
  });

  // Start the graphql server
  await gqlServer.start();

  app.get("/", (req: Request, res: Response) => {
    res.send("<h1>Hello GraphQL</h1>");
  });

  app.use("/graphql", expressMiddleware(gqlServer));
  app.listen(PORT, () => {
    console.log(`Server started at http://localhost:${PORT}`);
  });
}

init();

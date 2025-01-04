const express = require("express");
const { ApolloServer } = require("@apollo/server");
const { expressMiddleware } = require("@apollo/server/express4");
const bodyParser = require("body-parser");
const cors = require("cors");

async function startServer() {
  const app = express();
  const server = new ApolloServer({
    typeDefs: `
      type Todo {
        id: ID!
        title: String!
        completed: Boolean
      }
        
      type Query{
        getTodos: [Todos]
      }
      `,
    resolvers: {
      Query: {
        getTodos: ()=> [
          {}
        ]
      }
    },
  });

  app.use(bodyParser.json());
  app.use(cors());

  await server.start();

  app.use("/graphql", expressMiddleware(server));
  app.listen(3000, () => {
    console.log(`Server started at http://localhost:${300}`);
  });
}

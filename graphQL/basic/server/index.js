const express = require("express");
const { ApolloServer } = require("@apollo/server");
const { expressMiddleware } = require("@apollo/server/express4");
const bodyParser = require("body-parser");
const cors = require("cors");
const axios = require("axios");

async function startServer() {
  const app = express();
  const server = new ApolloServer({
    typeDefs: `
      type Todo {
        id: ID!
        title: String!
        completed: Boolean
        userId: ID!
        user: User
      }
      
      type User {
        id: ID!
        name: String!
        email: String!
        website: String
      }
        
      type Query{
        getTodos: [Todo]
        getAllUser: [User]
        getUserById(id: ID!): User
      }
      `,
    resolvers: {
      Todo: {
        user: async (todo) =>
          (
            await axios.get(
              `https://jsonplaceholder.typicode.com/users/${todo.userId}`
            )
          ).data,
      },
      Query: {
        getTodos: async () =>
          (await axios.get("https://jsonplaceholder.typicode.com/todos")).data,
        getAllUser: async () =>
          (await axios.get("https://jsonplaceholder.typicode.com/users")).data,
        getUserById: async (parent, { id }) =>
          (await axios.get(`https://jsonplaceholder.typicode.com/users/${id}`))
            .data,
      },
    },
  });

  app.use(bodyParser.json());
  app.use(cors());

  await server.start();

  app.use("/graphql", expressMiddleware(server));
  app.listen(8000, () => {
    console.log(`Server started at http://localhost:${8000}`);
  });
}

startServer();

import { expressMiddleware } from "@apollo/server/express4";
import express, { Request, Response } from "express";
import createGraphqlServer from "./graphql";
import { verify } from "node:crypto";
import { UserService } from "./services/user";

async function init() {
  const app = express();
  const PORT = Number(process.env.PORT) || 8000;

  // Body parser
  app.use(express.json());

  app.get("/", (req: Request, res: Response) => {
    res.send("<h1>Hello GraphQL</h1>");
  });

  app.use(
    "/graphql",
    expressMiddleware(await createGraphqlServer(), {
      context: async ({ req }) => {
        const token = req.headers["token"];
        if (!token) return {};
        const user = UserService.verifyToken(token as string);
        return { user };
      },
    })
  );
  app.listen(PORT, () => {
    console.log(`Server started at http://localhost:${PORT}`);
  });
}

init();

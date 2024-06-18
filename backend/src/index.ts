import { Hono } from "hono";
import { signinHandler, signupHandler } from "./handlers/userHandler";
import {
  blogCreateHandler,
  blogGetHandler,
  blogUpdateHandler,
  bulkGetHandler,
} from "./handlers/blogHandler";
import authMiddleware from "./middleware/auth";
import { cors } from "hono/cors";

export type env = {
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
  Variables: {
    userId: string;
  };
};

const app = new Hono();

app.use(cors());

app.post("/api/v1/signup", signupHandler);
app.post("/api/v1/signin", signinHandler);

app.post("/api/v1/blog", authMiddleware, blogCreateHandler);
app.put("/api/v1/blog/:id", authMiddleware, blogUpdateHandler);
app.get("/api/v1/blog/:id", authMiddleware, blogGetHandler);
app.get("/api/v1/blogs/bulk", authMiddleware, bulkGetHandler);

export default app;

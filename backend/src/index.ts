import { Hono } from "hono";

import { decode, verify } from "hono/jwt";
import { userRouter } from "./routes/user";
import { blogRouter } from "./routes/blog";
import { cors } from "hono/cors";
const app = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
  Variables: {
    userId: string;
    userName: string;
  };
}>();

// Middleware
app.use("/api/*", cors());
app.use("/api/v1/blog/*", async (c, next) => {
  const jwt = c.req.header("Authorization");
  if (!jwt) {
    c.status(401);
    return c.json({ error: "Unauthorized" });
  }
  const token = jwt.split(" ")[1];
  try {
    const payLoad = await verify(token, c.env.JWT_SECRET);
    if (!payLoad) {
      c.status(401);
      return c.json({ error: "Unauthorized" });
    }
    c.set("userId", payLoad.id);
    c.set("userName", payLoad.name);
    await next();
  } catch (e) {
    c.status(403);
    return c.json({ error: "Unauthorized" });
  }
});

// SIGN UP ROUTE

app.route("/api/v1/user", userRouter);
app.route("/api/v1/blog", blogRouter);

export default app;

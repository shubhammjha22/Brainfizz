import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { z } from "zod";
import { sign, verify } from "hono/jwt";

export const userRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
}>();

const signupInput = z.object({
  email: z.string().email({ message: "Invalid Email" }),
  password: z
    .string()
    .min(8, { message: "Password should be more than 8 character" }),
  name: z.string(),
});

userRouter.post("/signup", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();
  const { success } = signupInput.safeParse(body);
  if (!success) {
    c.status(400);
    return c.json({ message: "Invalid Inputs" });
  }
  try {
    const user = await prisma.user.create({
      data: {
        email: body.email,
        password: body.password,
        name: body.name,
        // optionally adding name
      },
    });
    const jwt = await sign({ id: user.id, name: user.name }, c.env.JWT_SECRET);
    const name = user.name;

    return c.json({ message: "SignUp Successful", jwt, name });
  } catch (e) {
    c.status(403);
    return c.json({ error: "Error while signing Up." });
  }
});

// Sign IN ROUTE

const signIn = z.object({
  email: z.string().email(),
  password: z.string(),
});

userRouter.post("/signin", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());
  const body = await c.req.json();
  const { success } = signIn.safeParse(body);
  if (!success) {
    c.status(400);
    return c.json({ message: "Invalid Inputs" });
  }

  const user = await prisma.user.findFirst({
    where: {
      email: body.email,
      password: body.password,
    },
  });

  if (!user) {
    c.status(403);
    return c.json({ error: "Incorrect Creditential / User doesn't exist" });
  }
  const name = user.name;
  const jwt = await sign({ id: user.id, name: user.name }, c.env.JWT_SECRET);

  return c.json({ message: "Login Successful", jwt, name });
});

userRouter.get("/blogs", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());

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
    const userID = payLoad.id;
    const myPosts = await prisma.user.findMany({
      where: {
        id: userID,
      },
      select: {
        Post: {
          select: {
            content: true,
            title: true,
            id: true,
            author: {
              select: {
                name: true,
              },
            },
          },
        },
      },
    });
    const posts = myPosts[0].Post;
    c.status(200);
    return c.json({ posts });
  } catch (e) {
    c.status(403);
    return c.json({ error: "Unauthorized" });
  }
});

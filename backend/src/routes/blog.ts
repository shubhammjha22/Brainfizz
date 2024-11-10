import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { z } from "zod";

export const blogRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
  Variables: {
    userId: string;
    userName: string;
  };
}>();

const createPost = z.object({
  title: z.string().min(8),
  content: z.string(),
});

blogRouter.post("/", async (c) => {
  const userId = c.get("userId");
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();

  const { success } = createPost.safeParse(body);
  if (!success) {
    c.status(400);
    return c.json({ message: "Invalid Inputs" });
  }
  const post = await prisma.post.create({
    data: {
      title: body.title,
      content: body.content,
      authorId: userId,
    },
  });
  return c.json({
    id: post.id,
  });
});

const updatePost = z.object({
  title: z.string().optional(),
  content: z.string().optional(),
});

blogRouter.put("/", async (c) => {
  const userId = c.get("userId");
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();

  const { success } = updatePost.safeParse(body);
  if (!success) {
    c.status(400);
    return c.json({ message: "Invalid Inputs" });
  }

  try {
    const updated = await prisma.post.update({
      where: {
        id: body.id,
        authorId: userId,
      },
      data: {
        title: body.title,
        content: body.content,
      },
    });

    console.log(updated);

    return c.json({ message: "Post Updated" });
  } catch (error) {
    c.status(400);
    return c.json({ error: "some error" });
  }
});

blogRouter.delete("/:id", async (c) => {
  const userId = c.get("userId");
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());

  // const body = await c.req.json();
  const id = c.req.param("id");
  console.log(id);

  try {
    const updated = await prisma.post.delete({
      where: {
        id: c.req.param("id"),
        authorId: userId,
      },
    });

    console.log(updated);

    return c.json({ message: "Post Deleted" });
  } catch (error) {
    c.status(400);
    return c.json({ error: "some error" });
  }
});

blogRouter.get("/bulk", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());

  const posts = await prisma.post.findMany({
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
  });
  console.log("Post data- ", posts);
  const name = c.get("userName");
  return c.json({ name, posts });
});

blogRouter.get("/:id", async (c) => {
  const userId = c.get("userId");
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());

  const postId = c.req.param("id");

  const postDetail = await prisma.post.findUnique({
    where: {
      id: postId,
    },
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
  });
  console.log(userId);
  return c.json(postDetail);
});

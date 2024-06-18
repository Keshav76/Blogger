import { PrismaClient } from "@prisma/client/edge";
import { Handler } from "hono";
import { env } from "..";
import { withAccelerate } from "@prisma/extension-accelerate";
import { updateSchema, createSchema } from "@keshav-banka/validation";

export const blogCreateHandler: Handler<env> = async (c) => {
  const body = await c.req.json();
  const { success, data } = createSchema.safeParse(body);
  if (!success) {
    c.status(403);
    return c.json({ msg: "Invalid Data" });
  }

  const db = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  console.log(c.get("userId"));
  const newBlog = await db.post.create({
    data: {
      content: data.content,
      title: data.title,
      published: data.published,
      authorId: c.get("userId"),
    },
  });

  return c.json({ id: newBlog.id });
};
export const blogGetHandler: Handler<env> = async (c) => {
  const db = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const blog = await db.post.findUnique({
    where: { id: c.req.param("id") },
    select: {
      id: true,
      content: true,
      title: true,
      author: {
        select: { name: true },
      },
    },
  });

  return c.json({ blog });
};
export const blogUpdateHandler: Handler = async (c) => {
  const body = await c.req.json();
  const { success, data } = updateSchema.safeParse(body);
  if (!success) {
    c.status(403);
    return c.json({ msg: "Invalid Data" });
  }

  const db = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const newBlog = await db.post.update({
    where: {
      id: c.req.param("id"),
      authorId: c.get("userId"),
    },
    data,
  });

  return c.json({ msg: "Updated" });
};

export const bulkGetHandler: Handler<env> = async (c) => {
  const db = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const blogs = await db.post.findMany({
    select: {
      id: true,
      content: true,
      title: true,
      author: {
        select: { name: true },
      },
    },
  });

  return c.json({ blogs });
};

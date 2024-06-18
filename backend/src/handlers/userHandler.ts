import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Handler } from "hono";

import { signinSchema, signupSchema } from "@keshav-banka/validation";
import { env } from "../index";
import encrypt from "../security/encryption";
import { sign } from "hono/jwt";

export const signupHandler: Handler<env> = async (c) => {
  const db = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const { success, data } = signupSchema.safeParse(await c.req.json());
  if (!success) {
    c.status(403);
    return c.json({ msg: "Invalid Data" });
  }

  const existingUser = await db.user.findUnique({
    where: { email: data.email },
  });

  if (existingUser) {
    c.status(403);
    return c.json({ msg: "Email already registered" });
  }

  data.password = await encrypt(data.password);
  const newUser = await db.user.create({ data });

  const token = await sign({ id: newUser.id }, c.env.JWT_SECRET);

  return c.json({ token, name: newUser.name });
};

export const signinHandler: Handler<env> = async (c) => {
  const db = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const { success, data } = signinSchema.safeParse(await c.req.json());
  if (!success) {
    c.status(403);
    return c.json({ msg: "Invalid Data" });
  }

  const password = await encrypt(data.password);
  const existingUser = await db.user.findUnique({
    where: { email: data.email, password },
  });

  if (!existingUser) {
    c.status(403);
    return c.json({ msg: "No such user" });
  }

  const token = await sign({ id: existingUser.id }, c.env.JWT_SECRET);
  return c.json({ token, name: existingUser.name });
};

import { createMiddleware } from "hono/factory";
import { verify } from "hono/jwt";
import { env } from "..";

const authMiddleware = createMiddleware<env>(async (c, next) => {
  const authorization = c.req.header("Authorization");
  if (!authorization || !authorization.startsWith("Bearer ")) {
    c.status(411);
    return c.json({ msg: "Send authorization token" });
  }
  const token = authorization.split(" ")[1];
  try {
    const data = await verify(token, c.env.JWT_SECRET);
    if (!data.id || typeof data.id !== "string") {
      c.status(411);
      return c.json({ msg: "Invalid token" });
    }
    c.set("userId", data.id);
    await next();
  } catch (err) {
    c.status(411);
    return c.json({ msg: "Invalid token" });
  }
});

export default authMiddleware;

import * as jwt from "hono/jwt";
import dayjs from "dayjs";
import type { JWTPayload } from "hono/utils/jwt/types";

const JWT_SECRET = process.env.JWT_SECRET || "secret";

export async function createToken<T extends JWTPayload = any>(user: T) {
  return jwt.sign(user, JWT_SECRET);
}

export async function verifyToken<T = any>(token: string) {
  const data = await jwt.verify(token, JWT_SECRET);
  return data as T;
}

export async function hashPassword(password: string) {
  return Bun.password.hash(password);
}

export async function verifyPassword(password: string, hash: string) {
  return Bun.password.verify(password, hash);
}

export const yyyMMDD = (date?: Date | null) => {
  return date ? dayjs(date).format("YYYY-MM-DD") : undefined;
};

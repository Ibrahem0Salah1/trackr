import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { loginScehma } from "@/lib/validations/auth.schema";
import { signToken } from "@/lib/jwt";
// import { string } from "zod";
import { rateLimiter } from "@/lib/rate-limit";
export async function POST(req: Request) {
  const body = await req.json();
  // Get the client's IP address for rate limiting
  const ip = req.headers.get("x-forwarded-for") || "";
  // Apply rate limiting based on the client's IP address
  console.log(`Login attempt from IP: ${ip}`);
  const rateLimitResult = rateLimiter(`login:${ip}`, 5, 15 * 60 * 1000);
  // If the rate limit is exceeded, return a 429 Too Many Requests response
  if (!rateLimitResult.success) {
    return NextResponse.json(
      {
        error: "Too many login attempts. Try again in 15 minutes.",
        resetTime: rateLimitResult.resetTime,
      },
      { status: 429 }, // 429 = Too Many Requests
    );
  }
  const parsed = loginScehma.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.format() }, { status: 400 });
  }

  const { email, password } = parsed.data;

  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 400 });
  }

  const isValid = await bcrypt.compare(password, user.password);

  if (!isValid) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 400 });
  }

  const token = signToken(user.id.toString());

  const response = NextResponse.json({ success: true }, { status: 200 });

  response.cookies.set("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
  });
  return response;
}

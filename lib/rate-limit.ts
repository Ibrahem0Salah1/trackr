// import { NextResponse } from "next/server";
const rateLimit = new Map();

export function rateLimiter(
  identifier: string,
  limit = 5,
  windowMs = 15 * 60 * 1000,
) {
  const now = Date.now();
  const thisUserAttempts = rateLimit.get(identifier) || {
    count: 0,
    resetTime: now + windowMs,
  };
  //reset the counter if the user exceeded the bloking time (15min)
  if (now > thisUserAttempts.resetTime) {
    thisUserAttempts.count = 0;
    thisUserAttempts.resetTime = now + windowMs; // New 15-minute window
  }
  // Increment the attempt count
  thisUserAttempts.count++;
  rateLimit.set(identifier, thisUserAttempts);
  // if user exceeds the limit
  if (thisUserAttempts.count > limit) {
    return {
      success: false,
      remaining: 0,
      resetTime: thisUserAttempts.resetTime,
    };
  }
  //allowing the request
  return {
    success: true,
    remaining: limit - thisUserAttempts.count,
    resetTime: thisUserAttempts.resetTime,
  };
}

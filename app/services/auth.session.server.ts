import { createCookieSessionStorage } from "@remix-run/node";

const sessionSecret = process.env.SESSION_SECRET ?? "supersecretkey";

export const authSessionStorage = createCookieSessionStorage({
  cookie: {
    name: "auth_session",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    httpOnly: true,
    sameSite: "lax",
    secrets: [sessionSecret],
    maxAge: 60 * 60 * 24,
  },
});

export const {
  getSession: getAuthSession,
  commitSession: commitAuthSession,
  destroySession: destroyAuthSession,
} = authSessionStorage;


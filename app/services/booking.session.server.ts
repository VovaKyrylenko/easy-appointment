import { createCookieSessionStorage } from "@remix-run/node";

const sessionSecret = process.env.SESSION_SECRET ?? "supersecretkey";

export const dataSessionStorage = createCookieSessionStorage({
  cookie: {
    name: "data_session",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    httpOnly: true,
    sameSite: "lax",
    secrets: [sessionSecret],
    maxAge: 60 * 10,
  },
});

export const {
  getSession: getDataSession,
  commitSession: commitDataSession,
  destroySession: destroyDataSession,
} = dataSessionStorage;

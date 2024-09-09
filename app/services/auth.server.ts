import { Authenticator } from "remix-auth";
import { FormStrategy } from "remix-auth-form";
import { authSessionStorage } from "./auth.session.server";

const SUPERUSER_EMAIL = process.env.SUPERUSER_EMAIL ?? "default@example.com";
const SUPERUSER_PASSWORD = process.env.SUPERUSER_PASSWORD ?? "defaultpassword";

async function login(email: string, password: string) {
  if (email === SUPERUSER_EMAIL && password === SUPERUSER_PASSWORD) {
    return { email };
  }
  throw new Error("Invalid credentials");
}

const authenticator = new Authenticator(authSessionStorage, {
  throwOnError: true,
});

authenticator.use(
  new FormStrategy(async ({ form }) => {
    const email = form.get("email") as string | null;
    const password = form.get("password") as string | null;

    if (!email || !password) {
      throw new Error("Missing email or password");
    }

    const user = await login(email, password);
    if (!user) {
      throw new Error("Invalid credentials");
    }
    return user;
  }),
  "user-pass"
);

export { authenticator };

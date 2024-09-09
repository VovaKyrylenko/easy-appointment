import { createRequestHandler } from "@remix-run/express";
import express, { Request } from "express";
import { ApolloServer } from "apollo-server-express";
import { typeDefs } from "./graphql/schema";
import { apartmentResolvers } from "./graphql/resolvers/apartment-resolvers";
import { bookingResolvers } from "./graphql/resolvers/booking-resolvers";
import cookieParser from 'cookie-parser'

const viteDevServer =
  process.env.NODE_ENV === "production"
    ? null
    : await import("vite").then((vite) =>
        vite.createServer({
          server: { middlewareMode: true },
        })
      );

const app = express();
app.use(cookieParser());

const authenticate = (req: Request) => {
  const authSessionCookie = req.cookies.auth_session;
  return !!authSessionCookie;
};

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers: [apartmentResolvers, bookingResolvers],
  context: async ({ req }) => {
   const isAuthenticated = authenticate(req);
   return {
     isAuthenticated,
   };
  },
});
await apolloServer.start();
apolloServer.applyMiddleware({ app });

app.use(
  viteDevServer ? viteDevServer.middlewares : express.static("build/client")
);

const build = viteDevServer
  ? () => viteDevServer.ssrLoadModule("virtual:remix/server-build")
  : //   @ts-ignore import error
    await import("./build/server/index.js");

app.all("*", createRequestHandler({ build }));

app.listen(3000, () => {
  console.log("App listening on http://localhost:3000");
  console.log(`GraphQL server ready at http://localhost:3000/graphql`);
});

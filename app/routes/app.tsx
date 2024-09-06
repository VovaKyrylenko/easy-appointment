import { LoaderFunctionArgs, json } from "@remix-run/node";
import { Outlet, useLoaderData } from "@remix-run/react";
import { Header } from "~/components/common/header";
import { authenticator } from "~/services/auth.server";

export default function AppPage() {
    const { isAuthenticated } = useLoaderData<typeof loader>() || false;
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Header isAuthenticated={isAuthenticated} />
      <main className="container mx-auto flex-1 p-6 mb-6 bg-white rounded-lg shadow-md flex flex-col">
        <Outlet />
      </main>
    </div>
  );
}

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const user = await authenticator.isAuthenticated(request);
  return json({ isAuthenticated: !!user });
};
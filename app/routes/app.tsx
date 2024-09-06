import { Outlet, useLoaderData } from "@remix-run/react";
import { ActionFunctionArgs, LoaderFunctionArgs, json } from "@remix-run/node";
import { authenticator } from "~/services/auth.server";
import { Header } from "~/components/common/header";

export async function loader({ request }: LoaderFunctionArgs) {
  const user = await authenticator.isAuthenticated(request);
  return json({ isAuthenticated: !!user });
}

export async function action({ request }: ActionFunctionArgs) {
  await authenticator.logout(request, { redirectTo: "/app/apartment-pick" });
}

export default function AppPage() {
  const { isAuthenticated } = useLoaderData<typeof loader>()
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Header isAuthenticated={isAuthenticated} />
      <main className="container mx-auto flex-1 p-6 mb-6 bg-white rounded-lg shadow-md flex flex-col">
        <Outlet />
      </main>
    </div>
  );
}

import { Outlet } from "@remix-run/react";
import { Header } from "~/components/common/header";

export default function AppPage() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Header />
      <main className="container mx-auto flex-1 p-6 mb-6 bg-white rounded-lg shadow-md flex flex-col">
        <Outlet />
      </main>
    </div>
  );
}


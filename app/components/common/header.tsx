import { Button } from "~/components/ui/button";
import { Link, useLocation, Form } from "@remix-run/react";

interface HeaderProps {
  isAuthenticated: boolean;
}

export const Header = ({ isAuthenticated }: HeaderProps) => {
  const location = useLocation();
  const isDashboard = location.pathname === "/app/dashboard";
  return (
    <header className="bg-blue-700 text-white py-4 mb-6 rounded-lg shadow-lg rounded-t-none">
      <div className="container mx-auto text-center text-3xl font-extrabold flex justify-between items-center">
        <Link to="/app/apartment-pick">Apartment Booking</Link>
        <Button asChild className="bg-white text-blue-700 hover:bg-blue-100">
          {isAuthenticated && isDashboard ? (
            <Form method="post">
              <button type="submit">Log Out</button>
            </Form>
          ) : isAuthenticated ? (
            <Link to="/app/dashboard">Dashboard</Link>
          ) : (
            <Link to="/login">Login</Link>
          )}
        </Button>
      </div>
    </header>
  );
};

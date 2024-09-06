import { Button } from "~/components/ui/button";
import { Link } from "@remix-run/react";

interface HeaderProps {
  isAuthenticated: boolean;
}

export const Header = ({ isAuthenticated }: HeaderProps) => {
  return (
    <header className="bg-blue-700 text-white py-4 mb-6 rounded-lg shadow-lg rounded-t-none">
      <div className="container mx-auto text-center text-3xl font-extrabold flex justify-between items-center">
        <span>Apartment Booking</span>
        <Button asChild className="bg-white text-blue-700 hover:bg-blue-100">
          <Link to={isAuthenticated ? "/dashboard" : "/login"}>
            {isAuthenticated ? "Dashboard" : "Login"}
          </Link>
        </Button>
      </div>
    </header>
  );
};

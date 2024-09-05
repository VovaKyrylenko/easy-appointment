import { Link } from "@remix-run/react";
import { CheckCircle } from "lucide-react";
import { Button } from "~/components/ui/button";

export default function Success() {
  return (
    <div className="flex items-center justify-center h-full flex-1">
      <div className="text-center">
        <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
        <h1 className="text-3xl font-semibold mb-2">Booking Confirmed!</h1>
        <p className="text-lg text-gray-600 mb-6">
          Thank you for your booking. We look forward to welcoming you!
        </p>
        <Button type="button" asChild>
          <Link to='/app/apartment-pick'>Home</Link>
        </Button>
      </div>
    </div>
  );
}

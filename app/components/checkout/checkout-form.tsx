import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { useState } from "react";
import { Button } from "../ui/button";
import { Form, useSubmit, useNavigation } from "@remix-run/react";
import { AlertCircle, CheckCircle } from "lucide-react";
import { useCreateBooking } from "~/hooks/use-create-booking.client";
import { Apartment } from "~/graphql/generated/graphql";
import { DateRange } from "react-day-picker";

interface CheckoutFormProps {
  apartment: Apartment;
  dates: DateRange;
  userData: { userName: string; userEmail: string; userPhone: string };
  totalAmount: string;
}
export const CheckoutForm = ({
  apartment,
  dates,
  userData,
  totalAmount,
}: CheckoutFormProps) => {
  const stripe = useStripe();
  const elements = useElements();
  const submit = useSubmit();
  const navigation = useNavigation();
  const { createBooking, error: bookingError } = useCreateBooking();

  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isPaymentSuccessful, setIsPaymentSuccessful] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage(null);

    if (!stripe || !elements) {
      return;
    }

    const { error: submitError } = await elements.submit();
    if (submitError) {
      setErrorMessage(submitError.message ?? "An unknown error occurred");
      return;
    }

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/app/pay`,
      },
      redirect: "if_required",
    });

    if (error) {
      setErrorMessage(error.message ?? "An unknown error occurred");
    } else if (paymentIntent && paymentIntent.status === "succeeded") {
      await handleSuccessfulPayment();
    }
  };

  const handleSuccessfulPayment = async () => {
    try {
      await createBooking({
        variables: {
          apartmentId: apartment.id,
          startDate: dates.from,
          endDate: dates.to,
          userName: userData.userName,
          userPhone: userData.userPhone,
          userEmail: userData.userEmail,
        },
      });

      setIsPaymentSuccessful(true);
      submit(null, { method: "post", replace: true });
    } catch (error) {
      console.error("Failed to process successful payment:", error);
      setErrorMessage(
        "Payment successful, but failed to complete booking. Please contact support."
      );
    }
  };

  const isProcessing = navigation.state !== "idle";

  return (
    <div className="flex-1 flex justify-center items-center">
      <div className="max-w-md p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Complete Your Payment
        </h2>
        {isPaymentSuccessful ? (
          <div className="text-center text-green-600 mb-4">
            <CheckCircle className="inline-block mr-2 h-6 w-6" />
            Payment successful! Redirecting...
          </div>
        ) : (
          <Form onSubmit={handleSubmit} className="space-y-6">
            <div className="bg-gray-50 p-4 rounded-md">
              <PaymentElement />
            </div>
            <Button
              type="submit"
              disabled={!stripe || !elements || isProcessing}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300"
            >
              {isProcessing
                ? "Processing..."
                : `Pay $${Number(totalAmount).toFixed(2)}`}
            </Button>
            {(errorMessage || bookingError) && (
              <div className="text-red-600 flex items-center">
                <AlertCircle className="inline-block mr-2 h-5 w-5" />
                {errorMessage || bookingError?.message}
              </div>
            )}
          </Form>
        )}
      </div>
    </div>
  );
};

import { Link } from "@remix-run/react";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";

interface ActionButtonProps {
  to?: string;
  onClick?: () => void;
  isDisabled?: boolean;
  isLoading?: boolean;
  type?: "button" | "submit" | "reset";
  children: React.ReactNode;
  className?: string;
}

export const ActionButton = ({
  to,
  onClick,
  isDisabled = false,
  isLoading = false,
  type = "button",
  children,
  className = "",
}: ActionButtonProps) => {
  let content: React.ReactNode;

  if (isLoading) {
    content = (
      <>
        Please wait <Loader2 className="ml-2 h-4 w-4 animate-spin" />
      </>
    );
  } else {
    content = <>{children}</>;
  }

  return to ? (
    <Button asChild type={type} disabled={isDisabled || isLoading} className={className} onClick={onClick}>
      <Link to={to}>{content}</Link>
    </Button>
  ) : (
    <Button
      onClick={onClick}
      disabled={isDisabled || isLoading}
      type={type}
      className={className}
    >
      {content}
    </Button>
  );
};

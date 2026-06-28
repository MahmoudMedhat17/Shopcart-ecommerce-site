import Link from "next/link";
import { ReactNode } from "react";
import { cn } from "../lib/utils";

const Button = ({
  children,
  className,
  hrefLink,
  onClick,
}: {
  children: ReactNode;
  className?: string;
  hrefLink?: string;
  onClick?: () => void;
}) => {
  if (hrefLink) {
    return (
      <Link href={hrefLink} className={cn("", className)}>
        {children}
      </Link>
    );
  }

  return (
    <button onClick={onClick} className={cn("", className)}>
      {children}
    </button>
  );
};

export default Button;

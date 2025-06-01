"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

export type LoginButtonProps = {
  as?: "button" | "link";
  variant?: "primary" | "secondary";
  href?: string; // for link
  className?: string;
  children?: React.ReactNode;
};

export const LoginButton = ({
  as = "button",
  variant = "primary",
  href = "/admin/login",
  className = "",
  children,
}: LoginButtonProps) => {
  const buttonVariant = variant === "primary" ? "default" : "secondary";
  if (as === "link") {
    return (
      <Link href={href} className={className}>
        <Button variant={buttonVariant}>{children || "Login"}</Button>
      </Link>
    );
  }
  return (
    <Button
      type="button"
      variant={buttonVariant}
      className={className}
      onClick={() => {
        window.location.href = href;
      }}
    >
      {children || "Login"}
    </Button>
  );
};

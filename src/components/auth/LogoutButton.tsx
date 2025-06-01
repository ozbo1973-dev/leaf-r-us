"use client";
import * as React from "react";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { logoutAction } from "./logoutAction";

export interface LogoutButtonProps {
  variant?: "primary" | "secondary" | "link";
  children?: React.ReactNode;
  className?: string;
}

export function LogoutButton({
  variant = "primary",
  children = "Logout",
  className = "",
}: LogoutButtonProps) {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await logoutAction();
      router.push("/");
    } catch (e) {
      // Optionally handle error
    }
  };

  return (
    <Button
      variant={variant === "primary" ? "default" : variant}
      className={className}
      onClick={handleLogout}
      type="button"
    >
      {children}
    </Button>
  );
}

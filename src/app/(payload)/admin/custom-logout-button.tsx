"use client";

import { Button } from "@/components/ui/button";
export interface LogoutButtonProps {
  variant?: "primary" | "secondary" | "link";
  children?: React.ReactNode;
  className?: string;
}

export default function CustomLogoutButton({
  variant = "primary",
  children = "Logout",
  className = "",
}: LogoutButtonProps) {
  const handleLogout = async () => {
    try {
      const res = await fetch("/api/users/logout", {
        method: "POST",
      });

      if (res.ok) {
        // Redirect to the home page or any other page after logout
        window.location.href = "/";
      }
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

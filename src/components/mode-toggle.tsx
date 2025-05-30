"use client";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import * as React from "react";
import { Button } from "@/components/ui/button";

export function ModeToggle() {
  const { setTheme, theme, resolvedTheme } = useTheme();
  const isDark =
    theme === "dark" || (theme === "system" && resolvedTheme === "dark");

  return (
    <Button
      variant="ghost"
      size="icon"
      aria-label="Toggle theme"
      className="rounded-full border border-border bg-background text-foreground hover:bg-muted transition-colors"
      onClick={() => setTheme(isDark ? "light" : "dark")}
    >
      <span className="sr-only">Toggle theme</span>
      {isDark ? (
        <Sun className="size-5 text-primary" />
      ) : (
        <Moon className="size-5 text-primary" />
      )}
    </Button>
  );
}

import React from "react"
import { cn } from "@/lib/utils"

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "success" | "warning" | "outline" | "neutral"
}

export function Badge({ className, variant = "default", ...props }: BadgeProps) {
  const variants = {
    default: "bg-[#0066cc]/10 text-[#0066cc]",
    success: "bg-emerald-500/10 text-emerald-600",
    warning: "bg-amber-500/10 text-amber-600",
    outline: "border border-[#e5e5e7] text-[#1d1d1f]",
    neutral: "bg-[#f5f5f7] text-[#7a7a7a]"
  }

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium tracking-tight",
        variants[variant],
        className
      )}
      {...props}
    />
  )
}

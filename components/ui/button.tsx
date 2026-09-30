import React from "react"
import { cn } from "@/lib/utils"

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "dark" | "ghost" | "destructive"
  size?: "sm" | "md" | "lg"
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", ...props }, ref) => {
    const base = "inline-flex items-center justify-center font-medium transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] active:scale-[0.96] active:duration-75 focus:outline-none focus:ring-2 focus:ring-[#0071e3]/30 disabled:opacity-50 disabled:pointer-events-none cursor-pointer"
    
    const variants = {
      primary: "bg-[#0066cc] hover:bg-[#0071e3] text-white shadow-sm hover:shadow-[0_4px_14px_rgba(0,102,204,0.3)] hover:-translate-y-0.5",
      secondary: "bg-white hover:bg-[#f5f5f7] text-[#1d1d1f] border border-[#e5e5e7] hover:border-[#d1d1d6] hover:-translate-y-0.5 shadow-sm",
      dark: "bg-[#1d1d1f] hover:bg-[#333333] text-white hover:-translate-y-0.5 hover:shadow-md",
      ghost: "bg-transparent hover:bg-black/5 text-[#1d1d1f]",
      destructive: "bg-red-600 hover:bg-red-700 text-white hover:-translate-y-0.5"
    }

    const sizes = {
      sm: "h-8 px-3.5 text-xs rounded-full",
      md: "h-10 px-5 text-sm rounded-full",
      lg: "h-12 px-7 text-base rounded-full"
    }

    return (
      <button
        ref={ref}
        className={cn(base, variants[variant], sizes[size], className)}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

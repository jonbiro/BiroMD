import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex min-h-11 items-center justify-center whitespace-nowrap rounded-full border text-sm font-semibold transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:translate-y-px",
  {
    variants: {
      variant: {
        default:
          "border-[#0b3558] bg-[#0b3558] text-white shadow-md shadow-[#0b3558]/20 hover:bg-[#082c4a] dark:border-[#5d91b8] dark:bg-[#164e77] dark:text-white dark:hover:bg-[#1a5a88]",
        destructive: "border-red-700 bg-red-700 text-white hover:bg-red-800",
        outline:
          "border-border bg-card text-foreground shadow-sm hover:border-secondary hover:bg-accent",
        secondary:
          "border-secondary bg-secondary text-secondary-foreground shadow-sm hover:brightness-95",
        ghost: "border-transparent text-foreground hover:bg-accent",
        link:
          "min-h-0 rounded-none border-transparent px-0 text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-11 px-6",
        sm: "h-10 px-4 text-xs",
        lg: "h-12 px-8 text-base",
        icon: "h-11 w-11 p-0",
      },
    },
    defaultVariants: { variant: "default", size: "default" },
  }
)

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }

function Button({
  className,
  variant,
  size,
  asChild = false,
  children,
  ...props
}: ButtonProps) {
  const styles = buttonVariants({ variant, size, className })

  if (asChild) {
    if (!React.isValidElement<{ className?: string }>(children)) return null

    return React.cloneElement(children, {
      ...props,
      className: cn(styles, children.props.className),
    })
  }

  return (
    <button className={styles} {...props}>
      {children}
    </button>
  )
}

export { Button, buttonVariants }

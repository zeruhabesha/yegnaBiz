"use client"

import * as React from "react"

export type ToastActionElement = React.ReactElement | null

export interface ToastProps {
  id?: string
  title?: React.ReactNode
  description?: React.ReactNode
  action?: ToastActionElement
  open?: boolean
  onOpenChange?: (open: boolean) => void
  duration?: number
}

export interface ToastActionProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  altText: string
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}

export const Toast = React.forwardRef<HTMLDivElement, ToastProps>(({ title, description, action, ...props }, ref) => {
  return (
    <div ref={ref} role="status" {...props}>
      {title && <div className="font-medium">{title}</div>}
      {description && <div className="text-sm text-muted-foreground">{description}</div>}
      {action}
    </div>
  )
})
Toast.displayName = "Toast"

export const ToastAction = React.forwardRef<HTMLButtonElement, ToastActionProps>(
  ({ altText: _altText, children, ...props }, ref) => {
    return (
      <button ref={ref} type="button" {...props}>
        {children}
      </button>
    )
  },
)
ToastAction.displayName = "ToastAction"

export const ToastViewport = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={className} {...props} />
  ),
)
ToastViewport.displayName = "ToastViewport"

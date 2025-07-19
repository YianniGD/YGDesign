
"use client"

import * as React from "react"
import *as TabsPrimitive from "@radix-ui/react-tabs"

import { cn } from "@/lib/utils"

const Tabs = TabsPrimitive.Root

const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn(
      "flex flex-wrap justify-center items-center p-1 text-muted-foreground gap-x-6 gap-y-2", // Changed gap-x-4 to gap-x-6
      className
    )}
    {...props}
  />
))
TabsList.displayName = TabsPrimitive.List.displayName

// Ripple effect handler (copied from button.tsx)
const handleRipple = (event: React.MouseEvent<HTMLElement>) => {
  const button = event.currentTarget;

  const existingRipples = button.querySelectorAll(".ripple-element");
  existingRipples.forEach(r => r.remove());

  const circle = document.createElement("span");
  const diameter = Math.max(button.clientWidth, button.clientHeight);
  const radius = diameter / 2;

  circle.style.width = circle.style.height = `${diameter}px`;
  
  const rect = button.getBoundingClientRect();
  circle.style.left = `${event.clientX - rect.left - radius}px`;
  circle.style.top = `${event.clientY - rect.top - radius}px`;
  
  circle.classList.add("ripple-element");
  
  // eslint-disable-next-line @typescript-eslint/no-unused-expressions
  circle.offsetHeight; 

  circle.style.animation = "ripple-animation 0.7s linear";
  
  button.appendChild(circle);

  setTimeout(() => {
    if (circle.parentNode === button) {
      button.removeChild(circle);
    }
  }, 700);
};

const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(
      "relative overflow-hidden", // For ripple effect
      "inline-flex items-center justify-center whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium ring-offset-background",
      "transition-all duration-150 ease-out", // For scaling and color transitions
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      "disabled:pointer-events-none disabled:opacity-50",
      // Scaling effects
      "hover:scale-[1.03] active:scale-[0.97]",
      // Inactive state: border, text-muted, hover with accent
      "border border-border text-muted-foreground hover:bg-accent/10 hover:text-accent-foreground hover:border-accent/30",
      // Active state: uses accent color
      "data-[state=active]:bg-accent data-[state=active]:text-accent-foreground data-[state=active]:shadow-md data-[state=active]:hover:bg-accent/90 data-[state=active]:border-transparent",
      className
    )}
    onMouseDown={handleRipple} // Apply ripple effect
    {...props}
  />
))
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName

const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      "mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      className
    )}
    {...props}
  />
))
TabsContent.displayName = TabsPrimitive.Content.displayName

export { Tabs, TabsList, TabsTrigger, TabsContent }

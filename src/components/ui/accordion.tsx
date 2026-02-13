"use client"

import * as React from "react"
import { ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

// Contexts
const AccordionContext = React.createContext<{
    value: string;
    onValueChange: (value: string) => void;
} | null>(null);

const AccordionItemContext = React.createContext<{
    itemValue: string;
} | null>(null);

// Accordion (Root)
const Accordion = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement> & {
        type?: "single" | "multiple";
        collapsible?: boolean;
        value?: string;
        onValueChange?: (value: string) => void;
        defaultValue?: string
    }
>(({ className, type = "single", collapsible, value: valueProp, onValueChange, defaultValue, children, ...props }, ref) => {

    const [value, setValue] = React.useState<string>(defaultValue || valueProp || "");

    const handleValueChange = (newValue: string) => {
        // If controlled, use only onValueChange
        if (valueProp !== undefined) {
            onValueChange?.(newValue);
            return;
        }
        // If uncontrolled
        const nextValue = (type === "single" && collapsible && value === newValue) ? "" : newValue;
        setValue(nextValue);
        onValueChange?.(nextValue);
    };

    return (
        <AccordionContext.Provider value={{ value: valueProp !== undefined ? valueProp : value, onValueChange: handleValueChange }}>
            <div ref={ref} className={cn("", className)} {...props}>
                {children}
            </div>
        </AccordionContext.Provider>
    )
})
Accordion.displayName = "Accordion"

// Accordion Item
const AccordionItem = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement> & { value: string }
>(({ className, value, children, ...props }, ref) => (
    <AccordionItemContext.Provider value={{ itemValue: value }}>
        <div ref={ref} className={cn("border-b", className)} {...props}>
            {children}
        </div>
    </AccordionItemContext.Provider>
))
AccordionItem.displayName = "AccordionItem"

// Accordion Trigger
const AccordionTrigger = React.forwardRef<
    HTMLButtonElement,
    React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, children, ...props }, ref) => {
    const rootContext = React.useContext(AccordionContext);
    const itemContext = React.useContext(AccordionItemContext);

    if (!rootContext || !itemContext) {
        throw new Error("AccordionTrigger must be used within AccordionItem inside Accordion");
    }

    const isOpen = rootContext.value === itemContext.itemValue;
    const { onValueChange } = rootContext;
    const { itemValue } = itemContext;

    return (
        <div className="flex">
            <button
                ref={ref}
                onClick={() => onValueChange(itemValue)}
                className={cn(
                    "flex flex-1 items-center justify-between py-4 font-medium transition-all hover:underline [&[data-state=open]>svg]:rotate-180",
                    className
                )}
                data-state={isOpen ? "open" : "closed"}
                {...props}
            >
                {children}
                <ChevronDown
                    className={cn(
                        "h-4 w-4 shrink-0 transition-transform duration-200",
                        isOpen && "rotate-180"
                    )}
                />
            </button>
        </div>
    )
})
AccordionTrigger.displayName = "AccordionTrigger"

// Accordion Content
const AccordionContent = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => {
    const rootContext = React.useContext(AccordionContext);
    const itemContext = React.useContext(AccordionItemContext);

    if (!rootContext || !itemContext) return null;

    const isOpen = rootContext.value === itemContext.itemValue;

    if (!isOpen) return null;

    return (
        <div
            ref={ref}
            className={cn(
                "overflow-hidden text-sm transition-all animate-in slide-in-from-top-1 fade-in zoom-in-95 duration-200",
                className
            )}
            {...props}
        >
            <div className="pb-4 pt-0">{children}</div>
        </div>
    )
})
AccordionContent.displayName = "AccordionContent"

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent }

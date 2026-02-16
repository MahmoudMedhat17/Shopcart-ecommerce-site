import { ReactNode } from "react";
import { cn } from "../lib/utils";

const Title = ({ children, className }: { children: ReactNode, className?: string }) => {
    return (
        <h2 className={cn("text-3xl text-shop-dark-green capitalize tracking-wide font-bold ", className)}>
            {children}
        </h2>
    )
};

const SubTitle = ({ children, className }: { children: ReactNode, className?: string }) => {
    return (
        <h3 className={cn("text-gray-900 font-semibold mb-4", className)}>
            {children}
        </h3>
    )
};


const SubText = ({ children, className }: { children: ReactNode, className?: string }) => {
    return (
        <p className={cn("text-sm text-gray-600", className)}>
            {children}
        </p>
    )
};

export { Title, SubTitle, SubText };
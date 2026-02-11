import { ReactNode } from "react";
import { cn } from "../lib/utils";

const Title = ({ children, className }: { children: ReactNode, className?: string }) => {
    return (
        <h2 className={cn("text-3xl text-shop-dark-green capitalize tracking-wide font-bold ", className)}>
            {children}
        </h2>
    )
}

export default Title;
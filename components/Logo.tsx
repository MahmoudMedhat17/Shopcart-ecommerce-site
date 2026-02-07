import { cn } from "@/lib/utils"
import Link from "next/link"

const Logo = ({ className, logoDesign }: { className?: string, logoDesign?: string }) => {
    return <Link href="/">
        <h2 className={cn("text-shop-dark-green font-black tracking-wider uppercase hover:text-shop-light-green hoverEffect group font-sans", className)}>
            Shopcar<span className={cn("text-shop-light-green group-hover:text-shop-dark-green hoverEffect", logoDesign)}>t</span>
        </h2>
    </Link>
}

export default Logo
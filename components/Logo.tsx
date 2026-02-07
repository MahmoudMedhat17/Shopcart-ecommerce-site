import { cn } from "@/lib/utils"
import Link from "next/link"

const Logo = ({ className }: { className?: string }) => {
    return <Link href="/">
        <h2 className={cn("text-shop-dark-green font-black tracking-wider uppercase hover:text-shop-light-green hoverEffect group font-sans", className)}>
            Shopcar<span className="text-shop-light-green group-hover:text-shop-dark-green hoverEffect">t</span>
        </h2>
    </Link>
}

export default Logo
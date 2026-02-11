import Link from "next/link";
import { Heart } from "lucide-react";

const Favpage = () => {
    return (
        <Link href="/" className="group relative">
            <Heart className="w-5 h-5 text-shop-dark-green hover:text-shop-light-green hoverEffect" />
            <span className="absolute -top-1 -right-2 text-white bg-shop-dark-green h-3.5 w-3.5 rounded-full flex justify-center items-center text-sm">0</span>
        </Link>
    )
}

export default Favpage;
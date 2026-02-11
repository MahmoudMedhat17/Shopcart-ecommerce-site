"use client";

import { headerMenuData } from "@/src/constants/data";
import Link from "next/link";
import { usePathname } from "next/navigation";

const HeaderMenu = () => {

    // Here we use usePathname to get the current url we are on to use it in styling the Navlinks.
    const pathName = usePathname();
    return (
        <div className="hidden md:inline-flex items-center text-sm capitalize gap-7 w-1/3 font-semibold">
            {headerMenuData?.map((item) => (
                <Link href={item.href} key={item.title} className={`text-lightColor hover:text-shop-light-green hoverEffect group relative ${item.href === pathName && "text-shop-light-green"}`}>
                    {item.title}
                    {/* Need to create here the NavLinks styling when hovered on and the NavbtnsAdmin layout. */}
                    <span className={`absolute -bottom-0.5 left-1/2 w-0 h-0.5 bg-shop-light-green group-hover:w-1/2 hover:left-1 hoverEffect ${item.href === pathName && "w-1/2 text-shop-light-green"}`} />
                    <span className={`absolute -bottom-0.5 right-1/2 w-0 h-0.5 bg-shop-light-green group-hover:w-1/2 hover:left-1 hoverEffect ${item.href === pathName && "w-1/2 text-shop-light-green"}`} />
                </Link>
            ))}
        </div>
    )
}

export default HeaderMenu;
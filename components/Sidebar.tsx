
import { headerMenuData } from "@/constants/data";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "@/components/Logo";
import { X } from "lucide-react";
import Socials from "@/components/Socials";
import useClickOutside from "@/hooks/useClickOutside";

// Here the Sidebar comp. accepts the passed props from the MobileMenu comp.
interface sideBarProps {
    isOpen: boolean;
    onClose: () => void;
}

const Sidebar = ({ isOpen, onClose }: sideBarProps) => {

    const pathName = usePathname();
    const sideBarRef = useClickOutside(onClose) as React.RefObject<HTMLDivElement>;

    return (
        // This div is the background of the sidebar with shadow and slightly colored black background
        <div className={`fixed left-0 inset-y-0 bg-black/50 w-full z-50 shadow-xl text-white/70 ${isOpen ? "translate-x-0" : "-translate-x-full"} hoverEffect`}>
            {/* This div that holds the whole content of the sidebar. */}
            <div ref={sideBarRef} className="p-10 min-w-72 max-w-96 bg-black h-screen flex flex-col gap-6 border-r-2 border-r-shop-light-green">
                {/* This div includes the Logo and The X button that closes the sidebar. */}
                <div className="flex justify-between items-center">
                    <Logo className="text-white" logoDesign="group-hover:text-white" />
                    <button onClick={onClose} className="hover:text-shop-light-green hoverEffect"><X /></button>
                </div>
                {/* This div contains all the data of the Links of the Sidebar. */}
                <div className="space-y-2">
                    {headerMenuData?.map((item) => (
                        <Link href={item.href} key={item.href} className={`flex flex-col hover:text-shop-light-green hoverEffect ${item?.href === pathName && "text-shop-dark-green"}`}>
                            {item.title}
                        </Link>
                    ))}
                </div>
                {/* Social links */}
                <Socials />
            </div>
        </div>
    )
}

export default Sidebar;
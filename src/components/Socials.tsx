import { socialMediaLinks } from "@/src/constants/data";
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/src/components/ui/tooltip";
import Link from "next/link";
import { cn } from "../lib/utils";

interface socialMediaProps {
    className?: string;
    iconClassName?: string;
    toolTipClassName?: string;
};

const Socials = ({ className, iconClassName, toolTipClassName }: socialMediaProps) => {

    return (
        <div className={cn("flex justify-between items-center", className)}>
            {socialMediaLinks?.map((social) => (
                <Tooltip key={social.title}>
                    <TooltipTrigger asChild className={cn("w-10 h-10 rounded-full border-2 border-lightColor hover:border-darkColor flex justify-center items-center", iconClassName)}>
                        <Link href={social.href}>
                            {social.icon}
                        </Link>
                    </TooltipTrigger>
                    <TooltipContent className={cn("bg-white text-black translate-y-[calc(-10%-2px)]", toolTipClassName)}>
                        {social.title}
                    </TooltipContent>
                </Tooltip>
            ))}
        </div>
    )
}

export default Socials;
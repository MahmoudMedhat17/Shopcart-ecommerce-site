import { socialMediaLinks } from "@/src/constants/data";
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/src/components/ui/tooltip";
import Link from "next/link";

const Socials = () => {

    return (
        <div className="flex justify-between items-center">
            {socialMediaLinks?.map((social) => (
                <Tooltip key={social.title}>
                    <TooltipTrigger asChild className="w-10 h-10 rounded-full border-2 border-lightColor hover:border-darkColor flex justify-center items-center">
                        <Link href={social.href}>
                            {social.icon}
                        </Link>
                    </TooltipTrigger>
                    <TooltipContent>
                        {social.title}
                    </TooltipContent>
                </Tooltip>
            ))}
        </div>
    )
}

export default Socials;
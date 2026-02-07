import { socialMediaLinks } from "@/constants/data";
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip"

const Socials = () => {
    return (
        <div className="flex justify-between items-center">
            {socialMediaLinks?.map((social) => (
                <Tooltip key={social.title}>
                    <TooltipTrigger className="w-10 h-10 rounded-full border-2 border-lightColor hover:border-darkColor flex justify-center items-center">{social.icon}</TooltipTrigger>
                    <TooltipContent>
                        {social.title}
                    </TooltipContent>
                </Tooltip>
            ))}
        </div>
    )
}

export default Socials;
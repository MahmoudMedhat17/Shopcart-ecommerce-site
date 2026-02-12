import Logo from "@/src/components/Logo";
import { SubText } from "@/src/components/Text";
import Socials from "@/src/components/Socials";
import { quickLinksData, categoriesData } from "@/src/constants/data";
import Link from "next/link";

const Bottomfooter = () => {
    return (
        <div className="py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="space-y-4">
                <Logo />
                <SubText>
                    Discover amazing products at ShopCart, your trusted online shopping destination for quality items and exceptional customer service.
                </SubText>
                <Socials className="justify-start gap-4" iconClassName="border-darkColor/60 hover:border-shop-dark-green hover:text-shop-dark-green hoverEffect" toolTipClassName="bg-black text-white translate-y-[calc(-10%_-_2px)]" />
            </div>
            <div>
                <h3 className="mb-4 font-semibold text-gray-900">
                    Quick Links
                </h3>
                {
                    quickLinksData?.map((data) => (
                        <div key={data.title} className="space-y-3">
                            <Link href={data.href}>
                                {data.title}
                            </Link>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default Bottomfooter;
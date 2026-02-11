import Title from "@/src/components/Text";
import Button from "@/src/components/Button";
import { bannerOne } from "@/images";
import Image from "next/image";

const Banner = () => {
    return (
        <div className="py-16 md:py-0 px-10 lg:px-24 bg-shop-light-pink rounded-lg flex justify-between items-center">
            <div className="space-y-5">
                <Title>
                    Grab up to 50% off on <br /> Selected Headphone
                </Title>
                <Button hrefLink="/shop" className="px-5 py-2 bg-shop-dark-green/90 text-white/90 rounded-md text-sm font-semibold hover:bg-shop-dark-green hoverEffect">
                    Buy Now
                </Button>
            </div>
            <div>
                <Image src={bannerOne} alt="bannerOne" className="hidden md:inline-flex w-96" />
            </div>
        </div>
    )
}

export default Banner;
import Logo from "@/src/components/Logo";
import { SubTitle, SubText } from "@/src/components/Text";
import Socials from "@/src/components/Socials";
import { quickLinksData, categoriesData } from "@/src/constants/data";
import Link from "next/link";
import { Input } from "@/src/components/ui/input";
import { Button } from "@/src/components/ui/button";

const Bottomfooter = () => {
  const date = new Date();
  const yearDate = date.getFullYear();

  return (
    <>
      <div className="py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 border-b border-gray-400">
        <div className="space-y-4">
          <Logo />
          <SubText>
            Discover amazing products at ShopCart, your trusted online shopping
            destination for quality items and exceptional customer service.
          </SubText>
          <Socials
            className="justify-start gap-4"
            iconClassName="border-darkColor/60 hover:border-shop-dark-green hover:text-shop-dark-green hoverEffect"
            toolTipClassName="bg-black text-white translate-y-[calc(-10%_-_2px)]"
          />
        </div>
        <div>
          <SubTitle>Quick Links</SubTitle>
          <div className="space-y-3">
            {quickLinksData?.map((data) => (
              <div key={data.title}>
                <Link
                  href={data.href}
                  className="text-gray-600 hover:text-shop-dark-green hoverEffect font-medium mt-4"
                >
                  {data.title}
                </Link>
              </div>
            ))}
          </div>
        </div>
        <div>
          <SubTitle>Categories</SubTitle>
          <div className="space-y-3">
            {categoriesData?.map((data) => (
              <div key={data.title}>
                <Link
                  href={`/category/${data.href}`}
                  className="text-gray-600 hover:text-shop-dark-green hoverEffect font-medium mt-4"
                >
                  {data.title}
                </Link>
              </div>
            ))}
          </div>
        </div>
        <div className="space-y-3">
          <SubTitle>Newsletter</SubTitle>
          <SubText>
            Subscribe to our newsletter to receive updates and exclusive offers.
          </SubText>
          <form action="" className="flex flex-col gap-3">
            <Input
              className="max-w-60"
              placeholder="Enter your email"
              type="email"
              required
            />
            <Button className="max-w-60">Subscribe</Button>
          </form>
        </div>
      </div>
      <div className="my-4 text-center">
        © {yearDate}{" "}
        <Logo className="text-darkColor hover:text-shop-dark-green hoverEffect" />{" "}
        . All rights reserved.
      </div>
    </>
  );
};

export default Bottomfooter;

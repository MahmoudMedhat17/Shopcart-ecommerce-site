import Container from "@/src/components/Container";
import Link from "next/link";
import { SubText, SubTitle, Title } from "@/src/components/Text";
import { Button } from "@/src/components/ui/button";
import { Heart } from "lucide-react";

const EmptyWishlist = () => {
  return (
    <Container>
      <div className="flex flex-col justify-center items-center">
        <div className="flex flex-col items-center">
          <div className="relative">
            <Heart size={50} className="text-shopLighterText" />
            <span className="absolute top-0 -right-3 w-3 h-3 animate-ping rounded-full bg-shopRedColor/70 opacity-75"></span>
            <span className="absolute top-0 -right-3 w-3 h-3 rounded-full bg-shopRedColor/70"></span>
          </div>
          <div className="flex flex-col items-center justify-center p-6 text-center">
            <div className="max-w-md">
              <Title className="text-2xl font-bold text-darkColor">
                Your wishlist is empty
              </Title>
              <SubTitle className="mt-2 text-lg font-medium text-gray-600">
                Save products you love for later
              </SubTitle>
              <SubText className="mt-4 text-gray-500 max-w-xs">
                Add items to your wishlist by clicking the heart icon on any
                product. You can easily move them to your cart when you&apos;re
                ready to purchase.
              </SubText>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col xs:flex-row flex-wrap justify-center items-center gap-8 mt-10">
        <div className="bg-shopLighterBg flex flex-col justify-center items-center px-4 py-2 space-y-2 rounded-lg">
          <Heart className="text-shopRedColor" />
          <p className="font-semibold">Save Favorites</p>
          <p className="max-w-36 text-center text-sm text-shopLightText">
            Keep track of products you love
          </p>
        </div>
        <div className="bg-shopLighterBg flex flex-col justify-center items-center px-4 py-2 space-y-2 rounded-lg">
          <span className="bg-blue-400/20 p-1 rounded-full">🛍️</span>
          <p className="font-semibold">Easy Shopping</p>
          <p className="max-w-36 text-center text-sm text-shopLightText">
            Quick add to cart from wishlist
          </p>
        </div>
        <div className="bg-shopLighterBg flex flex-col justify-center items-center px-4 py-2 space-y-2 rounded-lg">
          <span className="bg-blue-400/20 p-1 rounded-full">🔔</span>
          <p className="font-semibold">Stay Updated</p>
          <p className="max-w-36 text-center text-sm text-shopLightText">
            Never miss deals on saved items
          </p>
        </div>
      </div>

      <div className="my-10 flex flex-col xs:flex-row gap-4 justify-center">
        <Button className="text-md" asChild>
          <Link href="/client/shop">Browser Products</Link>
        </Button>
        <Button className="text-md" variant="outline" asChild>
          <Link href="/client/category">Shop by category</Link>
        </Button>
      </div>
    </Container>
  );
};

export default EmptyWishlist;

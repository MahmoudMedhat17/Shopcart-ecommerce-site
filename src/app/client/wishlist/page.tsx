import WishlistProducts from "@/src/components/wishlist/WishlistProducts";
import EmptyWishlist from "@/src/components/wishlist/EmptyWishlist";
import { SubTitle, Title } from "@/src/components/Text";
import Container from "@/src/components/Container";

const page = () => {
  return (
    <Container>
      <Title className="text-darkColor">My Wishlist</Title>
      <SubTitle className="text-shopLighterText font-medium">
        Save your favorite items for later
      </SubTitle>
      <WishlistProducts />
      {/* <EmptyWishlist /> */}
    </Container>
  );
};

export default page;

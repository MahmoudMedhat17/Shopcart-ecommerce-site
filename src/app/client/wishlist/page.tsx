import WishlistProducts from "@/src/components/wishlist/WishlistProducts";
import { SubTitle, Title } from "@/src/components/Text";
import Container from "@/src/components/Container";
import { auth } from "@clerk/nextjs/server";
import NoAccess from "@/src/components/NoAccess";

const WishlistPage = async () => {
  const { userId } = await auth();

  return (
    <Container>
      <Title className="text-darkColor">My Wishlist</Title>
      <SubTitle className="text-shopLighterText font-medium">
        Save your favorite items for later
      </SubTitle>
      {/* If the user is logged in then show him his wishlist and if not then show to him the No access component page. */}
      {userId ? (
        <WishlistProducts />
      ) : (
        <NoAccess
          details="Log in to view your wishlist. Don't miss out on your favorite
          products!"
        />
      )}
    </Container>
  );
};

export default WishlistPage;

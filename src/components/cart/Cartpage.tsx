"use client";

import { useAuth } from "@clerk/nextjs";
import NoAccess from "@/src/components/NoAccess";
import Shoppingcart from "@/src/components/cart/Shoppingcart";
import Container from "@/src/components/Container";
import zustandStore from "@/src/store/zustandStore";
import Emptycart from "@/src/components/cart/Emptycart";

const Cartpage = () => {
  const { isSignedIn } = useAuth();
  const { cart } = zustandStore();

  return (
    <>
      {/* Here if user is signed in then check if the cart has products then show the shopping cart else show the empty cart, and if the user isn't signed in at all then show the No access component. */}
      {isSignedIn ? (
        cart.length ? (
          <Container>
            <Shoppingcart />
          </Container>
        ) : (
          <Container>
            <Emptycart />
          </Container>
        )
      ) : (
        <NoAccess />
      )}
    </>
  );
};

export default Cartpage;

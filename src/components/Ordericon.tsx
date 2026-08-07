import Link from "next/link";
import { Logs } from "lucide-react";
import { auth } from "@clerk/nextjs/server";
import { getOrders } from "../sanity/queries/query";
import { USERORDERS_QUERYResult } from "@/sanity.types";

// async component so we can await server-side auth and data fetching before rendering
const Ordericon = async () => {
  // extract userId from the current Clerk session on the server; userId is null if the user is not signed in
  const { userId } = await auth();

  // initialise orders as null; will be populated only if a logged-in user exists
  let orders: USERORDERS_QUERYResult | undefined;

  // only fetch orders when there is an authenticated user — avoids an unnecessary DB/API call for guests
  if (userId) {
    orders = await getOrders(userId); // fetch all orders belonging to this user from Sanity
  }

  return (
    // navigates to the user's orders page; `group` enables child hover utilities via Tailwind group-hover
    <Link href="/client/orders" className="group relative">
      {/* Logs icon from lucide-react acts as the visual order-history button */}
      <Logs className="w-5 h-5 text-shop-dark-green hover:text-shop-light-green hoverEffect" />
      {/* Badge overlay positioned top-right of the icon; shows the total number of orders */}
      <span className="absolute -top-1 -right-2 text-white bg-shop-dark-green h-4 w-4 rounded-full flex justify-center items-center text-xs">
        {/* orders?.length uses optional chaining so it renders nothing (undefined) when orders is null */}
        {orders?.length}
      </span>
    </Link>
  );
};

export default Ordericon;

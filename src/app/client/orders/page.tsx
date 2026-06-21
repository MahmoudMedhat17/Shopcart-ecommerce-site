import { SubText, Title } from "@/src/components/Text";
import { getOrders } from "@/src/sanity/queries/query";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { FileX } from "lucide-react";
import { Button } from "@/src/components/ui/button";

const Orderspage = async () => {
  
  const { userId } = await auth();
  
  if(!userId){
    return redirect("/client");
  };

  const orders = await getOrders(userId);

  return (
    <div>
      {!orders.length ? (
        <p>Orders found</p>
      ) : (
        <div className="my-20 flex flex-col items-center gap-4">
          <FileX className="w-32 h-32 text-gray-400" />
          <Title className="text-shop-dark-green text-3xl font-bold">
            No orders found
          </Title>
          <SubText className="text-center text-base max-w-[350px]">
            it looks like You have not placed any orders yet. Start shopping now!
          </SubText>
          <Link href="/">
            <Button className="bg-shop-light-green/90 hover:bg-shop-dark-green hoverEffect">Browser Products</Button>
          </Link>
        </div>
      )}
    </div>
  )
};

export default Orderspage;

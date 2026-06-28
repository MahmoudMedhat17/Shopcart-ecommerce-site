import { SubText, Title } from "@/src/components/Text";
import { getOrders } from "@/src/sanity/queries/query";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { FileX } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import { ScrollArea, ScrollBar } from "@/src/components/ui/scroll-area";
import {
  Table,
  TableHead,
  TableHeader,
  TableRow,
} from "@/src/components/ui/table";
import Orderscomponent from "@/src/components/Orderscomponent";

const Orderspage = async () => {
  const { userId } = await auth();

  if (!userId) {
    return redirect("/client");
  }

  const orders = await getOrders(userId);

  return (
    <>
      {orders && orders.length ? (
        <Card>
          <CardHeader>
            <CardTitle>Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px] md:w-auto">
                      Order Number
                    </TableHead>
                    <TableHead className="hidden md:table-cell">Date</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead className="hidden sm:table-cell">
                      Email
                    </TableHead>
                    <TableHead>Total</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="hidden sm:table-cell">
                      Invoice Number
                    </TableHead>
                    <TableHead className="text-center">Action</TableHead>
                  </TableRow>
                </TableHeader>
                {/* Order component */}
                <Orderscomponent orders={orders} />
              </Table>
              <ScrollBar orientation="horizontal" />
            </ScrollArea>
          </CardContent>
        </Card>
      ) : (
        <div className="my-20 flex flex-col items-center gap-4">
          <FileX className="w-32 h-32 text-gray-400" />
          <Title className="text-shop-dark-green text-3xl font-bold">
            No orders found
          </Title>
          <SubText className="text-center text-base max-w-[350px]">
            it looks like You have not placed any orders yet. Start shopping
            now!
          </SubText>
          <Link href="/">
            <Button className="bg-shop-light-green/90 hover:bg-shop-dark-green hoverEffect">
              Browser Products
            </Button>
          </Link>
        </div>
      )}
    </>
  );
};

export default Orderspage;

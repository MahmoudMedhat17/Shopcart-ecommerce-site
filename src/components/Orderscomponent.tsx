"use client";

import { USERORDERS_QUERYResult } from "@/sanity.types";
import { TableBody, TableCell, TableRow } from "@/components/ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/src/components/ui/tooltip";
import { format } from "date-fns";
import { X } from "lucide-react";
import { useState } from "react";
import OrderdetailDialog from "./OrderdetailDialog";
import getDeleteOrders from "@/src/actions/deleteTheOrder";
import { toast } from "react-hot-toast";

const Orderscomponent = ({ orders }: { orders: USERORDERS_QUERYResult }) => {
  const [selectedOrder, setSelectedOrder] = useState<
    USERORDERS_QUERYResult[number] | null
  >(null);

  const handleOrder = (order: USERORDERS_QUERYResult[number] | null) => {
    setSelectedOrder(order);
  };

  const handleDeleteOrder = async (orderNumber: string) => {
    if (orderNumber) {
      const result = await getDeleteOrders(orderNumber);
      if (result) {
        toast.success("Order deleted successfully");
      }
    }
  };

  return (
    <>
      <TableBody>
        <TooltipProvider>
          {orders.map((order) => (
            <Tooltip key={order.orderNumber}>
              <TooltipTrigger asChild>
                <TableRow
                  onClick={() => handleOrder(order)}
                  className="cursor-pointer hover:bg-gray-100 h-12"
                >
                  <TableCell className="font-medium">
                    {order.orderNumber?.slice(-10) ?? "N/A"}
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {order.orderDate
                      ? format(new Date(order.orderDate), "dd/MM/yyyy")
                      : "N/A"}
                  </TableCell>
                  <TableCell>{order.customerName}</TableCell>
                  <TableCell className="hidden sm:table-cell">
                    {order.customerEmail}
                  </TableCell>
                  <TableCell className="text-black font-medium">
                    {order.totalPrice != null
                      ? new Intl.NumberFormat("en-US", {
                          style: "currency",
                          currency: "USD",
                          minimumFractionDigits: 0,
                          maximumFractionDigits: 0,
                        }).format(order.totalPrice)
                      : "N/A"}
                  </TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold text-center ${order.status === "paid" ? "bg-green-100 text-shop-dark-green" : "bg-yellow-100 text-yellow-800"}`}
                    >
                      {order.status
                        ? order.status.charAt(0).toUpperCase() +
                          order.status.slice(1)
                        : "N/A"}
                    </span>
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">
                    {order.invoice ? order.invoice.number : "N/A"}
                  </TableCell>
                  <TableCell
                    onClick={(e) => {
                      e.stopPropagation();
                      if (order.orderNumber) {
                        handleDeleteOrder(order.orderNumber);
                      }
                    }}
                    className="flex justify-center items-center"
                  >
                    <X size={20} className="cursor-pointer" />
                  </TableCell>
                </TableRow>
              </TooltipTrigger>
              <TooltipContent className="font-semibold text-base">
                <p>Click here for more details.</p>
              </TooltipContent>
            </Tooltip>
          ))}
        </TooltipProvider>
      </TableBody>
      <OrderdetailDialog
        order={selectedOrder}
        isOpen={!!selectedOrder}
        onClose={() => handleOrder(null)}
      />
    </>
  );
};

export default Orderscomponent;

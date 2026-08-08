import { USERORDERS_QUERYResult } from "@/sanity.types";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/src/components/ui/dialog";
import {
  Table,
  TableHeader,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";
import Button from "@/src/components/Button";
import { X } from "lucide-react";
import { urlFor } from "../sanity/lib/image";

const OrderdetailDialog = ({
  order,
  isOpen,
  onClose,
}: {
  order: USERORDERS_QUERYResult[number] | null;
  isOpen: boolean;
  onClose: () => void;
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader className="flex flex-row justify-between w-full">
          <DialogTitle>Order Details - {order?.orderNumber}</DialogTitle>
          <DialogClose>
            <X />
          </DialogClose>
        </DialogHeader>
        <div className="mt-4">
          <p>
            <strong>Customer:</strong> {order?.customerName}
          </p>

          <p>
            <strong>Email:</strong> {order?.customerEmail}
          </p>

          <p>
            <strong>Date:</strong>{" "}
            {order?.orderDate && new Date(order.orderDate).toDateString()}
          </p>

          <p>
            <strong>Status:</strong>{" "}
            <span
              className={`${order?.status === "paid" ? "text-shop-light-green" : "text-yellow-800"} font-semibold capitalize`}
            >
              {order?.status}
            </span>
          </p>
          <p>
            <strong>Invoice Number:</strong> {order?.invoice?.number}
          </p>
          <Button className="mt-2 py-0.5 px-1 rounded-lg border border-darkColor/80 hover:bg-darkColor hover:text-white hoverEffect">
            <Link
              href={order?.invoice?.hosted_invoice_url || ""}
              target="_blank"
            >
              Download Invoice
            </Link>
          </Button>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-base font-semibold">
                Products
              </TableHead>
              <TableHead className="text-base font-semibold text-center">
                Quantity
              </TableHead>
              <TableHead className="text-base font-semibold text-center">
                Price
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {order?.products?.map((item) => (
              <TableRow key={item.product?._id}>
                <TableCell className="flex items-center gap-4">
                  <Image
                    src={urlFor(item.product?.images?.[0] || "").url()}
                    alt={item.product?.name || ""}
                    width={70}
                    height={70}
                  />
                  {item.product?.name}
                </TableCell>
                <TableCell className="text-center">{item.quantity}</TableCell>
                <TableCell className="text-center">
                  ${Math.floor(item.price || 0) || item.product?.price}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className="flex justify-end items-end gap-7.5">
          <p className="font-semibold text-base">Total:</p>
          <p>${Math.trunc(order?.totalPrice || 0)}</p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default OrderdetailDialog;

import { USERORDERS_QUERY_RESULT } from "@/sanity.types";
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

const OrderdetailDialog = ({
  order,
  isOpen,
  onClose,
}: {
  order: USERORDERS_QUERY_RESULT[number] | null;
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

        {/* Need to create here a table with Products info of prodcut info, quantity and price. */}
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Products</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead>Price</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {/* Need to work on displaying the product details. */}
            {/* {order?.products?.map((product) => (
              <TableRow key={product.id}>
                <TableCell>{product.name}</TableCell>
                <TableCell>{product.quantity}</TableCell>
                <TableCell>{product.price}</TableCell>
              </TableRow>
            ))} */}
          </TableBody>
        </Table>
      </DialogContent>
    </Dialog>
  );
};

export default OrderdetailDialog;

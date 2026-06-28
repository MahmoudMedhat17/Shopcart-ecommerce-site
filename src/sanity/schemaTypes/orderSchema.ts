import { defineField, defineType } from "sanity";
import { BasketIcon } from "@sanity/icons";

export const orderSchema = defineType({
  name: "order",
  title: "Orders",
  type: "document",
  icon: BasketIcon,
  preview: {
    select: {
      name: "customerName",
      orderNumber: "orderNumber",
      totalPrice: "totalPrice",
      currency: "currency",
      orderDate: "orderDate",
    },
    prepare(select: Record<string, unknown>) {
      const { name, orderNumber, totalPrice, currency, orderDate } = select;

      return {
        title:
          name && orderNumber ? `${name} - ${orderNumber}` : "Untracked Order",
        subtitle:
          totalPrice && currency && orderDate
            ? `${totalPrice} - ${currency} - ${orderDate}`
            : "Order Document",
      };
    },
  },
  fields: [
    defineField({
      name: "orderNumber",
      title: "Order Number",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "customerName",
      title: "Customer Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "customerEmail",
      title: "Customer Email",
      type: "string",
      validation: (Rule) => Rule.required().email(),
    }),
    defineField({
      name: "clerkUserId",
      title: "clerkUserId",
      type: "string",
    }),
    defineField({
      name: "products",
      title: "Products",
      type: "array",
      of: [
        {
          name: "ordersData",
          title: "Orders Data",
          type: "object",
          fields: [
            {
              name: "product",
              title: "Product",
              type: "reference",
              to: [{ type: "product" }],
            },
            {
              name: "quantity",
              title: "Quantity",
              type: "number",
            },
            {
              name: "price",
              title: "Price",
              type: "number",
            },
          ],
        },
      ],
    }),
    defineField({
      name: "totalPrice",
      title: "Total Price",
      type: "number",
    }),

    defineField({
      name: "status",
      title: "Order Status",
      type: "string",
      options: {
        list: [
          { title: "Pending", value: "pending" },
          { title: "Paid", value: "paid" },
          { title: "Processing", value: "processing" },
          { title: "Shipped", value: "shipped" },
          { title: "Delivered", value: "delivered" },
          { title: "Cancelled", value: "cancelled" },
        ],
      },
      initialValue: "pending",
    }),

    defineField({
      name: "currency",
      title: "Currency",
      type: "string",
    }),

    defineField({
      name: "amountDiscount",
      title: "Amount Discount",
      type: "number",
    }),

    defineField({
      name: "address",
      title: "address",
      type: "object",
      fields: [
        { name: "state", type: "string" },
        { name: "zip", type: "string" },
        { name: "city", type: "string" },
        { name: "address", type: "string" },
        { name: "name", type: "string" },
      ],
    }),

    defineField({
      name: "stripePaymentIntent",
      title: "Stripe Payment Intent ID",
      type: "string",
    }),

    defineField({
      name: "orderDate",
      title: "Order Date",
      type: "string",
    }),
    defineField({
      name: "stripeCheckoutSessionId",
      title: "Stripe Checkout SessionId",
      type: "string",
    }),
    defineField({
      name: "stripeCustomerId",
      title: "Stripe CustomerId",
      type: "string",
    }),

    defineField({
      name: "invoice",
      title: "Invoice",
      type: "object",
      fields: [
        defineField({
          name: "invoiceId",
          title: "Invoice ID",
          type: "string",
        }),
        defineField({
          name: "number",
          title: "Invoice Number",
          type: "string",
        }),
        defineField({
          name: "hosted_invoice_url",
          title: "Hosted Invoice URL",
          type: "url",
        }),
      ],
    }),
  ],
});

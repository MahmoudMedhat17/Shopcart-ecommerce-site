"use server";

import { client } from "@/src/sanity/lib/client";
import { DELETEUSERORDERS_QUERY } from "@/src/sanity/queries";
import { revalidatePath } from "next/cache";

const getDeleteOrders = async (currentOrderNumber: string) => {
  try {
    const deleteOrderQuery = DELETEUSERORDERS_QUERY;
    const order = await client.fetch(deleteOrderQuery, {
      orderNumber: currentOrderNumber,
    });

    if (!order || order.length === 0) {
      console.log("Order not found");
      return null;
    }

    const deleteResult = await client.delete(order[0]._id);

    revalidatePath("/orders");
    
    return deleteResult;
  } catch (error) {
    console.error("Delete order failed:", error);
  }
};

export default getDeleteOrders;

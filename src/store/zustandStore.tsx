import { persist } from "zustand/middleware";
import { Product } from "../../sanity.types";
import { create } from "zustand";

// Interface for the items inside the cart.
interface cartItems {
  product: Product;
  quantity: number;
}

// Store interface
interface ZustandStoreProps {
  cart: cartItems[];
  addQuantity: (product: Product) => void;
  removeQuantity: (productId: string) => void;
  deleteProduct: (productId: string) => void;
  resetCart: () => void;
  getPrice: () => number;
}

const zustandStore = create<ZustandStoreProps>()(
  persist(
    (set, get) => ({
      cart: [],
      addQuantity: (product) => {
        // Here we initialize the itemsInCart variable with the items data.
        const itemsInCart = get().cart;
        // Here we loop throught the items data to check if the item is already exists in the cart or not by checking the item id inside the cart and use this variable for the next condition.
        const itemExists = itemsInCart.find(
          (items) => items.product._id === product._id,
        );

        // If itemExists inside the cart then do the conditions
        if (itemExists) {
          set({
            // Here we check if the item the user want to add more is the same item that already exists in the cart or added before, if so them add a quantity of 1 to it so it becomes 2 for example inside the cart.
            cart: itemsInCart.map((item) =>
              item.product._id === product._id
                ? { ...item, quantity: item.quantity + 1 }
                : item,
            ),
          });
        } else {
          // Else then here the item doesn't exist in the cart which means that this item will be added newly to the cart so we set the cart with the current items inside the cart already and add 1 number to the item the user added.
          set({
            cart: [...itemsInCart, { product, quantity: 1 }],
          });
        }
      },
      removeQuantity: (productId) =>
        set((state) => ({
          // Here we map through the items inside the cart array and check the product when the user tries to decrease the quantity of a product he wants to add to cart.
          cart: state.cart.map((item) => {
            // Here we check if the product.id of the product in the cart is really equal to the product id the user wants to decrease it's quantity if yes then do what inside the condition
            if (item.product._id === productId) {
              // Here if the quantity of the selected product is bigger than 1 for example = 2 then return the item data as the same with ...item and make the quantity to be decreased by 1 value.
              if (item.quantity > 1) {
                return { ...item, quantity: item.quantity - 1 };
              }
              // If the the user didn't decrease the quantity of the product then the return the product data as the same.
              else {
                return item;
              }
            }
            // Here non matching products inside the cart is returned the same if the user passed this removeQuantity func.
            else {
              return item;
            }
          }),
        })),
      deleteProduct: (productId) =>
        set((state) => ({
          // Here this state will filter the cart array from the product the user selects to delete.
          cart: state.cart.filter((item) => item.product._id !== productId),
        })),
      // Here we reset the state of the cart to empty array which equal to empty cart.
      resetCart: () => set({ cart: [] }),
      // Here we get the price of the product price and then calculate the product price multiplied by it's quantity.
      getPrice: () => {
        const productPrice = get().cart;
        return productPrice.reduce((totalPrice, item) => {
          return totalPrice + (item.product.price ?? 0) * item.quantity;
        }, 0);
      },
    }),
    { name: "ecommerceStore" },
  ),
);

export default zustandStore;

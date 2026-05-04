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
  addProduct: (product: Product) => void;
  deleteProduct: (productId: string) => void;
  addQuantity: (productId: string) => void;
  removeQuantity: (productId: string) => void;
  resetCart: () => void;
  getPrice: (productId: string) => number;
  getTotalPriceAfterDiscount: () => number;
  getTotalDiscount: () => number;
  getTotalPrice: () => number;
  getItemCount: (productId: string) => number;
  // getAllProducts: () => cartItems[];
  // Favorite part
  favorites: Product[];
  addFavorite: (product: Product) => void;
  removeFavorite: (productId: string) => void;
  toggleFavorite: (product: Product) => void;
  resetWishlist: () => void;
}

const zustandStore = create<ZustandStoreProps>()(
  persist(
    (set, get) => ({
      cart: [] as cartItems[],
      favorites: [],
      addProduct: (product) => {
        // Here we initialize the itemsInCart variable with the items data.
        const itemsInCart = get().cart;
        set({
          cart: [...itemsInCart, { product, quantity: 1 }],
        });
      },
      deleteProduct: (productId) =>
        set((state) => ({
          // Here this state will filter the cart array from the product the user selects to delete.
          cart: state.cart.filter((item) => item.product._id !== productId),
        })),
      addQuantity: (productId) => {
        const itemsInCart = get().cart;

        // Here we loop throught the items data to check if the item is already exists in the cart or not by checking the item id inside the cart and use this variable for the next condition.
        const itemExists = itemsInCart.find(
          (item) => item.product._id === productId,
        );

        // If itemExists inside the cart then do the conditions
        if (itemExists) {
          set((state) => ({
            // Here we check if the item the user want to add more is the same item that already exists in the cart or added before, if so them add a quantity of 1 to it so it becomes 2 for example inside the cart.
            cart: state.cart.map((item) => {
              if (item.product._id === productId) {
                return { ...item, quantity: item.quantity + 1 };
              }
              return item;
            }),
          }));
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
      // Here we reset the state of the cart to empty array which equal to empty cart.
      resetCart: () => set({ cart: [] }),
      // Here we get the price of the product price and then calculate the product price multiplied by it's quantity.
      getPrice: (productId: string) => {
        const product = get().cart.find(
          (item) => item.product._id === productId,
        );
        if (!product) return 0;
        const productPrice = product.product.price ?? 0;
        const productDiscount = product.product.discount ?? 0;
        const productQuantity = product.quantity;
        const discount = (productPrice * productDiscount) / 100;
        const productWithDiscount = productPrice - discount;
        return Math.floor(productWithDiscount * productQuantity);
      },
      getTotalPrice: () => {
        const products = get().cart;
        return products.reduce((total, item) => {
          const productPrice = item.product.price ?? 0;
          const productQuantity = item.quantity;
          const totalProductPrice = productPrice * productQuantity;
          return total + totalProductPrice;
        }, 0);
      },
      getTotalPriceAfterDiscount: () => {
        // First we get the cart array "What is inside this array."
        const products = get().cart;
        // Then we loop through this cart array with reduce method
        return products.reduce((total, item) => {
          // We set the price of each product inside the cart in productPrice var.
          const productPrice = item.product.price ?? 0;
          // We set the discount of each product inside the cart in productPrice var.
          const productDiscount = item.product.discount ?? 0;
          // Then we calculate the discount of each product by multiplying the product price with it's discount then divide by 100%; $50 * 20%(0.20) / 100%.
          const discount = (productPrice * productDiscount) / 100;
          // Then the productPriceWithDiscount var assigned with the product price and it's discount after calculating it.
          const productPriceWithDiscount = productPrice - discount;
          // Then add this product price with discount to the total price.
          // So when the user adds one quantity of the product this function calculate it with it's discount and add to the total and when the user adds more quantity of that product then the price of this quantity is added to the total.
          // So when the sub total is 50$ for ex. with one quantity of the product and then the quantity becomes 2 of the same product the total will be 50$ + 50$ then total is 100$ of the same product.
          return total + productPriceWithDiscount;
        }, 0);
      },
      getTotalDiscount: () => {
        const products = get().cart;
        return products.reduce((total, item) => {
          // Here we get the original price of each product in the cart.
          const productPrice = item.product.price ?? 0;
          // Here we get the discount applied on each product in the cart.
          const productDiscount = item.product.discount ?? 0;
          // Here we get the quantity of each product stored in the cart.
          const productQuantites = item.quantity;
          // Here we ge the amount of the  discount applied for each product inside the cart. like $100 discount on this product.
          const productTotalDiscount = (productPrice * productDiscount) / 100;
          // Here we get the discount of each product multiplied by it's amount of qunatity if exists and then add it to the total discount.
          return total + productTotalDiscount * productQuantites;
        }, 0);
      },
      getItemCount: (productId: string) => {
        // First we get the cart array "What is inside this array."
        const product = get().cart;
        // Here we check if the product the user selected is the same product we want to calculate it's amount if yes then do the next condition.
        const isSameProduct = product.find(
          (product) => product.product._id === productId,
        );
        // If it's confirmed the same product the user want then cal. it's amount if not then return 0.
        return isSameProduct ? isSameProduct.quantity : 0;
      },
      // We get all the products inside the cart array.
      // getAllProducts: () => get().cart,

      // Here we set addFav. with all the favoriteProducts already there plus the product the user wants to add as a favorite "product".
      addFavorite: (product) => {
        const favoriteProducts = get().favorites;
        set({ favorites: [...favoriteProducts, product] });
      },
      // Here we match the id of the product the user wants to remove from favorites.
      // If the id matches one of the products inside the favorite cat. then the product is removed from favorites.
      removeFavorite: (productId) => {
        const favoriteProducts = get().favorites;
        set({
          favorites: favoriteProducts.filter((item) => item._id !== productId),
        });
      },
      // Here in toggleFavorite function we make sure that the product the user chooses is matched with the product the user wants to add or remove from favorites.
      // If isFavorite returns true then it means that the product is already in favorite, if it returns false then the product is not in favorite yet.
      toggleFavorite: (product) => {
        const favoriteProducts = get().favorites;
        const isFavorite = favoriteProducts.some(
          (item) => item._id === product._id,
        );

        // If the product is in favorite then remove it with removeFavorite Function and we passed the id of the product that is removed, If not then add the product via addFavorite Function and we passed the whole product object with it so it gets all of the product data.
        return isFavorite
          ? get().removeFavorite(product._id)
          : get().addFavorite(product);
      },
      resetWishlist: () => set({ favorites: [] }),
    }),
    { name: "ecommerceStore" },
  ),
);

export default zustandStore;

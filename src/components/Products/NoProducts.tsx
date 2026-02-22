import { cn } from "@/src/lib/utils";
import { motion } from "motion/react";
import { Loader2 } from "lucide-react";

interface NoProductsProps {
  selectedCategory?: string;
  className?: string;
}

const NoProducts = ({ selectedCategory, className }: NoProductsProps) => {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center py-10 min-h-8 w-full space-y-4 text-center bg-gray-100 rounded-lg mt-10",
        className,
      )}
    >
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-gray-800 text-2xl font-bold">
          No Products Available
        </h2>
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="text-gray-600"
      >
        There are no products matching on{" "}
        <span className="text-darkColor font-semibold text-base">
          {selectedCategory}
        </span>{" "}
        criteria at the moment.
      </motion.p>

      <motion.div
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ repeat: Infinity, duration: 1.5 }}
        className="flex items-center space-x-2 text-shop-btn-dark-green"
      >
        <Loader2 className="w-5 h-5 animate-spin" />
        <span>we are restocking shortly</span>
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="text-sm text-gray-500"
      >
        Please check again later or check our other categories.
      </motion.p>
    </div>
  );
};

export default NoProducts;

import { Frown } from "lucide-react";
import Link from "next/link";

const Unavailable = () => {
  return (
    <div className="bg-gray-100 mt-10 min-h-80 w-full py-12 flex justify-center items-center">
      <div className="flex items-center gap-4">
        <Frown className="w-5 h-5 text-blue-500" />
        <span className="text-blue-500 font-medium text-lg">
          Product is currently unavailable in the stock, please check again
          later.
        </span>
        <Link
          href={"/client"}
          className="text-blue-500 hover:text-blue-700 hoverEffect font-semibold text-lg"
        >
          Get back to Home page?
        </Link>
      </div>
    </div>
  );
};

export default Unavailable;

import Link from "next/link";
import Image from "next/image";
import { Brand } from "@/sanity.types";
import { urlFor } from "@/src/sanity/lib/image";

// Need to add a link that takes the user when clicked on one of the brands to the products related to that brand.

const SingleBrand = ({ brandsData }: { brandsData: Brand[] }) => {
  return (
    <div className="bg-linear-to-br from-shop-light-bg via-white to-shop-light-pink p-8 lg:p-12 rounded-3xl shadow-xl border border-shop-light-green/20 w-full ">
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4 lg:gap-8 place-items-center ">
        {brandsData?.map((brand) => {
          // Here we check if the image exists or not to avoid getting an error from typescript.
          const brandsImage = (brand.image && urlFor(brand.image).url()) || "";
          return (
            <Link
              href={`/client/shop?brand=${brand.slug?.current}`}
              className="group"
              key={brand._id}
            >
              <div className="bg-white shadow-xl rounded-xl flex items-center justify-center w-fit h-20 lg:h-24 transform group-hover:-translate-y-2 group-hover:border group-hover:border-shop-orange group-hover:shadow-2xl cursor-pointer hoverEffect">
                <Image
                  src={brandsImage}
                  alt="Brand"
                  width={100}
                  height={100}
                  className="md:w-full p-4 group-hover:scale-110 hoverEffect"
                />
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default SingleBrand;

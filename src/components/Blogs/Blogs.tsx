import Link from "next/link";
import type { BLOGS_QUERYResult } from "@/sanity.types";
import Image from "next/image";
import { Title } from "@/src/components/Text";
import { urlFor } from "@/src/sanity/lib/image";
import { Calendar, ArrowRight } from "lucide-react";

const Blogs = ({ blogsData }: { blogsData: BLOGS_QUERYResult }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
      {blogsData.map((blog) => {
        const sanityDate = blog._createdAt;
        const formattedDate = new Date(sanityDate).toLocaleDateString("en-uk", {
          day: "numeric",
          month: "long",
          year: "numeric",
        });

        const imageData =
          (blog.mainImage && urlFor(blog.mainImage).url()) || "";

        return (
          <Link
            href={`/client/blog/${blog.slug?.current}`}
            key={blog._id}
            className="group cursor-pointer"
          >
            <div className="h-full space-y-4 border border-gray-300 rounded-xl group-hover:-translate-y-3 group-hover:border-shop-dark-green group-hover:shadow-lg hoverEffect">
              <Image
                src={imageData}
                alt={blog.title || ""}
                width={400}
                height={300}
                className="rounded-tr-xl rounded-tl-xl"
              />
              <div className="flex items-center flex-wrap gap-2 p-4">
                {blog.blogcategories?.map((item) => (
                  <p
                    key={item.title}
                    className="py-1.5 px-3 bg-shop-light-pink text-shop-dark-green font-semibold w-fit rounded-full text-sm border border-shopLighterBg"
                  >
                    {item.title}
                  </p>
                ))}
              </div>
              <div className="space-y-4 p-4">
                <div className="flex items-center gap-4">
                  <Calendar size={18} className="text-shop-light-green" />
                  <p className="text-sm text-gray-500">{formattedDate}</p>
                </div>
                <Title className="text-xl text-darkColor group-hover:text-shop-dark-green line-clamp-2">
                  {blog.title}
                </Title>
              </div>
              <p className="flex items-center gap-2 hover:gap-5 text-shop-dark-green hover:text-shop-light-green font-semibold p-4 hoverEffect w-fit">
                Read More
                <ArrowRight size={18} />
              </p>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default Blogs;

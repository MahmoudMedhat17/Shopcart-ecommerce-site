import { getBlogCategories, getOtherBlogs } from "@/src/sanity/queries/query";
import { Title } from "../Text";
import { GETBLOGCATEGORIES_QUERYResult } from "@/sanity.types";
import Image from "next/image";
import Link from "next/link";
import { urlFor } from "@/src/sanity/lib/image";
import { BookOpen, ArrowRight, Calendar } from "lucide-react";

const BlogCategories = async ({ slug }: { slug: string }) => {
  const blogCategories: GETBLOGCATEGORIES_QUERYResult =
    (await getBlogCategories()) || [];
  const otherBlogs = await getOtherBlogs(slug, 5);

  // console.log(otherBlogs);

  console.log(otherBlogs?.[0]?.slug?.current);

  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
  } as const;

  return (
    <>
      <div className="bg-white shadow-lg p-4 rounded-lg">
        <Title className="text-lg flex items-center gap-4">
          <BookOpen className="w-5 h-5" />
          Blog Categories
        </Title>
        <div className="mt-8 space-y-8">
          {blogCategories.map(({ blogcategories }, index) => (
            <div
              key={index}
              className="hover:bg-gray-100 p-2 hoverEffect cursor-pointer rounded-lg flex items-center justify-between"
            >
              <p className="text-shopLightText">{blogcategories?.[0]?.title}</p>
              <p className="bg-gray-100 py-1 px-2 rounded-md">
                {blogcategories?.length}
              </p>
            </div>
          ))}
        </div>
      </div>
      <div className="bg-white shadow-lg p-4 rounded-lg mt-10">
        <Title className="text-lg flex items-center gap-4">
          <BookOpen className="w-5 h-5" />
          Latest Posts
        </Title>
        {otherBlogs?.map((otherBlog, index) => (
          <Link key={index} href={`/client/blog/${otherBlog.slug?.current}`}>
            <div className="mt-8 space-y-8 flex items-start justify-between gap-4 group hover:bg-gray-100 cursor-pointer p-2 hoverEffect">
              <Image
                src={urlFor(otherBlog.mainImage ?? "../../img1.jpg").url()}
                alt={otherBlog.title || ""}
                width={100}
                height={50}
                className="rounded-md border group-hover:border-shop-light-green hoverEffect"
              />
              <div>
                <h3 className="text-lg lg:text-sm mb-2 group-hover:text-shop-light-green hoverEffect">
                  {otherBlog.title}
                </h3>
                <p className="flex items-center gap-2 text-xs">
                  <Calendar size={15} />
                  {new Date(otherBlog._createdAt).toLocaleDateString(
                    "en-uk",
                    options,
                  )}
                </p>
              </div>
              <ArrowRight className="text-shopLightText group-hover:text-shop-light-green hoverEffect lg:w-20 lg:h-20" />
            </div>
          </Link>
        ))}
      </div>
    </>
  );
};

export default BlogCategories;

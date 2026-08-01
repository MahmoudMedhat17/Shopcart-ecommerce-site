import Container from "@/src/components/Container";
import { Title } from "@/src/components/Text";
import { urlFor } from "@/src/sanity/lib/image";
import { getAllBlogs } from "@/src/sanity/queries/query";
import Image from "next/image";
import Link from "next/link";
import { GETALLBLOGS_QUERY_RESULT } from "@/sanity.types";
import { Calendar } from "lucide-react";

const page = async () => {
  const blogs: GETALLBLOGS_QUERY_RESULT = await getAllBlogs();


  return (
    <Container>
      <Title className="font-semibold text-2xl sm:text-3xl">Blogs Page</Title>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-10">
        {blogs.map((blog) => {
          const sanityDate = blog._createdAt;
          const formattedDate = new Date(sanityDate).toLocaleDateString(
            "en-uk",
            {
              day: "numeric",
              month: "long",
              year: "numeric",
            },
          );
          return (
            <Link
              href={`/client/blog/${blog.slug?.current}`}
              key={blog._id}
              className="flex h-full"
            >
              <div className="group cursor-pointer overflow-hidden w-full h-full">
                {blog.mainImage && (
                  <Image
                    src={urlFor(blog.mainImage).url()}
                    alt={blog.title || ""}
                    width={420}
                    height={400}
                    className="rounded-tl-lg rounded-tr-lg object-cover group-hover:scale-105 hoverEffect w-full"
                  />
                )}
                <div className="bg-gray-100 p-4 rounded-bl-lg rounded-br-lg">
                  {blog.blogcategories?.map(
                    (item, index) =>
                      index === 0 && (
                        <div
                          key={item.title}
                          className="w-fit flex justify-start items-start gap-8 pb-2"
                        >
                          <span className="font-semibold text-shop-dark-green">
                            {item.title}
                          </span>
                          <span className="flex items-center gap-2 text-gray-500">
                            {" "}
                            <Calendar size={18} className="text-gray-500" />
                            {formattedDate}
                          </span>
                        </div>
                      ),
                  )}
                  {blog.body?.map(
                    (item, index) =>
                      index === 0 &&
                      item._type === "block" && (
                        <p key={item._key} className="text-sm font-semibold">
                          {item.children?.[0]?.text}
                        </p>
                      ),
                  )}
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </Container>
  );
};

export default page;

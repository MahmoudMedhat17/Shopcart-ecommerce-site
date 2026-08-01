// Need to create here the single blog code.
import Container from "@/src/components/Container";
import { getSingleBlog } from "@/src/sanity/queries/query";
import { notFound } from "next/navigation";
import { GETSINGLEBLOG_QUERYResult } from "@/sanity.types";
import Link from "next/link";
import Image from "next/image";
import { urlFor } from "@/src/sanity/lib/image";
import { Title } from "@/src/components/Text";
import {
  Calendar,
  User,
  Clock,
  Eye,
  ChevronLeft,
  Facebook,
  Instagram,
  Linkedin,
} from "lucide-react";
import BlogCategories from "@/src/components/Blogs/BlogCategories";

const page = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;

  const blog: GETSINGLEBLOG_QUERYResult | null = await getSingleBlog(slug);

  if (!blog || !blog[0]) return notFound();

  // console.log(blog);

  return (
    <div className="py-10">
      <Container className="grid grid-cols-1 lg:grid-cols-4 gap-5">
        <div className="md:col-span-3 space-y-4">
          <p className="text-xs font-semibold bg-shop-dark-green text-white w-fit px-2 py-1 rounded-lg">
            {blog[0]?.blogcategories?.[0]?.title || "No category"}
          </p>
          <Title className="text-4xl">{blog[0].title}</Title>
          <div className="flex items-center gap-4">
            <p className="text-sm text-gray-600 flex items-center gap-2 relative group cursor-pointer">
              <User className="w-4 h-4" />
              {blog[0].author?.name || "Unknown Author"}
              <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-shop-dark-green scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
            </p>

            <p className="text-sm text-gray-600 flex items-center gap-2 relative group cursor-pointer">
              <Calendar className="w-4 h-4" />
              {new Date(blog[0]._createdAt).toLocaleDateString()}
              <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-shop-dark-green scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
            </p>
            <p className="text-sm text-gray-600 flex items-center gap-2 relative group cursor-pointer">
              <Clock className="w-4 h-4" />
              3 min read
              <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-shop-dark-green scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
            </p>
            <p className="text-sm text-gray-600 flex items-center gap-2 relative group cursor-pointer">
              <Eye className="w-4 h-4" />
              1k views
              <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-shop-dark-green scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
            </p>
          </div>
          {blog[0]?.mainImage && (
            <Image
              src={urlFor(blog[0].mainImage).url()}
              alt={blog[0].title || "Blog image"}
              width={1000}
              height={400}
            />
          )}
          <div className="shadow-md py-2 px-4 rounded-lg">
            {blog[0].body &&
              blog[0].body.map((block, index) => (
                <div key={index}>
                  {"_type" in block &&
                    block._type === "block" &&
                    block.children &&
                    block.children.map(
                      (blogBody: { _key: string; text?: string }) => (
                        <p className="text-lg" key={blogBody._key}>
                          {blogBody.text}
                        </p>
                      ),
                    )}
                </div>
              ))}
          </div>
          <div className="border-t py-10 flex flex-col gap-6 sm:gap-0 sm:flex-row justify-between items-center">
            <Link href="/client/blog">
              <button className="flex items-center gap-2 border border-shop-dark-green px-2 py-1 rounded-sm hover:bg-shop-dark-green hover:text-white hoverEffect">
                <ChevronLeft className="w-4 h-4" />
                Back to Blog
              </button>
            </Link>
            <div className="flex items-center gap-4">
              <span className="text-gray-600">Share:</span>
              <div className="flex items-center gap-2">
                <Link href="https://www.facebook.com/">
                  <div className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center p-1 hoverEffect group hover:border-[#1877F2] cursor-pointer">
                    <Facebook className="w-5 h-5 group-hover:text-[#1877F2] hoverEffect" />
                  </div>
                </Link>
                <Link href="https://www.instagram.com/mahmoud_medhat17/">
                  <div className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center p-1 hoverEffect group hover:border-[#c13584] cursor-pointer">
                    <Instagram className="w-5 h-5  group-hover:text-[#c13584]" />
                  </div>
                </Link>
                <Link href="https://www.linkedin.com/in/mahmoud-medhat-84166a205">
                  <div className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center p-1 hoverEffect group hover:border-[#0077B5] cursor-pointer">
                    <Linkedin className="w-5 h-5 group-hover:text-[#0077B5]" />
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div>
          <BlogCategories slug={slug} />
        </div>
      </Container>
    </div>
  );
};

export default page;

import Link from "next/link";
import { Title, SubText } from "@/src/components/Text";
import { MoveRight } from "lucide-react";
import Blogs from "@/src/components/Blogs/Blogs";
import { getBlogs } from "@/src/sanity/queries/query";

const LatestBlogs = async () => {
  const blogsData = await getBlogs();

  return (
    <div className="py-12 flex flex-col items-center justify-center space-y-6">
      <div className="flex items-center  gap-2 sm:gap-4">
        <div className="w-16 h-1 bg-linear-to-r from-shop-light-green to-shop-dark-green rounded-full" />
        <Title className="text-darkColor text-3xl lg:text-4xl font-bold text-center">
          Latest Blog Posts
        </Title>
        <div className="w-16 h-1 bg-linear-to-r from-shop-light-green to-shop-dark-green rounded-full" />
      </div>
      <SubText className="text-gray-600 text-xl max-w-2xl mx-auto text-center">
        Stay updated with our latest insights, tips, and industry news
      </SubText>
      <Link href={"/client/blog"}>
        <button className="flex items-center gap-2 border border-shop-light-green text-shop-dark-green/80 hover:bg-shop-dark-green hover:text-white hoverEffect bg-shop-light-bg rounded-full px-6 py-3 font-semibold">
          View All Posts
          <MoveRight size={18} />
        </button>
      </Link>
      <Blogs blogsData={blogsData ?? []} />
    </div>
  );
};

export default LatestBlogs;

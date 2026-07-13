import BlogsPageContent from "@/components/layout/pages/blogs/blogsPageContent";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blogs",
  description: "Nos nouvelles au fil du temps.",
};

export default function Blogs() {
  return <BlogsPageContent />;
}
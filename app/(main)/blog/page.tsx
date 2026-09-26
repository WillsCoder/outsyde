import React from "react";
import BlogIndex from "@/modules/explorer/blog";

type SearchParams = {
  category?: string;
  tag?: string;
};

type Props = {
  searchParams: Promise<SearchParams>;
};

const Blog = async ({ searchParams }: Props) => {
  const params = await searchParams;

  return <BlogIndex searchParams={params} />;
};

export default Blog;



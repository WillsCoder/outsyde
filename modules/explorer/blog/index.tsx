"use client"
import React from "react";
import { useRouter } from "next/navigation";
import { Button, Tag } from "@/components/ui";

const BlogIndex = () => {
    const router = useRouter()

  return (
    <div className="min-h-screen bg-brand-sand flex items-center justify-center">
      <div className="box text-center">
        <div className="flex justify-center">
            <Tag text="● Coming soon"/>
        </div>

        <h1 className="text-5xl font-bold tracking-tight text-brand-night sm:text-6xl">
          Something worth reading
          <span className="block text-brand-orange">is coming.</span>
        </h1>

        <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-brand-night/80">
          We&apos;re working behind the scenes to bring you insightful stories,
          helpful guides, and fresh ideas. The blog will be launching soon.
        </p>

        <div className="mt-10 flex justify-center">
          <Button onClick={() => router.back()}>Go Back</Button>
        </div>

        <p className="mt-8 text-sm text-brand-night/30">
          Stay tuned. We&apos;ll be live soon.
        </p>
      </div>
    </div>
  );
};

export default BlogIndex;

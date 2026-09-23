"use client"
import React from "react";
import { Button, Tag } from "@/components/ui";
import { useRouter } from "next/navigation";

const ThreadsIndex = () => {
    const router = useRouter()

  return (
    <div className="min-h-screen bg-brand-sand flex items-center justify-center px-6">
      <div className="max-w-2xl text-center">
        <div className="flex justify-center">
          <Tag text="● Threads Coming Soon" />
        </div>

        <h1 className="text-5xl font-bold tracking-tight text-brand-night sm:text-6xl">
          Conversations are
          <span className="block text-brand-orange">coming soon.</span>
        </h1>

        <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-brand-night/80">
          A space for ideas, conversations, questions, and everything in
          between. We&apos;re putting the finishing touches on Threads.
        </p>

        <div className="mt-10 flex justify-center">
          <Button onClick={() => router.back()}>Go Back</Button>
        </div>

        <p className="mt-8 text-sm text-brand-night/30">
          Something interesting is on the way.
        </p>
      </div>
    </div>
  );
};

export default ThreadsIndex;

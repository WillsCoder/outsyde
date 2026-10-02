"use client";

import { useActionState } from "react";
import Link from "next/link";
import { IconArrowLeft, IconCheck } from "@tabler/icons-react";
import { POST_CATEGORY_LABELS } from "@/lib/const/types/post";

type Props = {
  post?: any;
  action: (prevState: any, formData: FormData) => Promise<any>;
};

const inputClass =
  "w-full h-10 border border-brand-night/12 rounded-lg px-3 text-sm outline-none focus:border-brand-orange transition-colors bg-white";
const labelClass = "text-xs font-medium text-brand-night/60 mb-1.5 block";

const PostForm = ({ post, action }: Props) => {
  const [state, formAction, isPending] = useActionState(action, {
    error: null,
    success: null,
  });

  return (
    <div className="max-w-2xl">
      <div className="flex items-center gap-3 mb-6">
        <Link
          href="/admin/blog"
          className="text-brand-night/40 hover:text-brand-night transition-colors"
        >
          <IconArrowLeft size={16} />
        </Link>
        <h1 className="text-xl font-bold text-brand-night">
          {post ? "Edit post" : "New post"}
        </h1>
      </div>

      <form action={formAction} className="flex flex-col gap-5">
        {post && <input type="hidden" name="id" value={post.id} />}

        <div className="bg-white border border-brand-night/8 rounded-xl p-5 flex flex-col gap-4">
          <p className="text-xs font-semibold text-brand-night/40 uppercase tracking-wider">
            Content
          </p>

          <div>
            <label className={labelClass}>Title</label>
            <input
              name="title"
              defaultValue={post?.title}
              placeholder="Post title…"
              className={inputClass}
              required
            />
          </div>

          <div>
            <label className={labelClass}>Slug</label>
            <input
              name="slug"
              defaultValue={post?.slug}
              placeholder="post-slug"
              className={inputClass}
              required
            />
          </div>

          <div>
            <label className={labelClass}>Excerpt</label>
            <textarea
              name="excerpt"
              defaultValue={post?.excerpt}
              rows={2}
              placeholder="Short description shown in cards…"
              className="w-full border border-brand-night/12 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-brand-orange transition-colors resize-none bg-white"
              required
            />
          </div>

          <div>
            <label className={labelClass}>Content (HTML)</label>
            <textarea
              name="content"
              defaultValue={post?.content}
              rows={16}
              placeholder="<h2>Heading</h2><p>Your content here…</p>"
              className="w-full border border-brand-night/12 rounded-lg px-3 py-2.5 text-sm font-mono outline-none focus:border-brand-orange transition-colors resize-y bg-white"
              required
            />
          </div>
        </div>

        <div className="bg-white border border-brand-night/8 rounded-xl p-5 flex flex-col gap-4">
          <p className="text-xs font-semibold text-brand-night/40 uppercase tracking-wider">
            Meta
          </p>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={labelClass}>Category</label>
              <select
                name="category"
                defaultValue={post?.category}
                className={`${inputClass} bg-white`}
                required
              >
                <option value="">Select category</option>
                {Object.entries(POST_CATEGORY_LABELS).map(([key, label]) => (
                  <option key={key} value={key}>
                    {label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className={labelClass}>Read time (mins)</label>
              <input
                name="readTime"
                type="number"
                defaultValue={post?.readTime ?? 5}
                min={1}
                className={inputClass}
              />
            </div>
          </div>

          <div>
            <label className={labelClass}>Cover image URL</label>
            <input
              name="coverImage"
              defaultValue={post?.coverImage}
              placeholder="https://…"
              className={inputClass}
            />
          </div>

          <div>
            <label className={labelClass}>Publish date</label>
            <input
              name="publishedAt"
              type="datetime-local"
              defaultValue={
                post?.publishedAt
                  ? new Date(post.publishedAt).toISOString().slice(0, 16)
                  : ""
              }
              className={inputClass}
            />
          </div>
        </div>

        <div className="bg-white border border-brand-night/8 rounded-xl p-5 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-brand-night">Published</p>
            <p className="text-xs text-brand-night/50 mt-0.5">
              Make visible on the blog
            </p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              name="isPublished"
              defaultChecked={post?.isPublished ?? false}
              className="sr-only peer"
            />
            <div className="w-10 h-6 bg-brand-night/15 rounded-full peer peer-checked:bg-brand-orange after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-transform peer-checked:after:translate-x-4" />
          </label>
        </div>

        <div className="bg-white border border-brand-night/8 rounded-xl p-5 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-brand-night">Featured</p>
            <p className="text-xs text-brand-night/50 mt-0.5">
              Show in featured section on homepage
            </p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              name="isFeatured"
              defaultChecked={post?.isFeatured ?? false}
              className="sr-only peer"
            />
            <div className="w-10 h-6 bg-brand-night/15 rounded-full peer peer-checked:bg-brand-orange after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-transform peer-checked:after:translate-x-4" />
          </label>
        </div>

        {state?.error && (
          <p className="text-sm text-red-500 bg-red-50 rounded-lg px-4 py-3">
            {state.error}
          </p>
        )}
        {state?.success && (
          <p className="flex items-center gap-2 text-sm text-brand-lagoon bg-brand-lagoon/10 rounded-lg px-4 py-3">
            <IconCheck size={14} /> {state.success}
          </p>
        )}

        <div className="flex gap-3">
          <Link
            href="/admin/blog"
            className="flex-1 text-center text-sm font-medium text-brand-night/60 border border-brand-night/12 rounded-xl py-2.5 hover:bg-brand-sand transition-colors"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={isPending}
            className="flex-1 text-sm font-medium bg-brand-orange text-white rounded-xl py-2.5 hover:opacity-90 transition-opacity disabled:opacity-40"
          >
            {isPending ? "Saving…" : post ? "Save changes" : "Create post"}
          </button>
        </div>
      </form>
    </div>
  );
}


export default PostForm;
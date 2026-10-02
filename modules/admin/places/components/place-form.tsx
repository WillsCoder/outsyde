"use client";

import { useActionState } from "react";
import Link from "next/link";
import { IconArrowLeft, IconCheck } from "@tabler/icons-react";

type Props = {
  place?: any;
  categories: { id: string; name: string }[];
  action: (prevState: any, formData: FormData) => Promise<any>;
};

const inputClass =
  "w-full h-10 border border-brand-night/12 rounded-lg px-3 text-sm text-brand-night outline-none focus:border-brand-orange transition-colors bg-white";
const labelClass = "text-xs font-medium text-brand-night/60 mb-1.5 block";

const PlaceForm = ({ place, categories, action }: Props) => {
  const [state, formAction, isPending] = useActionState(action, {
    error: null,
    success: null,
  });

  return (
    <div className="max-w-2xl">
      <div className="flex items-center gap-3 mb-6">
        <Link
          href="/admin/places"
          className="text-brand-night/40 hover:text-brand-night transition-colors"
        >
          <IconArrowLeft size={16} />
        </Link>
        <h1 className="text-xl font-bold text-brand-night">
          {place ? "Edit place" : "New place"}
        </h1>
      </div>

      <form action={formAction} className="flex flex-col gap-5">
        {place && <input type="hidden" name="id" value={place.id} />}

        <div className="bg-white border border-brand-night/8 rounded-xl p-5 flex flex-col gap-4">
          <p className="text-xs font-semibold text-brand-night/40 uppercase tracking-wider">
            Basic info
          </p>

          <div>
            <label className={labelClass}>Name</label>
            <input
              name="name"
              defaultValue={place?.name}
              placeholder="The Backyard Bar & Grill"
              className={inputClass}
              required
            />
          </div>

          <div>
            <label className={labelClass}>Slug</label>
            <input
              name="slug"
              defaultValue={place?.slug}
              placeholder="the-backyard-bar-grill"
              className={inputClass}
              required
            />
          </div>

          <div>
            <label className={labelClass}>Description</label>
            <textarea
              name="description"
              defaultValue={place?.description}
              rows={4}
              placeholder="Describe this place…"
              className="w-full border border-brand-night/12 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-brand-orange transition-colors resize-none bg-white"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={labelClass}>Category</label>
              <select
                name="categoryId"
                defaultValue={place?.categoryId}
                className={`${inputClass} bg-white`}
                required
              >
                <option value="">Select category</option>
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className={labelClass}>Cost level</label>
              <select
                name="costLevel"
                defaultValue={place?.costLevel ?? 2}
                className={`${inputClass} bg-white`}
              >
                <option value={1}>₦ Budget</option>
                <option value={2}>₦₦ Mid-range</option>
                <option value={3}>₦₦₦ Premium</option>
              </select>
            </div>
          </div>
        </div>

        <div className="bg-white border border-brand-night/8 rounded-xl p-5 flex flex-col gap-4">
          <p className="text-xs font-semibold text-brand-night/40 uppercase tracking-wider">
            Location
          </p>

          <div>
            <label className={labelClass}>Address</label>
            <input
              name="address"
              defaultValue={place?.address}
              placeholder="10 Akin Adesola St, Victoria Island"
              className={inputClass}
              required
            />
          </div>

          <div>
            <label className={labelClass}>City</label>
            <input
              name="city"
              defaultValue={place?.city ?? "Lagos"}
              placeholder="Lagos"
              className={inputClass}
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={labelClass}>Latitude</label>
              <input
                name="lat"
                type="number"
                step="any"
                defaultValue={place?.lat}
                placeholder="6.4281"
                className={inputClass}
                required
              />
            </div>
            <div>
              <label className={labelClass}>Longitude</label>
              <input
                name="lng"
                type="number"
                step="any"
                defaultValue={place?.lng}
                placeholder="3.4216"
                className={inputClass}
                required
              />
            </div>
          </div>
        </div>

        <div className="bg-white border border-brand-night/8 rounded-xl p-5 flex flex-col gap-4">
          <p className="text-xs font-semibold text-brand-night/40 uppercase tracking-wider">
            Media
          </p>
          <div>
            <label className={labelClass}>Cover image URL</label>
            <input
              name="coverImage"
              defaultValue={place?.images?.[0]?.url}
              placeholder="https://…"
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>360° view URL (optional)</label>
            <input
              name="view360Url"
              defaultValue={place?.view360Url}
              placeholder="https://…"
              className={inputClass}
            />
          </div>
        </div>

        <div className="bg-white border border-brand-night/8 rounded-xl p-5 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-brand-night">Published</p>
            <p className="text-xs text-brand-night/50 mt-0.5">
              Make this place visible on the site
            </p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              name="isPublished"
              defaultChecked={place?.isPublished ?? false}
              className="sr-only peer"
            />
            <div className="w-10 h-6 bg-brand-night/15 rounded-full peer peer-checked:bg-brand-orange after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-transform peer-checked:after:translate-x-4" />
          </label>
        </div>

        <div className="bg-white border border-brand-night/8 rounded-xl p-5 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-brand-night">Featured</p>
            <p className="text-xs text-brand-night/50 mt-0.5">
              Show in featured sections on homepage
            </p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              name="isFeatured"
              defaultChecked={place?.isFeatured ?? false}
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
            href="/admin/places"
            className="flex-1 text-center text-sm font-medium text-brand-night/60 border border-brand-night/12 rounded-xl py-2.5 hover:bg-brand-sand transition-colors"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={isPending}
            className="flex-1 text-sm font-medium bg-brand-orange text-white rounded-xl py-2.5 hover:opacity-90 transition-opacity disabled:opacity-40"
          >
            {isPending ? "Saving…" : place ? "Save changes" : "Create place"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default PlaceForm;
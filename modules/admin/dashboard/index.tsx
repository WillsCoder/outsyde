import React, { ForwardRefExoticComponent, RefAttributes } from 'react'
import Link from 'next/link';
import { IconArrowRight, IconProps } from '@tabler/icons-react';
import { PostCategory } from '@/lib/const/types/post';
import { formatDistanceToNow } from 'date-fns';

interface Props {
  stats: {
    label: string;
    value: number;
    icon: ForwardRefExoticComponent<IconProps & RefAttributes<SVGSVGElement>>;
    href: string;
    color: string;
  }[];
  recentPlaces: {
    id: string;
    name: string;
    createdAt: Date;
    slug: string;
    category: {
      name: string;
    };
    isPublished: boolean;
  }[];
  recentPosts: {
    id: string;
    slug: string;
    isPublished: boolean;
    createdAt: Date;
    category: PostCategory;
    title: string;
  }[];
}
const AdminDashboard = ({ stats, recentPlaces, recentPosts }: Props) => {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-xl font-bold text-brand-night">Overview</h1>
        <p className="text-sm text-brand-night/50 mt-0.5">
          Outsyde content dashboard
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        {stats.map(({ label, value, icon: Icon, href, color }) => (
          <Link
            key={label}
            href={href}
            className="bg-white border border-brand-night/8 rounded-xl p-4 hover:border-brand-orange/30 transition-colors group"
          >
            <div className="flex items-center justify-between mb-2">
              <Icon size={15} className={color} />
              <IconArrowRight
                size={12}
                className="text-brand-night/20 group-hover:text-brand-orange transition-colors"
              />
            </div>
            <p className="text-2xl font-bold text-brand-night">{value}</p>
            <p className="text-xs text-brand-night/40 mt-0.5">{label}</p>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Recent places */}
        <div className="bg-white border border-brand-night/8 rounded-xl overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3 border-b border-brand-night/7">
            <p className="text-sm font-semibold text-brand-night">
              Recent places
            </p>
            <Link href="/admin/places" className="text-xs text-brand-orange">
              View all →
            </Link>
          </div>
          <div className="divide-y divide-brand-night/5">
            {recentPlaces.map((p) => (
              <Link
                key={p.id}
                href={`/admin/places/${p.id}`}
                className="flex items-center justify-between px-4 py-3 hover:bg-brand-sand/50 transition-colors"
              >
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-brand-night truncate">
                    {p.name}
                  </p>
                  <p className="text-xs text-brand-night/40">
                    {p.category.name} ·{" "}
                    {formatDistanceToNow(new Date(p.createdAt), {
                      addSuffix: true,
                    })}
                  </p>
                </div>
                <span
                  className={`text-[10px] font-medium rounded-full px-2 py-0.5 ml-3 ${p.isPublished ? "bg-brand-lagoon/10 text-brand-lagoon" : "bg-brand-night/7 text-brand-night/40"}`}
                >
                  {p.isPublished ? "Live" : "Draft"}
                </span>
              </Link>
            ))}
          </div>
        </div>

        {/* Recent posts */}
        <div className="bg-white border border-brand-night/8 rounded-xl overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3 border-b border-brand-night/7">
            <p className="text-sm font-semibold text-brand-night">
              Recent posts
            </p>
            <Link href="/admin/blog" className="text-xs text-brand-orange">
              View all →
            </Link>
          </div>
          <div className="divide-y divide-brand-night/5">
            {recentPosts.map((p) => (
              <Link
                key={p.id}
                href={`/admin/blog/${p.id}`}
                className="flex items-center justify-between px-4 py-3 hover:bg-brand-sand/50 transition-colors"
              >
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-brand-night truncate">
                    {p.title}
                  </p>
                  <p className="text-xs text-brand-night/40">
                    {p.category} ·{" "}
                    {formatDistanceToNow(new Date(p.createdAt), {
                      addSuffix: true,
                    })}
                  </p>
                </div>
                <span
                  className={`text-[10px] font-medium rounded-full px-2 py-0.5 ml-3 ${p.isPublished ? "bg-brand-lagoon/10 text-brand-lagoon" : "bg-brand-night/7 text-brand-night/40"}`}
                >
                  {p.isPublished ? "Live" : "Draft"}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard
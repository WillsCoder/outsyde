import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { formatDistanceToNow } from "date-fns";
import AdminTable from "@/components/page-elements/admin/table";

async function deletePost(id: string) {
  "use server";
  await prisma.post.delete({ where: { id } });
  revalidatePath("/admin/blog");
}

export default async function AdminBlogPage() {
  const posts = await prisma.post.findMany({
    include: { author: { select: { name: true } } },
    orderBy: { createdAt: "desc" },
  });

  return (
    <AdminTable
      title="Blog posts"
      data={posts}
      newHref="/admin/blog/new"
      editHref={(p) => `/admin/blog/${p.id}`}
      onDelete={deletePost}
      searchKeys={["title", "excerpt"]}
      columns={[
        {
          key: "title",
          label: "Title",
          sortable: true,
          render: (p) => (
            <div>
              <p className="font-medium text-brand-night line-clamp-1">
                {p.title}
              </p>
              <p className="text-xs text-brand-night/40 line-clamp-1">
                {p.excerpt}
              </p>
            </div>
          ),
        },
        {
          key: "category",
          label: "Category",
          render: (p) => (
            <span className="text-xs font-medium bg-brand-sand text-brand-night/60 rounded-full px-2.5 py-1">
              {p.category}
            </span>
          ),
        },
        {
          key: "readTime",
          label: "Read time",
          render: (p) => (
            <span className="text-xs text-brand-night/50">
              {p.readTime} min
            </span>
          ),
        },
        {
          key: "publishedAt",
          label: "Published",
          sortable: true,
          render: (p) => (
            <span className="text-xs text-brand-night/50">
              {p.publishedAt
                ? formatDistanceToNow(new Date(p.publishedAt), {
                    addSuffix: true,
                  })
                : "—"}
            </span>
          ),
        },
        {
          key: "isPublished",
          label: "Status",
          render: (p) => (
            <span
              className={`text-[10px] font-medium rounded-full px-2.5 py-1 ${p.isPublished ? "bg-brand-lagoon/10 text-brand-lagoon" : "bg-brand-night/7 text-brand-night/40"}`}
            >
              {p.isPublished ? "Live" : "Draft"}
            </span>
          ),
        },
      ]}
    />
  );
}

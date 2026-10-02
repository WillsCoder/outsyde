import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { format } from "date-fns";
import AdminTable from "@/components/page-elements/admin/table";

async function deleteEvent(id: string) {
  "use server";
  await prisma.event.delete({ where: { id } });
  revalidatePath("/admin/events");
}

export default async function AdminEventsPage() {
  const events = await prisma.event.findMany({
    orderBy: { startTime: "desc" },
  });

  return (
    <AdminTable
      title="Events"
      data={events}
      newHref="/admin/events/new"
      editHref={(e) => `/admin/events/${e.id}`}
      onDelete={deleteEvent}
      searchKeys={["title", "city", "address"]}
      columns={[
        {
          key: "title",
          label: "Title",
          sortable: true,
          render: (e) => (
            <div>
              <p className="font-medium text-brand-night">{e.title}</p>
              <p className="text-xs text-brand-night/40">{e.address}</p>
            </div>
          ),
        },
        {
          key: "category",
          label: "Category",
          render: (e) => (
            <span className="text-xs font-medium bg-brand-sand text-brand-night/60 rounded-full px-2.5 py-1">
              {e.category}
            </span>
          ),
        },
        {
          key: "ticketType",
          label: "Ticket",
          render: (e) => (
            <span
              className={`text-xs font-medium rounded-full px-2.5 py-1 ${e.ticketType === "FREE" ? "bg-brand-lagoon/10 text-brand-lagoon" : "bg-brand-orange/10 text-brand-orange"}`}
            >
              {e.ticketType === "FREE"
                ? "Free"
                : `₦${e.ticketPrice?.toLocaleString()}`}
            </span>
          ),
        },
        {
          key: "startTime",
          label: "Date",
          sortable: true,
          render: (e) => (
            <span className="text-xs text-brand-night/60">
              {format(new Date(e.startTime), "MMM d, yyyy")}
            </span>
          ),
        },
        {
          key: "isPublished",
          label: "Status",
          sortable: true,
          render: (e) => (
            <span
              className={`text-[10px] font-medium rounded-full px-2.5 py-1 ${e.isPublished ? "bg-brand-lagoon/10 text-brand-lagoon" : "bg-brand-night/7 text-brand-night/40"}`}
            >
              {e.isPublished ? "Live" : "Draft"}
            </span>
          ),
        },
      ]}
    />
  );
}

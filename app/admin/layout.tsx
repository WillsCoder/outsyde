import { redirect } from "next/navigation";
import AdminShell from "@/modules/admin/layout";
import { auth } from "@/auth";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session?.user?.email) redirect("/login");
  if (session.user.role !== "ADMIN") redirect("/");

  return <AdminShell>{children}</AdminShell>;
}

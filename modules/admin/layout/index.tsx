"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  IconLayoutDashboard,
  IconMapPin,
  IconCalendarEvent,
  IconFileText,
  IconChevronRight,
  IconCommand,
  IconLogout,
  IconMenu2,
  IconX,
} from "@tabler/icons-react";
import { signOut } from "next-auth/react";

const navItems = [
  { href: "/admin", label: "Overview", icon: IconLayoutDashboard, exact: true },
  { href: "/admin/places", label: "Places", icon: IconMapPin },
  { href: "/admin/events", label: "Events", icon: IconCalendarEvent },
  { href: "/admin/blog", label: "Blog", icon: IconFileText },
];

export default function AdminShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isActive = (href: string, exact?: boolean) =>
    exact ? pathname === href : pathname.startsWith(href);

  return (
    <div className="min-h-screen bg-[#F9F8F6] flex">
      {/* Sidebar */}
      <aside
        className={`
        fixed inset-y-0 left-0 z-40 w-56 bg-brand-night flex flex-col
        transform transition-transform duration-200
        ${mobileOpen ? "translate-x-0" : "-translate-x-full"}
        lg:relative lg:translate-x-0
      `}
      >
        {/* Logo */}
        <div className="px-5 py-5 border-b border-white/8">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-brand-orange flex items-center justify-center">
              <IconCommand size={14} className="text-white" />
            </div>
            <span className="text-white text-sm font-bold tracking-tight">
              Outsyde <span className="text-white/30 font-normal">admin</span>
            </span>
          </Link>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 flex flex-col gap-0.5">
          {navItems.map(({ href, label, icon: Icon, exact }) => {
            const active = isActive(href, exact);
            return (
              <Link
                key={href}
                href={href}
                onClick={() => setMobileOpen(false)}
                className={`flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-all group ${
                  active
                    ? "bg-white/10 text-white font-medium"
                    : "text-white/50 hover:text-white hover:bg-white/5"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon size={15} />
                  {label}
                </div>
                {active && (
                  <IconChevronRight size={12} className="text-white/30" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Bottom */}
        <div className="px-3 py-4 border-t border-white/8">
          <Link
            href="/"
            className="flex items-center gap-2.5 px-3 py-2 text-sm text-white/40 hover:text-white transition-colors"
          >
            <IconMapPin size={15} />
            View site
          </Link>
          <button
            onClick={() => signOut({ callbackUrl: "/login" })}
            className="flex items-center gap-2.5 px-3 py-2 text-sm text-white/40 hover:text-red-400 transition-colors w-full text-left"
          >
            <IconLogout size={15} />
            Sign out
          </button>
        </div>
      </aside>

      {/* Mobile backdrop */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-30 bg-brand-night/50 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header className="h-14 border-b border-brand-night/8 bg-white flex items-center justify-between px-6">
          <button
            onClick={() => setMobileOpen(true)}
            className="lg:hidden text-brand-night/50 hover:text-brand-night transition-colors"
          >
            <IconMenu2 size={18} />
          </button>
          <div className="flex items-center gap-2 text-xs text-brand-night/40">
            <span>admin</span>
            <IconChevronRight size={12} />
            <span className="text-brand-night font-medium capitalize">
              {pathname.split("/").filter(Boolean).slice(1).join(" / ") ||
                "overview"}
            </span>
          </div>
          <Link
            href="/admin/places/new"
            className="text-xs font-medium bg-brand-orange text-white rounded-lg px-3 py-1.5 hover:opacity-90 transition-opacity"
          >
            + New
          </Link>
        </header>

        {/* Page content */}
        <main className="flex-1 p-6 overflow-auto">{children}</main>
      </div>
    </div>
  );
}

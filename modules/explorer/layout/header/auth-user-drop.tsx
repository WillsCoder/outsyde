import React from "react";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Button, Dropdown, DropdownItem, DropdownMenu } from "@/components/ui";
import {
  IconUser,
  IconHeart,
  IconUsers,
  IconLogout,
  IconChevronDown,
  IconShield,
} from "@tabler/icons-react";

interface Props {
  open: () => void;
}

const AuthUserDropdown = ({ open }: Props) => {
  const router = useRouter();
  const { data: session } = useSession();

  const user = session?.user;

  const initials = user?.name
    ?.split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const menuItems = [
    {
      group: "My stuff",
      items: [
        { label: "My Profile", icon: IconUser, href: "/profile" },
        { label: "Saved Places", icon: IconHeart, href: "/profile/saved-places" },
        { label: "My Link Ups", icon: IconUsers, href: "/profile/linkups" },
        // { label: "My Reviews", icon: IconMapPin, href: "/profile/reviews" },
        // {
        //   label: "My Events",
        //   icon: IconCalendarEvent,
        //   href: "/profile/events",
        // },
      ],
    },
    {
      group: "Account",
      items: [
        // { label: "Settings", icon: IconSettings, href: "/profile/settings" },
        // Show admin link only for admins
        ...(session?.user?.role === "ADMIN"
          ? [{ label: "Admin Panel", icon: IconShield, href: "/admin" }]
          : []),
      ],
    },
  ];

  return (
    <div className="flex items-center gap-2">
      {user ? (
        <Dropdown
          trigger={
            <div className="flex items-center gap-2 pl-1 pr-1 md:pr-3 py-1 border border-brand-night/15 hover:border-brand-night/30 rounded-full cursor-pointer transition-all group">
              {/* Avatar */}
              {user.image ? (
                <Image
                  src={user.image}
                  alt={user.name ?? ""}
                  width={32}
                  height={32}
                  className="w-7 h-7 lg:w-8 lg:h-8 rounded-full object-cover"
                />
              ) : (
                <div className="w-7 h-7 lg:w-8 lg:h-8 rounded-full bg-brand-orange flex items-center justify-center text-white text-xs font-bold shrink-0">
                  {initials}
                </div>
              )}
              <span className="hidden md:block text-sm font-medium text-brand-night max-w-24 truncate">
                {user.name?.split(" ")[0]}
              </span>
              <IconChevronDown
                size={14}
                className="text-brand-night/40 group-hover:text-brand-night transition-colors hidden md:block"
              />
            </div>
          }
          placement="bottom-right"
          className="w-64"
        >
          <DropdownMenu className="w-full p-1.5">
            {/* User info header */}
            <div className="flex items-center gap-3 px-3 py-3 mb-1 border-b border-brand-night/7">
              {user.image ? (
                <Image
                  src={user.image}
                  alt={user.name ?? ""}
                  width={40}
                  height={40}
                  className="w-10 h-10 rounded-full object-cover shrink-0"
                />
              ) : (
                <div className="w-10 h-10 rounded-full bg-brand-orange flex items-center justify-center text-white text-sm font-bold shrink-0">
                  {initials}
                </div>
              )}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-brand-night truncate">
                  {user.name}
                </p>
                <p className="text-xs text-brand-night/40 truncate">
                  {user.email}
                </p>
              </div>
            </div>

            {/* Menu groups */}
            {menuItems.map((group, gi) => (
              <div key={group.group}>
                {gi > 0 && <div className="h-px bg-brand-night/7 my-1" />}
                <p className="text-[10px] font-semibold uppercase tracking-widest text-brand-night/30 px-3 py-1.5">
                  {group.group}
                </p>
                {group.items.map((item) => (
                  <DropdownItem
                    key={item.href}
                    onClick={() => router.push(item.href)}
                    className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-brand-night/70 hover:bg-brand-sand hover:text-brand-night transition-colors cursor-pointer"
                  >
                    <item.icon
                      size={15}
                      className="text-brand-night/40 shrink-0"
                    />
                    {item.label}
                  </DropdownItem>
                ))}
              </div>
            ))}

            {/* Sign out */}
            <div className="h-px bg-brand-night/7 my-1" />
            <DropdownItem
              onClick={() => signOut({ callbackUrl: "/" })}
              className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-brand-orange hover:bg-brand-orange/5 transition-colors cursor-pointer mt-0.5"
            >
              <IconLogout size={15} className="shrink-0" />
              Sign out
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      ) : (
        <Button
          className="hidden! md:flex!"
          onClick={() => router.push("/login")}
        >
          Get Started
        </Button>
      )}

      {/* Mobile hamburger */}
      <Button
        onClick={open}
        className="aspect-square p-2.5! w-8! h-8! md:hidden!"
      >
        ☰
      </Button>
    </div>
  );
};

export default AuthUserDropdown;

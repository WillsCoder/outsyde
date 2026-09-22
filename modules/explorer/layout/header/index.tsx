"use client";
import React, { useState } from "react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui";
import { navRoutes } from "./nav-routes";

const LayoutHeader = () => {

  const router = useRouter()
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);
  const pathname = usePathname();


  return (
    <>
      <header>
        <div className="box flex items-center justify-between py-3">
          {/* logo */}
          <Link href="/" className="flex items-end">
            <Image
              src="/logo.png"
              alt="Outsyde Logo"
              width={500}
              height={500}
              className="w-8 md:w-10"
            />
            <span className="text-lg md:text-xl font-display font-bold tracking-tight">
              <span className="text-brand-orange">ut</span>syde
            </span>
          </Link>
          <nav className="hidden md:flex items-center gap-0.5 bg-brand-night/2 border border-brand-night/20 rounded-full px-1.5 py-1">
            {navRoutes.map((item) => {
              const isActive = pathname.startsWith(`${item.href}`);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`text-sm font-medium px-3.5 lg:px-5 py-1.5 rounded-full transition-all ${
                    isActive
                      ? "text-brand-sand bg-brand-orange"
                      : "text-brand-night/80 hover:text-brand-night hover:bg-brand-night/10"
                  }`}
                >
                  {item.name}
                </Link>
              );
            })}
          </nav>
          {/* Actions */}
          <div className="flex items-center gap-2 relative z-10">
            <Button variant="ghost" className="aspect-square p-2.5!">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="M21 21l-4.35-4.35" />
              </svg>
            </Button>
            <Button
              className="hidden! md:flex!"
              onClick={() => router.push("/login")}
            >
              Get Started
            </Button>
            {/* Mobile hamburger */}
            <Button
              onClick={() => setDrawerOpen(true)}
              className="aspect-square p-2.5! w-8! h-8! md:hidden!"
            >
              ☰
            </Button>
          </div>
        </div>
      </header>
      {/* Mobile bottom sheet drawer */}
      {drawerOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-brand-night/50 backdrop-blur-sm"
            onClick={() => setDrawerOpen(false)}
          />
          {/* Panel */}
          <div className="absolute bottom-0 left-0 right-0 bg-brand-night/80 rounded-t-3xl px-5 pb-8">
            {/* Handle */}
            <div className="w-9 h-1 bg-white/20 rounded-full mx-auto mt-3 mb-5" />

            {/* Logo */}
            <div className="flex items-center gap-1.5 mb-5">
              <Image
                src="/logo.png"
                alt="Outsyde"
                width={24}
                height={24}
                className="w-6 h-6"
              />
              <span className="text-white text-lg font-bold tracking-tight">
                O<span className="text-brand-orange">ut</span>syde
              </span>
            </div>

            {/* Nav links */}
            <nav className="flex flex-col gap-1 mb-4">
              {navRoutes.map(({ href, name, icon }) => (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setDrawerOpen(false)}
                  className={`flex items-center gap-3 text-[15px] pr-4 py-3 rounded-xl transition-all ${
                    pathname === href
                      ? "bg-white/10 text-white"
                      : "text-brand-sand hover:bg-white/7 hover:text-white"
                  }`}
                >
                  {icon} {name}
                </Link>
              ))}
            </nav>

            <div className="h-px bg-white/10 my-4" />

            <button className="flex items-center gap-3 text-[15px] text-brand-sand pr-4 py-3 w-full rounded-xl hover:bg-white/7 transition-all">
              🔐 Sign in
            </button>

            <Button className="w-full mt-2 py-3.5! text-[15px]! rounded-xl!">
              Get Started — It's Free
            </Button>
          </div>
        </div>
      )}
    </>
  );
};

export default LayoutHeader;

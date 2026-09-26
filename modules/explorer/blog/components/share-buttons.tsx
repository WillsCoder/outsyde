"use client";

import {
  IconBrandTwitter,
  IconBrandWhatsapp,
  IconLink,
  IconBrandFacebook,
} from "@tabler/icons-react";
import { useState } from "react";

const ShareButtons = ({
  title,
  slug,
}: {
  title: string;
  slug: string;
}) => {
  const [copied, setCopied] = useState(false);
  const url = `https://outsyde.ng/blog/${slug}`;
  const text = encodeURIComponent(`${title} — via Outsyde`);

  const copy = async () => {
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shares = [
    {
      icon: IconBrandTwitter,
      label: "X / Twitter",
      href: `https://twitter.com/intent/tweet?text=${text}&url=${encodeURIComponent(url)}`,
      color: "hover:bg-black hover:text-white",
    },
    {
      icon: IconBrandWhatsapp,
      label: "WhatsApp",
      href: `https://wa.me/?text=${text}%20${encodeURIComponent(url)}`,
      color: "hover:bg-[#25D366] hover:text-white",
    },
    {
      icon: IconBrandFacebook,
      label: "Facebook",
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      color: "hover:bg-[#1877F2] hover:text-white",
    },
  ];

  return (
    <div className="flex items-center gap-2 flex-wrap">
      <span className="text-xs font-medium text-brand-night/40 mr-1">
        Share
      </span>
      {shares.map(({ icon: Icon, label, href, color }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Share on ${label}`}
          className={`w-9 h-9 rounded-full border border-brand-night/12 bg-white flex items-center justify-center text-brand-night/50 transition-all ${color}`}
        >
          <Icon size={15} />
        </a>
      ))}
      <button
        onClick={copy}
        aria-label="Copy link"
        className="flex items-center gap-1.5 text-xs font-medium px-3 py-2 rounded-full border border-brand-night/12 bg-white text-brand-night/50 hover:bg-brand-night hover:text-white hover:border-brand-night transition-all"
      >
        <IconLink size={13} />
        {copied ? "Copied!" : "Copy link"}
      </button>
    </div>
  );
}

export default ShareButtons

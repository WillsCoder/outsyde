import { UserSocials } from "@/lib/const/types/link-up"
import { IconBrandInstagram, IconBrandSnapchat, IconBrandTiktok, IconBrandX } from "@tabler/icons-react"

export const SocialLinks = ({ socials }: { socials: Partial<UserSocials> }) => {
  const links = [
    { url: socials.instagramUrl, icon: IconBrandInstagram, label: "Instagram", color: "hover:text-pink-500" },
    { url: socials.tiktokUrl, icon: IconBrandTiktok, label: "TikTok", color: "hover:text-brand-night" },
    { url: socials.xUrl, icon: IconBrandX, label: "X", color: "hover:text-brand-night" },
    { url: socials.snapchatUrl, icon: IconBrandSnapchat, label: "Snapchat", color: "hover:text-yellow-400" },
  ].filter(l => l.url)

  if (links.length === 0) return null

  return (
    <div className="flex items-center gap-2">
      {links.map(({ url, icon: Icon, label, color }) => (
        <a
          key={label}
          href={url!.startsWith("http") ? url! : `https://${url}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
          className={`w-7 h-7 rounded-full border border-brand-night/10 flex items-center justify-center text-brand-night/40 transition-colors ${color}`}
        >
          <Icon size={13} />
        </a>
      ))}
    </div>
  )
}
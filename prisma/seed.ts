import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../app/generated/prisma/client";

// const prisma = new PrismaClient();
const prisma = new PrismaClient({
  adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL }),
});


async function main() {


  const categories = [
    {
      name: "Bars",
      slug: "bars",
      icon: "🍾",
      description: "Cocktail bars, lounges with drinks, and nightlife spots",
      order: 1,
      image: "https://ik.imagekit.io/willsbucket/Outsyde/bar.png",
    },
    {
      name: "Restaurants",
      slug: "restaurants",
      icon: "🍝",
      description: "Dine-in spots, casual eats, and fine dining",
      order: 2,
      image: "https://ik.imagekit.io/willsbucket/Outsyde/Restuarant.png",
    },
    {
      name: "Lounges",
      slug: "lounges",
      icon: "🛋️",
      description: "Chill spots to relax with drinks and good music",
      order: 3,
      image: "https://ik.imagekit.io/willsbucket/Outsyde/lounge.jpg",
    },
    {
      name: "Beaches",
      slug: "beaches",
      icon: "🏝️",
      description: "Beachfront spots for sun, sand, and good vibes",
      order: 4,
      image: "https://ik.imagekit.io/willsbucket/Outsyde/beach.webp",
    },
    {
      name: "Parks",
      slug: "parks",
      icon: "🏕️",
      description: "Green spaces and outdoor hangout spots",
      order: 5,
      image: "https://ik.imagekit.io/willsbucket/Outsyde/beach.webp",
    },
    {
      name: "Clubs",
      slug: "clubs",
      icon: "🪩",
      description: "Nightclubs and dance spots",
      order: 6,
      image: "https://ik.imagekit.io/willsbucket/Outsyde/club.png",
    },
    {
      name: "Cafes",
      slug: "cafes",
      icon: "☕",
      description: "Coffee shops and casual daytime spots",
      order: 7,
      image: "https://ik.imagekit.io/willsbucket/Outsyde/cafe.jpg",
    },
    {
      name: "Art & culture",
      slug: "art-culture",
      icon: "🎨",
      description: "Galleries, exhibitions, and cultural spaces",
      order: 8,
      image: "https://ik.imagekit.io/willsbucket/Outsyde/beach.webp",
    },
    {
      name: "Other",
      slug: "other",
      icon: "📍",
      description: "Everything else worth checking out",
      order: 9,
      image: "https://ik.imagekit.io/willsbucket/Outsyde/lounge.jpg",
    },
  ];

  for (const cat of categories) {
    await prisma.category.upsert({
      where: { slug: cat.slug },
      update: {},
      create: cat,
    });
  }
}

(async () => {
  try {
    await main();
  } catch (e) {
    console.error(e);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
})();

import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../app/generated/prisma/client";

const prisma = new PrismaClient({
  adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL }),
});

async function main() {
  // ─── Categories (unchanged) ───────────────────────────────────────────────
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
  console.log("✓ Categories seeded");

  // ─── Fetch category IDs ───────────────────────────────────────────────────
  const cat = await prisma.category.findMany({
    select: { id: true, slug: true },
  });
  const bySlug = Object.fromEntries(cat.map((c) => [c.slug, c.id]));

  // ─── Places ───────────────────────────────────────────────────────────────
  const places = [
    // BARS
    {
      name: "The Backyard Bar & Grill",
      slug: "the-backyard-bar-grill",
      description:
        "One of VI's most beloved outdoor bars — breezy open-air seating, string lights, live music on weekends, and some of the best cocktails in Lagos.",
      categoryId: bySlug["bars"],
      address: "10 Akin Adesola St, Victoria Island",
      city: "Lagos",
      lat: 6.4281,
      lng: 3.4216,
      costLevel: 2,
      isPublished: true,
      isFeatured: true,
      images: [
        {
          url: "https://images.unsplash.com/photo-1572116469696-31de0f17cc34?w=800",
          isPrimary: true,
          alt: "The Backyard outdoor seating",
        },
        {
          url: "https://images.unsplash.com/photo-1525268323446-0505b6fe7778?w=800",
          isPrimary: false,
          alt: "Cocktails at The Backyard",
        },
      ],
      menuItems: [
        { name: "Signature Cocktail", price: 4500 },
        { name: "Grilled Chicken", price: 8500 },
        { name: "Suya Platter", price: 6000 },
        { name: "Craft Beer", price: 2500 },
      ],
    },
    {
      name: "Wabi Social",
      slug: "wabi-social",
      description:
        "A modern bar and social club in Lekki with rotating DJ sets, a curated cocktail menu, and a creative crowd. Known for themed nights and great energy every weekend.",
      categoryId: bySlug["bars"],
      address: "13 Admiralty Way, Lekki Phase 1",
      city: "Lagos",
      lat: 6.4483,
      lng: 3.4737,
      costLevel: 2,
      isPublished: true,
      isFeatured: false,
      images: [
        {
          url: "https://images.unsplash.com/photo-1470337458703-46ad1756a187?w=800",
          isPrimary: true,
          alt: "Wabi Social bar",
        },
      ],
      menuItems: [
        { name: "Wabi Special", price: 5000 },
        { name: "Mojito", price: 4000 },
        { name: "Small Chops Platter", price: 7000 },
      ],
    },

    // RESTAURANTS
    {
      name: "Cactus Restaurant",
      slug: "cactus-restaurant",
      description:
        "A Lagos institution serving the finest continental and Nigerian cuisine in Victoria Island since the 90s. Elegant atmosphere, impeccable service, and a menu that never disappoints.",
      categoryId: bySlug["restaurants"],
      address: "Plot 2 Adeola Odeku St, Victoria Island",
      city: "Lagos",
      lat: 6.4275,
      lng: 3.4189,
      costLevel: 3,
      isPublished: true,
      isFeatured: true,
      images: [
        {
          url: "https://images.unsplash.com/photo-1514190051997-0f6f39ca5cde?w=800",
          isPrimary: true,
          alt: "Cactus Restaurant dining",
        },
        {
          url: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800",
          isPrimary: false,
          alt: "Cactus Restaurant food",
        },
      ],
      menuItems: [
        { name: "Grilled Lobster", price: 35000 },
        { name: "Jollof Rice & Chicken", price: 12000 },
        { name: "Pepper Soup", price: 9500 },
        { name: "Signature Dessert", price: 6000 },
      ],
    },
    {
      name: "Nok by Alara",
      slug: "nok-by-alara",
      description:
        "Pan-African cuisine in a stunning gallery-like setting. Nok blends art, culture, and food into one unforgettable experience, drawing inspiration from across the African continent.",
      categoryId: bySlug["restaurants"],
      address: "12 Akerele St, Surulere",
      city: "Lagos",
      lat: 6.4991,
      lng: 3.3563,
      costLevel: 3,
      isPublished: true,
      isFeatured: false,
      images: [
        {
          url: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800",
          isPrimary: true,
          alt: "Nok by Alara interior",
        },
      ],
      menuItems: [
        { name: "Jollof Risotto", price: 14000 },
        { name: "African Spiced Duck", price: 22000 },
        { name: "Zobo Cocktail", price: 5500 },
      ],
    },
    {
      name: "Yellow Chilli",
      slug: "yellow-chilli",
      description:
        "Upscale Nigerian cuisine with a modern twist. Their egusi and pounded yam is legendary among Lagos food lovers.",
      categoryId: bySlug["restaurants"],
      address: "4 Adeola Odeku St, Victoria Island",
      city: "Lagos",
      lat: 6.4271,
      lng: 3.4174,
      costLevel: 2,
      isPublished: true,
      isFeatured: false,
      images: [
        {
          url: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800",
          isPrimary: true,
          alt: "Yellow Chilli food",
        },
      ],
      menuItems: [
        { name: "Pounded Yam & Egusi", price: 9000 },
        { name: "Fried Plantain", price: 3500 },
        { name: "Chapman", price: 2500 },
      ],
    },

    // LOUNGES
    {
      name: "Sky Bar Rooftop Lounge",
      slug: "sky-bar-rooftop-lounge",
      description:
        "Panoramic views of the Lagos skyline, handcrafted cocktails, and a sophisticated crowd. Best enjoyed at sunset from Ikoyi's finest rooftop.",
      categoryId: bySlug["lounges"],
      address: "1 Ozumba Mbadiwe Ave, Ikoyi",
      city: "Lagos",
      lat: 6.4492,
      lng: 3.4308,
      costLevel: 3,
      isPublished: true,
      isFeatured: true,
      images: [
        {
          url: "https://images.unsplash.com/photo-1543007630-9710e4a00a20?w=800",
          isPrimary: true,
          alt: "Sky Bar rooftop view",
        },
      ],
      menuItems: [
        { name: "Sunset Spritz", price: 7000 },
        { name: "Truffle Fries", price: 5500 },
        { name: "Charcuterie Board", price: 12000 },
      ],
    },
    {
      name: "Alté Lounge",
      slug: "alte-lounge",
      description:
        "The creative hub of Lagos nightlife. Artists, musicians, and trendsetters converge here for live performances, art installations, and a playlist always ahead of its time.",
      categoryId: bySlug["lounges"],
      address: "22 Bode Thomas St, Surulere",
      city: "Lagos",
      lat: 6.5012,
      lng: 3.3587,
      costLevel: 2,
      isPublished: true,
      isFeatured: false,
      images: [
        {
          url: "https://images.unsplash.com/photo-1566737236500-c8ac43014a67?w=800",
          isPrimary: true,
          alt: "Alté Lounge",
        },
      ],
      menuItems: [
        { name: "Zobo Gin", price: 4500 },
        { name: "Jerk Wings", price: 6500 },
      ],
    },

    // BEACHES
    {
      name: "Tarkwa Bay Beach",
      slug: "tarkwa-bay-beach",
      description:
        "A sheltered lagoon beach accessible only by boat from Lagos Island. No cars, no stress — just white sand, calm waters, and a laid-back vibe that feels like a true escape.",
      categoryId: bySlug["beaches"],
      address: "Tarkwa Bay, Lagos Harbour",
      city: "Lagos",
      lat: 6.3985,
      lng: 3.3917,
      costLevel: 1,
      isPublished: true,
      isFeatured: true,
      images: [
        {
          url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800",
          isPrimary: true,
          alt: "Tarkwa Bay Beach",
        },
        {
          url: "https://images.unsplash.com/photo-1519046904884-53103b34b206?w=800",
          isPrimary: false,
          alt: "Tarkwa Bay waters",
        },
      ],
      menuItems: [],
    },
    {
      name: "Eleko Beach",
      slug: "eleko-beach",
      description:
        "A long stretch of Atlantic coastline in Ibeju-Lekki with fresh seafood, ATV rides, horse riding, and a local market along the beach. A favourite for weekend day trips.",
      categoryId: bySlug["beaches"],
      address: "Eleko, Ibeju-Lekki",
      city: "Lagos",
      lat: 6.4089,
      lng: 3.8271,
      costLevel: 1,
      isPublished: true,
      isFeatured: false,
      images: [
        {
          url: "https://images.unsplash.com/photo-1473116763249-2faaef81ccda?w=800",
          isPrimary: true,
          alt: "Eleko Beach",
        },
      ],
      menuItems: [
        { name: "Fresh Grilled Fish", price: 5000 },
        { name: "Coconut Water", price: 500 },
      ],
    },

    // CLUBS
    {
      name: "Quilox Club",
      slug: "quilox-club",
      description:
        "Lagos's most iconic nightclub. Massive dancefloor, world-class DJs, and an energy that's unmatched. Get there before midnight or you'll be in a long queue.",
      categoryId: bySlug["clubs"],
      address: "14 Adetokunbo Ademola St, Victoria Island",
      city: "Lagos",
      lat: 6.4314,
      lng: 3.4241,
      costLevel: 3,
      isPublished: true,
      isFeatured: true,
      images: [
        {
          url: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800",
          isPrimary: true,
          alt: "Quilox Club dancefloor",
        },
      ],
      menuItems: [
        { name: "Bottle Service (Hennessy)", price: 85000 },
        { name: "Cocktail", price: 8000 },
        { name: "Table for 6", price: 200000 },
      ],
    },
    {
      name: "Escape Nightclub",
      slug: "escape-nightclub",
      description:
        "Multi-room nightclub in Lekki with Afrobeats, hip-hop, and electronic music across floors. Known for impressive light shows and a high-energy younger crowd.",
      categoryId: bySlug["clubs"],
      address: "Plot 4 Hakeem Dickson Drive, Lekki Phase 1",
      city: "Lagos",
      lat: 6.4479,
      lng: 3.4729,
      costLevel: 2,
      isPublished: true,
      isFeatured: false,
      images: [
        {
          url: "https://images.unsplash.com/photo-1571266028243-d220c6a0f7aa?w=800",
          isPrimary: true,
          alt: "Escape Nightclub",
        },
      ],
      menuItems: [
        { name: "Entry (Ladies)", price: 5000 },
        { name: "Entry (Gents)", price: 10000 },
        { name: "Cocktail Pitcher", price: 15000 },
      ],
    },

    // CAFES
    {
      name: "Café Neo",
      slug: "cafe-neo",
      description:
        "The Lagos coffee chain that actually gets it right. Specialty coffee, fresh pastries, and healthy meals in a sleek work-friendly environment. Multiple locations across Lagos.",
      categoryId: bySlug["cafes"],
      address: "1655A Oyin Jolayemi St, Victoria Island",
      city: "Lagos",
      lat: 6.4301,
      lng: 3.4172,
      costLevel: 1,
      isPublished: true,
      isFeatured: false,
      images: [
        {
          url: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=800",
          isPrimary: true,
          alt: "Café Neo interior",
        },
      ],
      menuItems: [
        { name: "Flat White", price: 2500 },
        { name: "Croissant", price: 2000 },
        { name: "Acai Bowl", price: 5500 },
        { name: "Iced Latte", price: 2800 },
      ],
    },
    {
      name: "Double Four Kitchen",
      slug: "double-four-kitchen",
      description:
        "A cosy brunch spot and café in Lekki doing incredible French toast, smoothie bowls, and specialty coffee. The weekend brunch queue is worth every minute.",
      categoryId: bySlug["cafes"],
      address: "44 Kusenla Rd, Lekki Phase 1",
      city: "Lagos",
      lat: 6.4432,
      lng: 3.4691,
      costLevel: 2,
      isPublished: true,
      isFeatured: false,
      images: [
        {
          url: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800",
          isPrimary: true,
          alt: "Double Four Kitchen",
        },
      ],
      menuItems: [
        { name: "Brioche French Toast", price: 6500 },
        { name: "Smoothie Bowl", price: 5000 },
        { name: "Cold Brew", price: 3000 },
      ],
    },

    // ART & CULTURE
    {
      name: "Terra Kulture",
      slug: "terra-kulture",
      description:
        "Lagos's foremost arts and cultural centre — gallery, theatre, restaurant, and bookshop all under one roof. A must-visit for Nigerian art, literature, and live performance.",
      categoryId: bySlug["art-culture"],
      address: "Plot 1376 Tiamiyu Savage St, Victoria Island",
      city: "Lagos",
      lat: 6.4356,
      lng: 3.4198,
      costLevel: 1,
      isPublished: true,
      isFeatured: true,
      images: [
        {
          url: "https://images.unsplash.com/photo-1531243269054-5ebf6f34081e?w=800",
          isPrimary: true,
          alt: "Terra Kulture gallery",
        },
      ],
      menuItems: [],
    },

    // PARKS
    {
      name: "Lekki Conservation Centre",
      slug: "lekki-conservation-centre",
      description:
        "A 78-hectare nature reserve home to the longest canopy walkway in Africa. Spot monkeys, birds, and crocodiles — a rare slice of nature inside an urban city.",
      categoryId: bySlug["parks"],
      address: "Km 19, Lekki-Epe Expressway",
      city: "Lagos",
      lat: 6.4651,
      lng: 3.5714,
      costLevel: 1,
      isPublished: true,
      isFeatured: false,
      images: [
        {
          url: "https://images.unsplash.com/photo-1448375240586-882707db888b?w=800",
          isPrimary: true,
          alt: "Lekki Conservation Centre canopy",
        },
      ],
      menuItems: [
        { name: "Adult Entry", price: 2000 },
        { name: "Canopy Walk Add-on", price: 1500 },
      ],
    },
  ];

  for (const { images, menuItems, ...place } of places) {
    await prisma.place.upsert({
      where: { slug: place.slug },
      update: {},
      create: {
        ...place,
        images: { create: images },
        menuItems: { create: menuItems },
      },
    });
    console.log(`  ✓ ${place.name}`);
  }

  console.log(`\n✓ ${places.length} places seeded`);
  console.log("🚀 Done!");

  const placeMap = await prisma.place.findMany({
    select: { id: true, slug: true },
  });
  const placeBySlug = Object.fromEntries(placeMap.map((p) => [p.slug, p.id]));

  // ─── Events ───────────────────────────────────────────────────────────────
  const events = [
    // MUSIC
    {
      title: "Afrobeat Live Night",
      slug: "afrobeat-live-night",
      description:
        "An electric evening of live Afrobeats performances from Lagos's hottest emerging acts. Expect incredible energy, surprise guest appearances, and a dancefloor that never stops.",
      category: "MUSIC" as const,
      imageUrl:
        "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800",
      ticketType: "PAID" as const,
      ticketPrice: 8000,
      ticketUrl: "https://paystack.com/buy/afrobeat-live-night",
      startTime: new Date("2026-10-04T19:00:00Z"),
      endTime: new Date("2026-10-04T23:59:00Z"),
      address: "10 Akin Adesola St, Victoria Island",
      city: "Lagos",
      lat: 6.4281,
      lng: 3.4216,
      isPublished: true,
      isFeatured: true,
      placeId: placeBySlug["the-backyard-bar-grill"],
    },
    {
      title: "Jazz & Cocktails Evening",
      slug: "jazz-cocktails-evening",
      description:
        "Smooth jazz, handcrafted cocktails, and a rooftop view of Lagos at night. A sophisticated evening for music lovers and after-work unwinders alike.",
      category: "MUSIC" as const,
      imageUrl:
        "https://images.unsplash.com/photo-1415201364774-f6f0bb35f28f?w=800",
      ticketType: "PAID" as const,
      ticketPrice: 5000,
      ticketUrl: "https://paystack.com/buy/jazz-cocktails",
      startTime: new Date("2026-10-10T18:30:00Z"),
      endTime: new Date("2026-10-10T22:00:00Z"),
      address: "1 Ozumba Mbadiwe Ave, Ikoyi",
      city: "Lagos",
      lat: 6.4492,
      lng: 3.4308,
      isPublished: true,
      isFeatured: false,
      placeId: placeBySlug["sky-bar-rooftop-lounge"],
    },
    {
      title: "Quilox Saturday Night",
      slug: "quilox-saturday-night",
      description:
        "Lagos's biggest Saturday night experience. World-class DJs, bottle service, VIP tables, and an energy that goes until dawn. This is the one.",
      category: "MUSIC" as const,
      imageUrl:
        "https://images.unsplash.com/photo-1571266028243-d220c6a0f7aa?w=800",
      ticketType: "PAID" as const,
      ticketPrice: 15000,
      ticketUrl: "https://paystack.com/buy/quilox-saturday",
      startTime: new Date("2026-10-11T22:00:00Z"),
      endTime: new Date("2026-10-12T04:00:00Z"),
      address: "14 Adetokunbo Ademola St, Victoria Island",
      city: "Lagos",
      lat: 6.4314,
      lng: 3.4241,
      isPublished: true,
      isFeatured: true,
      placeId: placeBySlug["quilox-club"],
    },

    // FOOD
    {
      title: "Lagos Food Festival 2026",
      slug: "lagos-food-festival-2026",
      description:
        "The biggest food festival in West Africa returns. 50+ vendors, live cooking demos, celebrity chef appearances, and a celebration of Nigerian and continental cuisines.",
      category: "FOOD" as const,
      imageUrl:
        "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800",
      ticketType: "PAID" as const,
      ticketPrice: 10000,
      ticketUrl: "https://paystack.com/buy/lagos-food-fest",
      startTime: new Date("2026-10-17T11:00:00Z"),
      endTime: new Date("2026-10-17T20:00:00Z"),
      address: "Eko Atlantic City, Victoria Island",
      city: "Lagos",
      lat: 6.4106,
      lng: 3.4082,
      isPublished: true,
      isFeatured: true,
      placeId: null,
    },
    {
      title: "Sunday Brunch & Vibes",
      slug: "sunday-brunch-vibes",
      description:
        "A laid-back Sunday brunch experience with a rotating menu of continental and Nigerian dishes, free-flow mimosas, and a live acoustic set. No pressure, just good food and good people.",
      category: "FOOD" as const,
      imageUrl:
        "https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?w=800",
      ticketType: "FREE" as const,
      ticketPrice: null,
      ticketUrl: null,
      startTime: new Date("2026-10-05T11:00:00Z"),
      endTime: new Date("2026-10-05T15:00:00Z"),
      address: "44 Kusenla Rd, Lekki Phase 1",
      city: "Lagos",
      lat: 6.4432,
      lng: 3.4691,
      isPublished: true,
      isFeatured: false,
      placeId: placeBySlug["double-four-kitchen"],
    },

    // ART
    {
      title: "New Voices Exhibition",
      slug: "new-voices-exhibition",
      description:
        "Terra Kulture presents a group exhibition showcasing 12 emerging Nigerian visual artists. Paintings, sculptures, and mixed media works exploring identity, heritage, and modern Lagos life.",
      category: "ART" as const,
      imageUrl:
        "https://images.unsplash.com/photo-1531243269054-5ebf6f34081e?w=800",
      ticketType: "FREE" as const,
      ticketPrice: null,
      ticketUrl: null,
      startTime: new Date("2026-10-01T10:00:00Z"),
      endTime: new Date("2026-10-31T18:00:00Z"),
      address: "Plot 1376 Tiamiyu Savage St, Victoria Island",
      city: "Lagos",
      lat: 6.4356,
      lng: 3.4198,
      isPublished: true,
      isFeatured: true,
      placeId: placeBySlug["terra-kulture"],
    },
    {
      title: "Alara Art Night",
      slug: "alara-art-night",
      description:
        "An intimate evening of art, conversation, and Pan-African cuisine at Nok by Alara. Meet the artists, hear the stories behind the works, and experience culture in the most immersive way.",
      category: "ART" as const,
      imageUrl:
        "https://images.unsplash.com/photo-1578926078693-4e9aa79e7f31?w=800",
      ticketType: "PAID" as const,
      ticketPrice: 12000,
      ticketUrl: "https://paystack.com/buy/alara-art-night",
      startTime: new Date("2026-10-18T17:00:00Z"),
      endTime: new Date("2026-10-18T21:00:00Z"),
      address: "12 Akerele St, Surulere",
      city: "Lagos",
      lat: 6.4991,
      lng: 3.3563,
      isPublished: true,
      isFeatured: false,
      placeId: placeBySlug["nok-by-alara"],
    },

    // TECH
    {
      title: "Lagos Tech Meetup — AI Edition",
      slug: "lagos-tech-meetup-ai",
      description:
        "Monthly tech meetup for Lagos's growing developer and startup community. This month: AI tools, building with LLMs, and a fireside chat with two Lagos-based AI founders.",
      category: "TECH" as const,
      imageUrl:
        "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800",
      ticketType: "FREE" as const,
      ticketPrice: null,
      ticketUrl: "https://lu.ma/lagos-tech-ai",
      startTime: new Date("2026-10-08T17:00:00Z"),
      endTime: new Date("2026-10-08T20:00:00Z"),
      address: "Co-Creation Hub, Yaba",
      city: "Lagos",
      lat: 6.5056,
      lng: 3.3784,
      isPublished: true,
      isFeatured: false,
      placeId: null,
    },

    // COMEDY
    {
      title: "Laugh Factory Lagos",
      slug: "laugh-factory-lagos",
      description:
        "A night of pure comedy featuring five of Nigeria's funniest stand-up comedians. Expect sharp writing, relatable Lagos stories, and a crowd that laughs until it hurts.",
      category: "COMEDY" as const,
      imageUrl:
        "https://images.unsplash.com/photo-1527224538127-2104bb71c51b?w=800",
      ticketType: "PAID" as const,
      ticketPrice: 7500,
      ticketUrl: "https://paystack.com/buy/laugh-factory-lagos",
      startTime: new Date("2026-10-25T19:00:00Z"),
      endTime: new Date("2026-10-25T22:00:00Z"),
      address: "Terra Kulture Arena, Victoria Island",
      city: "Lagos",
      lat: 6.4356,
      lng: 3.4198,
      isPublished: true,
      isFeatured: true,
      placeId: placeBySlug["terra-kulture"],
    },

    // SPORTS
    {
      title: "5-a-Side Football Tournament",
      slug: "5-aside-football-tournament",
      description:
        "Join Lagos's favourite weekend 5-a-side tournament. 16 teams, 3 pitches, prizes for winners and top scorer. Sign up your team or join as a free agent.",
      category: "SPORTS" as const,
      imageUrl:
        "https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=800",
      ticketType: "PAID" as const,
      ticketPrice: 3000,
      ticketUrl: "https://paystack.com/buy/5aside-lagos",
      startTime: new Date("2026-10-12T08:00:00Z"),
      endTime: new Date("2026-10-12T14:00:00Z"),
      address: "Lekki Conservation Centre Grounds",
      city: "Lagos",
      lat: 6.4651,
      lng: 3.5714,
      isPublished: true,
      isFeatured: false,
      placeId: placeBySlug["lekki-conservation-centre"],
    },

    // FASHION
    {
      title: "Lagos Fashion Week 2026",
      slug: "lagos-fashion-week-2026",
      description:
        "Africa's premier fashion event returns. Four days of runway shows, designer showcases, pop-up markets, and networking with the continent's biggest names in fashion.",
      category: "FASHION" as const,
      imageUrl:
        "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=800",
      ticketType: "PAID" as const,
      ticketPrice: 25000,
      ticketUrl: "https://paystack.com/buy/lfw-2026",
      startTime: new Date("2026-10-22T09:00:00Z"),
      endTime: new Date("2026-10-25T21:00:00Z"),
      address: "Eko Hotel & Suites, Victoria Island",
      city: "Lagos",
      lat: 6.4329,
      lng: 3.4219,
      isPublished: true,
      isFeatured: true,
      placeId: null,
    },
  ];

  
for (const event of events) {
  await prisma.event.upsert({
    where: { slug: event.slug },
    update: {},
    create: event,
  });
  console.log(`  ✓ ${event.title}`);
}

console.log(`✓ ${events.length} events seeded`);
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





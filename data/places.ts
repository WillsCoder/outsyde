// data/places.ts

const places = [
  {
    id: "place_001",
    name: "The Bamboo Lounge",
    image_url:
      "https://images.unsplash.com/photo-1541544741938-0af808871cc0?w=800&h=600&fit=crop",
    short_description:
      "A cozy spot with bamboo interiors serving Asian fusion dishes.",
    place: "Lekki, Lagos",
  },
  {
    id: "place_002",
    name: "Eko Atlantic Viewpoint",
    image_url:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&h=600&fit=crop",
    short_description: "A scenic viewpoint overlooking the Atlantic Ocean.",
    place: "Victoria Island, Lagos",
  },
  {
    id: "place_003",
    name: "Freedom Park",
    image_url:
      "https://images.unsplash.com/photo-1758801305205-3974771d2a0c?q=80&w=2070&auto=format&fit=crop",
    short_description:
      "Historical park with art exhibits, live music, and green spaces.",
    place: "Lagos Island, Lagos",
  },
  {
    id: "place_004",
    name: "Nike Art Gallery",
    image_url:
      "https://images.unsplash.com/photo-1467385829985-2b0fb82b5193?q=80&w=1471&auto=format&fit=crop",
    short_description: "A contemporary art space showcasing Nigerian artists.",
    place: "Lekki, Lagos",
  },
  {
    id: "place_005",
    name: "Kalakuta Museum",
    image_url:
      "https://images.unsplash.com/photo-1464069668014-99e9cd4abf16?q=80&w=1932&auto=format&fit=crop",
    short_description:
      "Former home of Fela Kuti, now a museum honoring his legacy.",
    place: "Ikeja, Lagos",
  },
  {
    id: "place_006",
    name: "Terra Kulture",
    image_url:
      "https://plus.unsplash.com/premium_photo-1733317366445-d9df100ea793?q=80&w=1932&auto=format&fit=crop",
    short_description: "Cultural center with theater, art, and Nigerian food.",
    place: "Victoria Island, Lagos",
  },
  {
    id: "place_007",
    name: "Lekki Conservation Centre",
    image_url:
      "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=800&h=600&fit=crop",
    short_description: "Nature reserve with a canopy walkway and wildlife.",
    place: "Lekki, Lagos",
  },
  {
    id: "place_008",
    name: "La Campagne Tropicana",
    image_url:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&h=600&fit=crop",
    short_description:
      "Beach resort offering huts, water sports, and palm views.",
    place: "Ibeju-Lekki, Lagos",
  },
  {
    id: "place_009",
    name: "Bogobiri House",
    image_url:
      "https://images.unsplash.com/photo-1553440569-bcc63803a83d?w=800&h=600&fit=crop",
    short_description: "Art hotel and cultural hub with live music.",
    place: "Ikoyi, Lagos",
  },
  {
    id: "place_010",
    name: "Elegushi Beach",
    image_url:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&h=600&fit=crop",
    short_description: "Private beach with music, food, and nightlife.",
    place: "Lekki, Lagos",
  },
  {
    id: "place_011",
    name: "National Theatre",
    image_url:
      "https://images.unsplash.com/photo-1648023200358-9dc050df521d?q=80&w=1461&auto=format&fit=crop",
    short_description: "Iconic venue for plays, music, and dance.",
    place: "Iganmu, Lagos",
  },
  {
    id: "place_012",
    name: "Oniru Private Beach",
    image_url:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&h=600&fit=crop",
    short_description: "Clean, quiet beach ideal for family outings.",
    place: "Victoria Island, Lagos",
  },
  {
    id: "place_013",
    name: "Omu Resort",
    image_url:
      "https://plus.unsplash.com/premium_photo-1694475379912-600404c33683?q=80&w=1470&auto=format&fit=crop",
    short_description: "Family resort with zoo, rides, and aquarium.",
    place: "Bogije, Lagos",
  },
  {
    id: "place_014",
    name: "Art Twenty One",
    image_url:
      "https://plus.unsplash.com/premium_photo-1733259755061-bb37882fc068?q=80&w=1932&auto=format&fit=crop",
    short_description: "Modern art gallery highlighting African talent.",
    place: "Eko Hotel, Lagos",
  },
  {
    id: "place_015",
    name: "The Yellow Chilli",
    image_url:
      "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?w=800&h=600&fit=crop",
    short_description: "Modern Nigerian cuisine in an upscale setting.",
    place: "Ikeja, Lagos",
  },
  {
    id: "place_016",
    name: "Jazzhole",
    image_url:
      "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800&h=600&fit=crop",
    short_description: "Books, records, and cafe all in one cultural space.",
    place: "Ikoyi, Lagos",
  },
  {
    id: "place_017",
    name: "Tarkwa Bay",
    image_url:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&h=600&fit=crop",
    short_description: "Island beach accessible by boat, loved by surfers.",
    place: "Lagos Harbour, Lagos",
  },
  {
    id: "place_018",
    name: "Casa Ilashe",
    image_url:
      "https://images.unsplash.com/photo-1526045612212-70caf35c14df?w=800&h=600&fit=crop",
    short_description:
      "Private luxury beach resort perfect for group getaways.",
    place: "Ilashe Island, Lagos",
  },
  {
    id: "place_019",
    name: "Upbeat Recreation Centre",
    image_url:
      "https://images.unsplash.com/photo-1675522180698-3162f8704dff?q=80&w=1470&auto=format&fit=crop",
    short_description: "Indoor trampoline and adventure park for all ages.",
    place: "Lekki Phase 1, Lagos",
  },
  {
    id: "place_020",
    name: "Jaekel House",
    image_url:
      "https://plus.unsplash.com/premium_photo-1691030924781-04ea67909a79?q=80&w=1471&auto=format&fit=crop",
    short_description:
      "Colonial-era house turned museum about railway history.",
    place: "Ebute Metta, Lagos",
  },
];

export default places;

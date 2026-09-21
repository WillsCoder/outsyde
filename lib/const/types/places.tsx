
import { Place as PlaceDetailType } from "@/app/generated/prisma/browser";

export type Place ={
  id: string;
  name: string;
  slug: string;
  description: string;
  images: { url: string; isPrimary: boolean }[];
};
export type PlaceDetail = PlaceDetailType & {
  category: { id: string; name: string } | null;
  images: { url: string; isPrimary: boolean }[];
  ratings: {
    id: string;
    score: number;
    user: { name: string | null; image: string | null };
    createdAt: Date;
  }[];
  comments: {
    id: string;
    body: string;
    user: { name: string | null; image: string | null };
    createdAt: Date;
  }[];
};




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
  ratings: any[];
  comments: any[];
};



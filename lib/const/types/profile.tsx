import type {
  LinkUp,
  LinkUpRequest,
  User,
  Account,
  Comment
} from "@/app/generated/prisma/client";


export enum Gender {
  MALE = "MALE",
  FEMALE = "FEMALE",
  NON_BINARY = "NON_BINARY",
  PREFER_NOT_TO_SAY = "PREFER_NOT_TO_SAY",
}

export enum Role {
  USER = "USER",
  ADMIN = "ADMIN",
}

export type Profile = User & {
  account: Pick<Account, "id" | "userId" | "type">;
  comments: Pick<Comment, "id" | "body" | "placeId" | "eventId"> | null;
  linkups: Pick<LinkUp, "id" | "title" | "status" | "description"> | null;
  requests: (LinkUpRequest & {
    sender: Pick<User, "id" | "name" | "image">;
  })[];
  _count: {
    ratings: number;
    comments: number;
    linkUpsCreated: number;
  };
};
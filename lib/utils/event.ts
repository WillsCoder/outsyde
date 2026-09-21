// src/lib/utils/event.ts

import { EventCard } from "../const/types/event";


export const isFreeEvent = (event: Pick<EventCard, "ticketType">) =>
  event.ticketType === "FREE";

export const formatEventPrice = (
  event: Pick<EventCard, "ticketType" | "ticketPrice">,
) => {
  if (event.ticketType === "FREE") return "Free";
  if (!event.ticketPrice) return "Free";
  return `₦${event.ticketPrice.toLocaleString()}`;
};

export const isEventUpcoming = (event: Pick<EventCard, "startTime">) =>
  new Date(event.startTime) > new Date();

export const isEventOngoing = (
  event: Pick<EventCard, "startTime" | "endTime">,
) => {
  const now = new Date();
  return (
    new Date(event.startTime) <= now &&
    (!event.endTime || new Date(event.endTime) >= now)
  );
};

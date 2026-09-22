import EventsIndex from "@/modules/explorer/events";

type SearchParams = {
  category?: string;
  when?: string;
  ticket?: string;
};

type Props = {
  searchParams: Promise<SearchParams>;
};

const Events = async ({ searchParams }: Props) => {
  const params = await searchParams;

  return <EventsIndex searchParams={params} />;
};

export default Events;
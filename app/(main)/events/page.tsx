
type SearchParams = {
  category?: string;
  area?: string;
  cost?: string;
  q?: string;
  sort?: string;
};

type Props = {
  searchParams: Promise<SearchParams>;
};

const Events = async ({ searchParams }: Props) => {
  const params = await searchParams;

  return <>events</>;
};

export default Events;

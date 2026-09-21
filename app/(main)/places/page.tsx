import PlacesIndex from "@/modules/explorer/places";

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

const Places = async ({ searchParams }: Props) => {
  const params = await searchParams;

  return <PlacesIndex searchParams={params} />;
};

export default Places;

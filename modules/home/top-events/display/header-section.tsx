import { Tag } from "@/components/ui";

const HeaderSection = () => {
  return (
    <div className="text-center">
      <div className="flex justify-center">
        <Tag text="Top & Upcoming Events" />
      </div>
      <div className="relative flex">
        <div className="w-10/12 lg:w-6/12 mx-auto mt-4">
          <h1 className="text-3xl lg:text-5xl font-display font-medium text-brand-night tracking-tight">
            Discover What's Happening Next
          </h1>
        </div>
      </div>
      <div className="w-9/12 lg:w-4/12 mx-auto mt-3">
        <p className="text-brand-night/80 font-semibold">
          From sold-out parties to local experiences, find the events everyone
          is talking about.
        </p>
      </div>
    </div>
  );
};

export default HeaderSection;

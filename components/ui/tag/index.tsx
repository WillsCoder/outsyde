import { FC } from "react";

interface Props {
  text: string;
}
export const Tag: FC<Props> = ({ text }) => {
  return (
    <div className="w-fit flex text-white justify-center bg-brand-gold rounded-full px-5 py-[2px]">
      <p className="text-[10px] font-sans font-semibold uppercase">{text}</p>
    </div>
  );
};


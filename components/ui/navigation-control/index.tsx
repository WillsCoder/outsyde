"use client"
import { useRouter } from "next/navigation";
import { Button } from "../button";
import { IconArrowLeft, IconArrowRight } from "@tabler/icons-react";

interface Props {
  next: () => void;
  prev: () => void;
  boxSize: string;
  iconSize: number;
  canNext?: boolean;
  canPrev?: boolean;
  useDisabled?: boolean;
  collection?: boolean;
  totalCount?: number;
  showViewAll?: boolean;
  handle?: string;
  tag?: string;
  onViewAllClick?: () => void;
  shouldHide?: boolean;
  noButtons?: boolean;
}
export const NavigationControl = ({
  next,
  prev,
  boxSize,
  canNext,
  canPrev,
  useDisabled,
  showViewAll = true,
  totalCount,
  handle,
  tag,
  onViewAllClick,
  shouldHide = true,
  noButtons = false,
}: Props) => {
  const router = useRouter();
  if (useDisabled) {
    return (
      <div className="flex gap-x-2">
        <button
          className={`${
            canPrev ? "" : "opacity-0"
          } button bg-[#F2F3F4] circle place-center cursor-pointer ${boxSize}`}
          onClick={prev}
        >
          <IconArrowLeft/>
        </button>
        <button
          className={`${
            canNext ? "" : "opacity-0"
          } button bg-[#F2F3F4] circle place-center cursor-pointer ${boxSize}`}
          onClick={next}
        >
          <IconArrowRight/>
        </button>
      </div>
    );
  }
  return (
    <div className="flex items-center gap-x-4 text-amber-700">
      {showViewAll && (
        <Button
          variant="ghost"
          title={`View all (${totalCount || "20"}+) ⮞`}
          size="md"
          onClick={() => {
            if (onViewAllClick) {
              onViewAllClick();
            } else if (handle) {
              router.push(`collection/${handle}?tag=${tag}`);
            }
          }}
        />
      )}
      {noButtons && (
        <>
          <Button
            variant="ghost"
            disabled={!canPrev}
            onClick={prev}
            value={"⮜"}
            className={`aspect-square shadow ${boxSize} ${shouldHide ? "hidden md:flex" : "flex"} `}
          >
            <IconArrowLeft />
          </Button>
          <Button
            variant="ghost"
            disabled={!canNext}
            onClick={next}
            className={`aspect-square shadow ${boxSize} ${shouldHide ? "hidden md:flex" : "flex"} `}
          >
            <IconArrowRight />
          </Button>
        </>
      )}
    </div>
  );
};

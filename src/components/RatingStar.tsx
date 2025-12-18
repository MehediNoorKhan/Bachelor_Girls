import Icon from "./Icon";

export default function RatingStar({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: rating }, (_, index) => (
        <Icon key={index} src="/icons/star.svg" className="size-4" />
      ))}
    </div>
  );
}

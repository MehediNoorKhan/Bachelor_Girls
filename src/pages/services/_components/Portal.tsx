import Icon from "@/components/Icon";

export default function Portal() {
  return (
    <section>
      <div className="relative -top-5 mx-auto flex max-w-[804px] flex-col flex-wrap justify-center gap-[30px] max-md:px-2 sm:flex-row">
        <div className="border-primary flex flex-1 items-center gap-4 rounded-xl border bg-white/10 px-5 py-4 backdrop-blur-sm">
          <Icon src="/icons/love.svg" className="size-10" />

          <h2 className="text-[22px] leading-tight font-medium">
            Favorite <br /> Bookings
          </h2>
        </div>

        <div className="border-primary flex flex-1 items-center gap-4 rounded-xl border bg-white/10 px-5 py-4 backdrop-blur-sm">
          <Icon src="/icons/alermClock.svg" className="size-10" />
          <h2 className="py-0 text-[22px] leading-tight font-medium">
            Favorite <br /> Bookings
          </h2>
        </div>

        <div className="border-primary flex flex-1 items-center gap-4 rounded-xl border bg-white/10 px-5 py-4 backdrop-blur-sm">
          <Icon src="/icons/calender.svg" className="size-10" />

          <h2 className="text-[22px] leading-tight font-medium">
            Favorite <br /> Bookings
          </h2>
        </div>
      </div>
    </section>
  );
}

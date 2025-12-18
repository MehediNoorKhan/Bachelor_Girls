import OverChart from "./OverChart";
import Transactions from "./Transactions";

export default function Overview() {
  return (
    <section className="gap-5 p-2 md:p-10">
      <div className="flex flex-col justify-between gap-2 md:flex-row md:gap-5">
        <div className="relative flex-1 overflow-hidden rounded-[30px] border-2 p-7">
          <div className="from-primary/70 absolute top-0 right-0 h-48 w-48 bg-gradient-to-bl to-transparent blur-3xl" />
          <h3 className="relative z-10 text-[22px] font-bold">Overview</h3>
          <OverChart />
        </div>
        <div className="flex-1">
          <Transactions />
        </div>
      </div>
    </section>
  );
}

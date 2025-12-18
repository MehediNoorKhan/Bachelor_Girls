import Bookings from "./_components/Bookings";
import Payment from "./_components/Payment";
import PaymentStatus from "./_components/PaymentStatus";
import Revenue from "./_components/Revenue";
import Reviews from "./_components/Reviews";

export default function Dashboard() {
  return (
    <main>
      <div className="flex flex-1 flex-col gap-5 p-2 md:p-10">
        <div className="grid auto-rows-min gap-4 xl:grid-cols-2">
          <Bookings />
          <Revenue />
        </div>

        <div className="grid auto-rows-min gap-4 lg:grid-cols-2 xl:grid-cols-3">
          <Payment />
          <Reviews />
          <PaymentStatus />
        </div>
      </div>
    </main>
  );
}

import Bookings from "./Bookings";
import HomeService from "./HomeService";

export default function BookingsTab() {
  return (
    <div className="mt-[47px]">
      <HomeService />
      <Bookings />
    </div>
  );
}

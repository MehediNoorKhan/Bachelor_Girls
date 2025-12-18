import useModal from "@/components/Modal/useModal";
import {
  Tabs as Tab,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import BookingsTab from "./BookingsTab";
import RevenueTab from "./RevenueTab";
import ReviewTab from "./ReviewTab";
import StatsTab from "./StatsTab";

export default function Tabs() {
  const { getParams, open } = useModal();
  const tab = getParams("tab");

  const handleTabChange = (value: string) => {
    open([{ modalId: "tab", openId: value }]);
  };

  return (
    <section className="px-2.5 py-5 sm:p-10">
      <Tab
        defaultValue="bookings"
        value={tab || "bookings"}
        onValueChange={handleTabChange}
      >
        <TabsList className="gap-2 bg-transparent max-sm:w-full sm:gap-4">
          <TabsTrigger
            value="bookings"
            className="data-[state=active]:bg-primary! text-muted bg-secondary h-8 w-28 cursor-pointer rounded-full border-none text-sm font-bold transition-all active:scale-95 data-[state=active]:text-white! sm:h-11 sm:w-32"
          >
            Bookings
          </TabsTrigger>

          <TabsTrigger
            value="revenue"
            className="data-[state=active]:bg-primary! text-muted bg-secondary h-8 w-28 cursor-pointer rounded-full border-none text-sm font-bold transition-all active:scale-95 data-[state=active]:text-white! sm:h-11 sm:w-32"
          >
            Revenue
          </TabsTrigger>

          <TabsTrigger
            value="reviews"
            className="data-[state=active]:bg-primary! text-muted bg-secondary h-8 w-28 cursor-pointer rounded-full border-none text-sm font-bold transition-all active:scale-95 data-[state=active]:text-white! sm:h-11 sm:w-32"
          >
            Reviews
          </TabsTrigger>

          <TabsTrigger
            value="stats"
            className="data-[state=active]:bg-primary! text-muted bg-secondary h-8 w-28 cursor-pointer rounded-full border-none text-sm font-bold transition-all active:scale-95 data-[state=active]:text-white! sm:h-11 sm:w-32"
          >
            Stats
          </TabsTrigger>
        </TabsList>

        <TabsContent value="bookings">
          <BookingsTab />
        </TabsContent>

        <TabsContent value="revenue">
          <RevenueTab />
        </TabsContent>

        <TabsContent value="reviews">
          <ReviewTab />
        </TabsContent>

        <TabsContent value="stats">
          <StatsTab />
        </TabsContent>
      </Tab>
    </section>
  );
}

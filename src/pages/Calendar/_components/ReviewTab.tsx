import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AllReview from "./AllReview";
import CriticalReviews from "./CriticalReviews";
import PositiveReview from "./PositiveReview";

export default function ReviewTab() {
  return (
    <Tabs defaultValue="all" className="mt-[43px] w-full">
      <TabsList className="w-full bg-transparent">
        <TabsTrigger
          value="all"
          className="data-[state=active]:text-primary! data-[state=active]:border-primary! cursor-pointer rounded-none border-x-0 border-t-0 border-b-2 text-xl leading-[120%] font-bold data-[state=active]:bg-transparent! data-[state=active]:shadow-none!"
        >
          All
        </TabsTrigger>

        <TabsTrigger
          value="positive"
          className="data-[state=active]:text-primary! data-[state=active]:border-primary! cursor-pointer rounded-none border-x-0 border-t-0 border-b-2 text-xl leading-[120%] font-bold data-[state=active]:bg-transparent! data-[state=active]:shadow-none!"
        >
          Positive
        </TabsTrigger>

        <TabsTrigger
          value="critical"
          className="data-[state=active]:text-primary! data-[state=active]:border-primary! cursor-pointer rounded-none border-x-0 border-t-0 border-b-2 text-xl leading-[120%] font-bold data-[state=active]:bg-transparent! data-[state=active]:shadow-none!"
        >
          Critical
        </TabsTrigger>
      </TabsList>
      <TabsContent value="all">
        <AllReview />
      </TabsContent>

      <TabsContent value="positive">
        <PositiveReview />
      </TabsContent>

      <TabsContent value="critical">
        <CriticalReviews />
      </TabsContent>
    </Tabs>
  );
}

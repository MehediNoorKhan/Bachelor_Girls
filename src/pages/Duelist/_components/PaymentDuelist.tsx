import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DueListTab from "./DueListTab";
import RequestedTab from "./RequestedTab";

export default function PaymentDuelist() {
  return (
    <section className="gap-5 p-2 md:p-10">
      <Tabs defaultValue="due-list" className="w-full">
        <TabsList className="w-full bg-transparent">
          <TabsTrigger
            value="due-list"
            className="data-[state=active]:text-primary! data-[state=active]:border-primary! cursor-pointer rounded-none border-x-0 border-t-0 border-b-2 text-xl leading-[120%] font-bold data-[state=active]:bg-transparent! data-[state=active]:shadow-none!"
          >
            Due List
          </TabsTrigger>

          <TabsTrigger
            value="requested"
            className="data-[state=active]:text-primary! data-[state=active]:border-primary! cursor-pointer rounded-none border-x-0 border-t-0 border-b-2 text-xl leading-[120%] font-bold data-[state=active]:bg-transparent! data-[state=active]:shadow-none!"
          >
            Requested
          </TabsTrigger>
        </TabsList>
        <TabsContent
          value="due-list"
          className="mt-5 grid grid-cols-4 gap-5 space-y-5"
        >
          <DueListTab />
        </TabsContent>

        <TabsContent
          value="requested"
          className="mt-5 grid grid-cols-4 gap-5 space-y-5"
        >
          <RequestedTab />
        </TabsContent>
      </Tabs>
    </section>
  );
}

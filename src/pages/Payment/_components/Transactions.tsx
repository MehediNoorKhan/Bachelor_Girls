import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { faker } from "@faker-js/faker";
import { ArrowDownLeft } from "lucide-react";

export default function Transactions() {
  return (
    <Tabs defaultValue="transactions" className="w-full">
      <TabsList className="w-full bg-transparent">
        <TabsTrigger
          value="transactions"
          className="data-[state=active]:text-primary! data-[state=active]:border-primary! cursor-pointer rounded-none border-x-0 border-t-0 border-b-2 text-xl leading-[120%] font-bold data-[state=active]:bg-transparent! data-[state=active]:shadow-none!"
        >
          Transactions
        </TabsTrigger>

        <TabsTrigger
          value="pending"
          className="data-[state=active]:text-primary! data-[state=active]:border-primary! cursor-pointer rounded-none border-x-0 border-t-0 border-b-2 text-xl leading-[120%] font-bold data-[state=active]:bg-transparent! data-[state=active]:shadow-none!"
        >
          Pending
        </TabsTrigger>
      </TabsList>
      <TabsContent value="transactions" className="mt-5 space-y-5">
        {allTransactions.map((transaction) => (
          <div
            key={transaction.id}
            className="bg-muted flex items-center gap-[14px] rounded-[12px] border px-6 py-20.5 sm:py-6"
          >
            <div className="rounded-[8px] border p-2.5">
              <ArrowDownLeft strokeWidth={1.5} size={24} />
            </div>

            <div className="flex w-full items-center justify-between">
              <div>
                <h4 className="text-[22px] font-medium">{transaction.type}</h4>
                <p className="text-muted-foreground text-normal text-sm">
                  {transaction.date}
                </p>
              </div>
              <h4 className="text-primary text-3xl font-extrabold sm:text-4xl">
                {transaction.amount}
              </h4>
            </div>
          </div>
        ))}
      </TabsContent>

      <TabsContent value="pending" className="mt-5 space-y-5">
        {pendingTransactions.map((transaction) => (
          <div
            key={transaction.id}
            className="bg-muted flex items-center gap-[14px] rounded-[12px] border px-6 py-20.5 sm:py-6"
          >
            <div className="rounded-[8px] border p-2.5">
              <ArrowDownLeft strokeWidth={1.5} size={24} />
            </div>

            <div className="flex w-full items-center justify-between">
              <div>
                <h4 className="text-[22px] font-medium">{transaction.type}</h4>
                <p className="text-muted-foreground text-normal text-sm">
                  {transaction.date}
                </p>
              </div>
              <h4 className="text-primary text-3xl font-extrabold sm:text-4xl">
                {transaction.amount}
              </h4>
            </div>
          </div>
        ))}
      </TabsContent>
    </Tabs>
  );
}

const allTransactions = Array.from({ length: 4 }).map(() => ({
  id: faker.string.uuid(),
  type: faker.finance.transactionType(),
  date: faker.date.recent().toLocaleDateString(),
  amount: faker.finance.amount({ min: 10, max: 500, dec: 2, symbol: "$" }),
}));

const pendingTransactions = Array.from({ length: 3 }).map(() => ({
  id: faker.string.uuid(),
  type: faker.finance.transactionType(),
  date: faker.date.recent().toLocaleDateString(),
  amount: faker.finance.amount({ min: 10, max: 500, dec: 2, symbol: "$" }),
}));

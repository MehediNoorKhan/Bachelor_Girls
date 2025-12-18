import Icon from "@/components/Icon";
import {
  useAvailableTimeSlotsQuery,
  useServiceDetailsQuery,
} from "@/store/api/serviceApi";
import { formatTimeTo12Hour } from "@/utils/dateFormate";
import { useParams, useSearchParams } from "react-router";
import BookingActions from "./BookingActions";
import useConfirmationBooking from "./use-confirmation-booking";

import SectionErrors from "@/components/errors/SectionErrors";
import Loading from "@/components/Loading";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import type { IService } from "@/types";

export default function ConfirmationBooking() {
  const [searchParams] = useSearchParams();
  const selectedDate = searchParams.get("date");
  const selectedTime = searchParams.get("time");
  const { serviceId } = useParams();
  const { data, isLoading, isError } = useServiceDetailsQuery({
    serviceId: Number(serviceId),
  });

  const { form, onSubmit } = useConfirmationBooking({
    service: data?.data,
  });

  const { data: times } = useAvailableTimeSlotsQuery({
    service_id: serviceId ? Number(serviceId) : 0,
    // selected date or today's date
    date: selectedDate || new Date().toISOString().split("T")[0],
  });

  // Get the selected time slot details
  const time = times?.data.find((t) => t.id.toString() === selectedTime);

  if (isLoading)
    return (
      <div className="bg-card grid min-h-[90dvh] w-full place-content-center rounded-2xl py-16 sm:w-[81dvw] md:py-[127px]">
        <Loading />
      </div>
    );

  if (isError)
    return (
      <div className="bg-card grid min-h-[90dvh] w-full place-content-center rounded-2xl py-16 sm:w-[81dvw] md:py-[127px]">
        <SectionErrors />
      </div>
    );

  const service: IService = data?.data || ({} as IService);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="bg-card grid w-full place-content-center rounded-2xl py-16 sm:w-[81dvw] md:py-[127px]">
          <div className="flex w-full max-w-[338px] flex-col items-center gap-6">
            <Icon src="/icons/confirm.svg" />

            <div>
              <h3 className="text-primary text-center text-2xl font-bold">
                Please confirm your Booking
              </h3>
              <h4 className="mt-5 text-center text-2xl font-bold">
                {service.title}
              </h4>
            </div>

            <div className="flex w-full flex-col items-center">
              <div className="space-y-2.5 text-center">
                <p className="font-bold">${service.price} per session</p>
                {service.minimum_deposite && (
                  <p className="text-xs">
                    Due: $
                    {(service.price - Number(form.watch("advance"))).toFixed(2)}
                  </p>
                )}

                {service?.discount && (
                  <p className="text-xs">(Discount: {service.discount}% Off)</p>
                )}
              </div>

              <hr className="my-5" />

              <div className="space-y-2.5">
                <p className="text-muted-foreground flex items-center gap-[38px] text-[13px]">
                  Date <span className="font-bold">{selectedDate}</span>
                </p>
                <p className="text-muted-foreground flex items-center gap-[38px] text-[13px]">
                  Time{" "}
                  <span className="font-bold">
                    {time?.time ? formatTimeTo12Hour(time.time) : "N/A"}
                  </span>
                </p>
              </div>

              {service.minimum_deposite && (
                <FormField
                  control={form.control}
                  name="advance"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormControl>
                        <Input
                          placeholder={`Minimum Deposit Amount $${service.minimum_deposite}`}
                          {...field}
                          className="border-primary mt-5 w-full rounded-full border-0 border-b pb-2.5 text-center"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              )}
              {/* <div className="border-primary mt-5 w-full rounded-full border-b pb-2.5 text-center">
                <p className="text-primary text-sm"></p>
              </div> */}
            </div>

            <BookingActions
              isLoading={
                isLoading ||
                form.formState.isSubmitting ||
                !form.formState.isValid
              }
              isError={isError}
            />
          </div>
        </div>
      </form>
    </Form>
  );
}

import { Button } from "@/components/animate-ui/components/buttons/button";
import Icon from "@/components/Icon";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Textarea } from "@/components/ui/textarea";
import { BadgeDollarSign, CloudUpload } from "lucide-react";
import Location from "./Location";
import useAddService from "./use-add-service";

export default function AddServiceForm() {
  const { form, onSubmit } = useAddService();

  return (
    <section className="gap-5 p-2 md:p-10">
      <div className="flex justify-center gap-[113px]">
        <div className="flex-1">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <h3 className="text-[22px] leading-[120%] font-semibold">
                Add your service
              </h3>
              <div className="mt-5 space-y-4">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem className="space-y-1">
                      <FormLabel className="text-base leading-normal font-medium">
                        Service Title
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Add a title here..."
                          {...field}
                          className="border-ring h-10"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem className="space-y-1">
                      <FormLabel className="text-base leading-normal font-medium">
                        Description
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Write here..."
                          {...field}
                          className="border-ring h-[116.284px] resize-none"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem className="space-y-1">
                      <FormLabel className="text-base leading-normal font-medium">
                        Service Charges
                      </FormLabel>
                      <FormControl>
                        <InputGroup {...field} className="border-ring h-10">
                          <InputGroupInput placeholder="Add Price" />
                          <InputGroupAddon align="inline-end">
                            <BadgeDollarSign
                              size={16}
                              strokeWidth={1.5}
                              className="size-6 text-[#90A1B9]"
                            />
                          </InputGroupAddon>
                        </InputGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="service_at"
                  render={({ field }) => (
                    <FormItem className="space-y-1">
                      <FormLabel className="text-base leading-normal font-medium">
                        Location :
                      </FormLabel>
                      <FormControl>
                        <Location field={field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="image"
                  render={({ field }) => (
                    <FormItem className="space-y-1">
                      <FormLabel className="text-primary bg-primary/10 hover:bg-primary/15 flex cursor-pointer flex-col items-center rounded-[14px] border p-5 text-base leading-normal font-medium transition-colors">
                        {field.value && (
                          <img
                            src={
                              field.value instanceof File
                                ? URL.createObjectURL(field.value)
                                : field.value || ""
                            }
                            className="size-16 rounded-lg"
                          />
                        )}
                        <CloudUpload className="size-9" />
                        <span className="text-sm leading-[18px] font-medium">
                          Upload Image(s)
                        </span>
                      </FormLabel>
                      <FormControl>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) =>
                            field.onChange(e.target.files?.[0] ?? null)
                          }
                          onBlur={field.onBlur}
                          name={field.name}
                          ref={field.ref}
                          className="border-ring hidden h-10"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  size={"lg"}
                  className="h-14 w-full cursor-pointer rounded-[17px]"
                  disabled={
                    form.formState.isSubmitting || !form.formState.isValid
                  }
                >
                  Add
                </Button>
              </div>
            </form>
          </Form>
        </div>
        <div className="grid flex-1 place-items-center max-sm:hidden">
          <Icon src="/images/undraw_contract_upwc.svg" />
        </div>
      </div>
    </section>
  );
}

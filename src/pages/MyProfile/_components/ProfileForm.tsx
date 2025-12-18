import useProfile from "./use-profile";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { Button } from "@/components/animate-ui/components/buttons/button";
import Icon from "@/components/Icon";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { useProfileQuery } from "@/store/api/authApi";
import type { IUser } from "@/types";

export default function ProfileForm() {
  const { data } = useProfileQuery();
  const user = data?.data || ({} as IUser);

  const { form, onSubmit } = useProfile();

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="mt-10 space-y-10">
        <FormField
          control={form.control}
          name="avatar"
          render={({ field }) => (
            <FormItem className="flex items-center justify-center gap-3">
              <Avatar className="size-[136px]">
                <AvatarImage
                  src={
                    field.value instanceof File
                      ? URL.createObjectURL(field.value)
                      : field.value || user.avatar || ""
                  }
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <FormLabel className="bg-primary w-fit cursor-pointer rounded-full px-4 py-2.5 text-sm font-semibold text-white">
                Upload Image
              </FormLabel>
              <FormControl>
                <Input
                  type="file"
                  name={field.name}
                  ref={field.ref}
                  onBlur={field.onBlur}
                  onChange={(event) => {
                    const file = event.target.files?.[0];
                    field.onChange(file);
                  }}
                  hidden
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="w-full flex-1">
              <FormLabel className="mb-[17px] font-bold text-[#384D6C]">
                Full Name
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="eg. Alaa"
                  {...field}
                  className="h-12 rounded-[8px] border-2 px-5 py-4 shadow-none placeholder:font-light placeholder:italic"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex flex-col items-center gap-[43px] lg:flex-row">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="w-full flex-1">
                <FormLabel className="mb-[17px] font-bold text-[#384D6C]">
                  Email Address
                </FormLabel>
                <FormControl>
                  <div className="relative">
                    <Icon
                      src="/icons/mail.svg"
                      className="absolute top-1/2 left-3 -translate-y-1/2 transform"
                    />
                    <Input
                      readOnly
                      placeholder="Your mail..."
                      {...field}
                      className="placeholder:text-muted-foreground h-12 rounded-[8px] border-2 py-4 pr-5 pl-10 shadow-none placeholder:font-light placeholder:italic"
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem className="w-full flex-1">
                <FormLabel className="mb-[17px] font-bold text-[#384D6C]">
                  Phone Number
                </FormLabel>
                <FormControl>
                  <div className="relative">
                    <Icon
                      src="/icons/phone.svg"
                      className="absolute top-1/2 left-3 -translate-y-1/2 transform"
                    />
                    <Input
                      placeholder="Number..."
                      {...field}
                      className="placeholder:text-muted-foreground h-12 rounded-[8px] border-2 py-4 pr-5 pl-10 shadow-none placeholder:font-light placeholder:italic"
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="about_me"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormLabel className="mb-[17px] font-bold text-[#384D6C]">
                About Me
              </FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Your about me..."
                  {...field}
                  className="placeholder:text-muted-foreground h-24 rounded-[8px] border-2 px-5 py-4 shadow-none placeholder:font-light placeholder:italic"
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
            <FormItem className="flex-1">
              <FormLabel className="mb-[17px] font-bold text-[#384D6C]">
                Description
              </FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Your description..."
                  {...field}
                  className="placeholder:text-muted-foreground h-24 rounded-[8px] border-2 px-5 py-4 shadow-none placeholder:font-light placeholder:italic"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="h-12 w-full max-w-xs flex-1 cursor-pointer rounded-full"
          disabled={form.formState.isSubmitting || !form.formState.isValid}
        >
          Save
        </Button>
      </form>
    </Form>
  );
}

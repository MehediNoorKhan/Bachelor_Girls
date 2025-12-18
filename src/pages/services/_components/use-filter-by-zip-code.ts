import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSearchParams } from "react-router";
import { z } from "zod";

const formSchema = z.object({
  zip_code: z.string().min(2, {
    message: "ZIP code must be at least 2 characters.",
  }),
});

export default function useFilterByZipCode() {
  const [searchParams, setSearchParams] = useSearchParams();

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      zip_code: "",
    },
  });

  const zip_code = form.watch("zip_code");

  useEffect(() => {
    if (!zip_code) {
      searchParams.delete("zip_code");
      setSearchParams(searchParams, { replace: true });
    }
  }, [zip_code, searchParams, setSearchParams]);

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    if (values.zip_code) {
      searchParams.set("zip_code", values.zip_code);
    } else {
      searchParams.delete("zip_code");
    }
    setSearchParams(searchParams);
  }

  return { form, onSubmit };
}

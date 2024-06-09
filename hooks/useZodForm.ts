import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export const useZodForm = <T extends z.ZodType>(
  schema: T,
  defaultValues?: z.infer<T>,
  resetOnMount?: boolean,
) => {
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues,
  });

  useEffect(() => {
    if (resetOnMount) {
      form.reset(defaultValues);
    }
  }, [defaultValues, resetOnMount]);

  return form;
};

export type UseZodFormReturn<T extends z.ZodType> = ReturnType<
  typeof useZodForm<T>
>;

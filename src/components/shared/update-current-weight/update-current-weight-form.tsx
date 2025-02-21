import { updateCurrentWeight } from "@/actions/profile";
import { Button } from "@/components/ui/button";
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
  updateWeightDefault,
  updateWeightSchema,
  updateWeightType,
} from "@/schemas/update-current-weight-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { AiOutlineLoading } from "react-icons/ai";

export function UpdateCurrentWeightForm() {
  const router = useRouter();
  const form = useForm<updateWeightType>({
    resolver: zodResolver(updateWeightSchema),
    defaultValues: updateWeightDefault,
  });

  const { mutateAsync, isPending } = useMutation({
    mutationFn: updateCurrentWeight,
  });

  const onSubmit = async (values: updateWeightType) => {
    const body = {
      weight: parseFloat(values.weight),
    };
    const data = await mutateAsync(body);
    router.refresh();
    if (data.error) return;
  };
  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
          <FormField
            control={form.control}
            name="weight"
            render={({ field }) => (
              <FormItem className="space-y-0">
                <FormLabel className="text-2xl font-semibold">Weight</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      step={"0.1"}
                      inputMode="numeric"
                      min={30}
                      max={300}
                      placeholder="70"
                      type="number"
                      {...field}
                      className="pr-16 text-base"
                    />
                    <Button
                      type="button"
                      variant={"ghost"}
                      className="absolute bottom-0 right-0"
                    >
                      kg
                    </Button>
                  </div>
                </FormControl>
                <FormMessage className="text-base" />
              </FormItem>
            )}
          />
          <Button
            disabled={isPending}
            type="submit"
            className="group w-full text-xl font-bold transition-all"
          >
            {isPending ? (
              <AiOutlineLoading className="animate-spin" />
            ) : (
              "SUBMIT"
            )}
          </Button>
        </form>
      </Form>
    </>
  );
}

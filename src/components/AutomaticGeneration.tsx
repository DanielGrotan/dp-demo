import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useConfigStore } from "@/lib/store";
import { getRandomInteger } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const FormSchema = z.object({
  amountOfNumbers: z
    .string()
    .regex(/^[1-9][0-9]*$/, "You must enter a positive number"),
  turnsBeforeSwap: z
    .string()
    .regex(/^[1-9][0-9]*$/, "You must enter a positive number"),
});

export function AutomaticGeneration() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      amountOfNumbers: "1",
      turnsBeforeSwap: "1",
    },
  });

  const setConfig = useConfigStore((state) => state.setConfig);

  function onSubmit(data: z.infer<typeof FormSchema>) {
    const amountOfNumbers = parseInt(data.amountOfNumbers);
    const turnsBeforeSwap = parseInt(data.turnsBeforeSwap);

    const numbers = new Array(amountOfNumbers)
      .fill(0)
      .map(() => getRandomInteger(-1000000, 1000000));

    console.log(numbers);

    setConfig(numbers, turnsBeforeSwap);
  }

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="flex space-x-6">
            <FormField
              control={form.control}
              name="amountOfNumbers"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Amount of numbers</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                  <FormDescription>
                    The amount of numbers that the game will generate
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="turnsBeforeSwap"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Turns before swap</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                  <FormDescription>
                    The amount of times that a player can chose a number before
                    swapping turns
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  );
}

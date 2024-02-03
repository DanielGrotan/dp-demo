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
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const FormSchema = z.object({
  numbers: z.string().regex(/^-?[1-9][0-9]*(, -?[1-9][0-9]*)*$/),
  turnsBeforeSwap: z.string().regex(/^[1-9][0-9]*$/),
});

export function ManualGeneration() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      numbers: "1, 2, 3",
      turnsBeforeSwap: "1",
    },
  });

  const setConfig = useConfigStore((state) => state.setConfig);

  function onSubmit(data: z.infer<typeof FormSchema>) {
    const numbers = data.numbers.split(", ").map((value) => parseInt(value));
    const turnsBeforeSwap = parseInt(data.turnsBeforeSwap);

    setConfig(numbers, turnsBeforeSwap);
  }

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="flex space-x-6">
            <FormField
              control={form.control}
              name="numbers"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Numbers</FormLabel>
                  <FormControl>
                    <Input type="text" {...field} />
                  </FormControl>
                  <FormDescription>
                    The numbers used in the game separated by a {"', '"}
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
                    <Input type="text" {...field} />
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

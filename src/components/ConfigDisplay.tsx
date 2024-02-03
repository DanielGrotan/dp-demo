"use client";

import { useConfigStore } from "@/lib/store";

export function ConfigDisplay() {
  const numbers = useConfigStore((state) => state.numbers);
  const turnsBeforeSwap = useConfigStore((state) => state.turnsBeforeSwap);

  return (
    <div className="pt-4 flex space-x-6">
      <div className="flex-1">
        <p>Chosen numbers:</p>
        {numbers.length ? (
          <p className="font-bold">{numbers.join(", ")}</p>
        ) : (
          <p className="font-bold">No numbers chosen yet</p>
        )}
      </div>
      <div className="flex-1">
        <p>Turns before swap:</p>
        <p className="font-bold">{turnsBeforeSwap}</p>
      </div>
    </div>
  );
}

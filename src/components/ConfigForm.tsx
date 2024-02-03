"use client";

import { AutomaticGeneration } from "@/components/AutomaticGeneration";
import { InputMode } from "@/components/InputMode";
import { ManualGeneration } from "@/components/ManualGeneration";
import { useState } from "react";

export function ConfigForm() {
  const [inputMode, setInputMode] = useState("automatic");

  return (
    <div className="grid grid-cols-2 justify-between">
      <InputMode value={inputMode} onChange={setInputMode} />
      {inputMode == "automatic" && <AutomaticGeneration />}
      {inputMode == "manual" && <ManualGeneration />}
    </div>
  );
}

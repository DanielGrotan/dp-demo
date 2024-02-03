"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Visualization } from "./Visualization";

export function DPDemo() {
  const [visualizationTrigger, setVisualizationTrigger] = useState(true);

  function onClick() {
    setVisualizationTrigger((prev) => !prev);
  }

  return (
    <div className="pt-4">
      <Button onClick={onClick}>Start visualization</Button>
      <Visualization visualizationTrigger={visualizationTrigger} />
    </div>
  );
}

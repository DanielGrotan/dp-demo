"use client";

import { Slider } from "@/components/ui/slider";
import { useConfigStore } from "@/lib/store";

export function VisualizationTimeSlider() {
  const visualizationInterval = useConfigStore(
    (state) => state.visualizationIntervalMS
  );
  const setVisualizationInterval = useConfigStore(
    (state) => state.setVisualizationInterval
  );

  return (
    <div className="flex flex-col justify-center gap-2 flex-1">
      <p>Visualization Time Interval (milliseconds): {visualizationInterval}</p>
      <Slider
        defaultValue={[1000]}
        max={10000}
        min={400}
        step={1}
        onValueChange={(value) => setVisualizationInterval(value[0])}
      />
    </div>
  );
}

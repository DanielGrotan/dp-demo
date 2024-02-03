import { ConfigDisplay } from "@/components/ConfigDisplay";
import { ConfigForm } from "@/components/ConfigForm";
import { DPDemo } from "@/components/DPDemo";
import { VisualizationTimeSlider } from "@/components/VisualizationTimeSlider";

export default function HomePage() {
  return (
    <main className="container py-4">
      <h1 className="text-2xl">Dynamic programming demo</h1>
      <ConfigForm />
      <div className="flex gap-4">
        <ConfigDisplay />
        <VisualizationTimeSlider />
      </div>
      <DPDemo />
    </main>
  );
}

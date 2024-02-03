import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export type InputModeProps = {
  value: string;
  onChange: (value: string) => void;
};

export function InputMode({ value, onChange }: InputModeProps) {
  return (
    <div>
      <p>Input type:</p>
      <RadioGroup defaultValue={value} onValueChange={onChange}>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="automatic" id="r1" />
          <Label htmlFor="r1">Automatic</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="manual" id="r2" />
          <Label htmlFor="r2">Manual</Label>
        </div>
      </RadioGroup>
    </div>
  );
}

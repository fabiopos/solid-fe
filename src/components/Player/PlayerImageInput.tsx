import { Input } from "../ui/input";
import { Variant } from "@/types/types.common";
import { Label } from "../ui/label";


interface IFileInputProps {
  label: string;
  name: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  variant?: Variant;
}

export default function PlayerFileInput({
  label,
  name,
  onChange,
  variant,
}: IFileInputProps) {
  return (
    <div className="border border-slate-300 bg-white flex justify-center my-2">
      <Label htmlFor={name} className="dark:text-slate-800 font-bold p-2">{label}</Label>      
      <Input
        type="file"
        placeholder="Seleccione"
        name={name}
        id={name}
        className="hidden border border-olive-shade hover:bg-primary-body hover:text-white"
        onChange={onChange}
      />
    </div>
  );
}

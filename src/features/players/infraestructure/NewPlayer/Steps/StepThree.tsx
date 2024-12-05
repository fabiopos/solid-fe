import { Label } from "@/components/ui/label";
import { FlagComponent } from "@/components/ui/phone-input";
import { useNewPlayerStore } from "@/context/NewPlayerCtx";
import { format } from "date-fns";
import { Country } from "react-phone-number-input";
import ValidationAlert from "../Validation/ValidationAlert";

function StepThree() {
  const {
    firstName,
    lastName,
    email,
    documentNumber,
    documentType,
    birthDate,
    nameOnShirt,
    numberOnShirt,
    weight,
    height,
    healthProvider,
    riskInsurance,
    shirtSize,
    favPosition,
    city,
    phone,
    country,
  } = useNewPlayerStore((state) => state);
  return (
    <div className="space-y-2 border border-slate-300 rounded-md p-5">
      <div className="flex flex-col">
        <h2 className="text-xl font-bold uppercase flex gap-2 items-center">
          <FlagComponent countryName="" country={country as Country} />{" "}
          {favPosition} - {`${firstName} ${lastName}`}
        </h2>
        <span className="text-sm text-slate-400 lowercase">{email}</span>
      </div>

      <div className="grid grid-cols-[repeat(2,_minmax(100px,_1fr))] items-center justify-start mt-5">
        <Label className="dark:text-slate-400 text-right text-lg pr-2">
          ID
        </Label>
        <span className="text-slate-800">{`${documentType} ${documentNumber}`}</span>

        <Label className="dark:text-slate-400 text-right text-lg pr-2">
          Birth Date
        </Label>
        <span className="text-slate-800">
          {birthDate && format(birthDate, "PPP")}
        </span>

        <Label className="dark:text-slate-400 text-right text-lg pr-2">
          Shirt
        </Label>
        <span className="text-slate-800">
          <span className="uppercase">{nameOnShirt}</span> - Size {shirtSize} -{" "}
          {numberOnShirt}
        </span>

        <Label className="dark:text-slate-400 text-right text-lg pr-2">
          Weight
        </Label>
        <span className="text-slate-800">{weight}kg</span>

        <Label className="dark:text-slate-400 text-right text-lg pr-2">
          Height
        </Label>
        <span className="text-slate-800">{height}cm</span>

        <Label className="dark:text-slate-400 text-right text-lg pr-2">
          Country
        </Label>
        <span className="text-slate-800">{country}</span>

        <Label className="dark:text-slate-400 text-right text-lg pr-2">
          Region
        </Label>
        <span className="text-slate-800">{city}</span>

        <Label className="dark:text-slate-400 text-right text-lg pr-2">
          Phone
        </Label>
        <span className="text-slate-800">{phone}</span>

        <Label className="dark:text-slate-400 text-right text-lg pr-2">
          H.P
        </Label>
        <span className="text-slate-800">{healthProvider ?? "-"}</span>

        <Label className="dark:text-slate-400 text-right text-lg pr-2">
          R.P
        </Label>
        <span className="text-slate-800">{riskInsurance ?? "-"}</span>
      </div>

      <div className="my-5 p-5">
        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Accusamus,
          asperiores?
        </p>
      </div>

      <ValidationAlert />
    </div>
  );
}

export default StepThree;

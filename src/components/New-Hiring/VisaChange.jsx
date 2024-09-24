import React, { useState } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import Label from "../ui/Label";
import Input from "../ui/Input";

const VisaChange = () => {
  const [visaChangeSelected, setVisaChangeSelected] = useState("No");

  return (
    <div className="p-4 rounded-lg border border-[#C3D0D4] bg-[#FFFBFA] flex flex-col gap-4">
      <div>Visa Change Amount?</div>
      <div>
        <RadioGroup
          value={visaChangeSelected}
          onValueChange={(value) => setVisaChangeSelected(value)}
          className="grid grid-cols-2 gap-3"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem
              value="Yes"
              id="visaChangeYes"
              className="border-[#031D92] border-2 text-[#031D92]"
            />
            <Label
              htmlFor="visaChangeYes"
              label="Yes"
              className="font-bold"
            ></Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem
              value="No"
              id="visaChangeNo"
              className="border-[#031D92] border-2 text-[#031D92]"
            />
            <Label
              htmlFor="visaChangeNo"
              label="No"
              className="font-bold"
            ></Label>
          </div>
        </RadioGroup>
      </div>

      {visaChangeSelected === "Yes" && (
        <div className="flex flex-col gap-1">
          <Label label="Amount" htmlFor="visaChangeAmount" />
          <Input
            placeholder="Visa Change Amount"
            name="visaChangeAmount"
            id="visaChangeAmount"
            type="number"
          />
        </div>
      )}
    </div>
  );
};

export default VisaChange;

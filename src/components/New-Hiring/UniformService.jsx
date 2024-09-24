import React, { useState } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import Label from "../ui/Label";
import Input from "../ui/Input";

const UniformServiceAmount = () => {
  const [uniformServiceSelected, setUniformServiceSelected] = useState("No");

  return (
    <div className="p-4 rounded-lg border border-[#C3D0D4] bg-[#FFFBFA] flex flex-col gap-4">
      <div>Uniform Service Include?</div>
      <div>
        <RadioGroup
          value={uniformServiceSelected}
          onValueChange={(value) => setUniformServiceSelected(value)}
          className="grid grid-cols-2 gap-3"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem
              value="Yes"
              id="uniformServiceYes"
              className="border-[#031D92] border-2 text-[#031D92]"
            />
            <Label
              htmlFor="uniformServiceYes"
              label="Yes"
              className="font-bold"
            ></Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem
              value="No"
              id="uniformServiceNo"
              className="border-[#031D92] border-2 text-[#031D92]"
            />
            <Label
              htmlFor="uniformServiceNo"
              label="No"
              className="font-bold"
            ></Label>
          </div>
        </RadioGroup>
      </div>

      {uniformServiceSelected === "Yes" && (
        <div className="flex flex-col gap-1">
          <Label label="Amount" htmlFor="uniformAmount" />
          <Input
            placeholder="Uniform Service Amount"
            name="uniformAmount"
            id="uniformAmount"
            type="number"
          />
        </div>
      )}
    </div>
  );
};

export default UniformServiceAmount;

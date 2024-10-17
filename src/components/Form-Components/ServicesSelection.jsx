import React, { useState } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import Label from "@/components/ui/Label";
import Input from "@/components/ui/Input";

const ServicesSelection = () => {
  const [selectedServices, setSelectedServices] = useState({
    a2aFullPackage: false,
    medical: false,
    a2aTicket: false,
    visaChange: false,
    uniform: false,
    other: false,
  });

  const handleServiceChange = (service, value) => {
    let newSelectedServices = {
      ...selectedServices,
      [service]: value === "Yes",
    };

    if (service === "a2aFullPackage" && value === "Yes") {
      newSelectedServices = {
        a2aFullPackage: true,
        medical: false,
        a2aTicket: false,
        visaChange: false,
        uniform: false,
        other: false,
      };
    }

    setSelectedServices(newSelectedServices);
  };

  const renderServiceOption = (service, label) => (
    <div className="p-4 rounded-lg border border-[#C3D0D4] bg-[#FFFBFA] flex flex-col gap-4">
      <div>{label}?</div>
      <RadioGroup
        value={selectedServices[service] ? "Yes" : "No"}
        onValueChange={(value) => handleServiceChange(service, value)}
        className="grid grid-cols-2 gap-3"
      >
        <div className="flex items-center space-x-2">
          <RadioGroupItem
            value="Yes"
            id={`${service}Yes`}
            className="border-[#031D92] border-2 text-[#031D92]"
            disabled={
              service !== "a2aFullPackage" && selectedServices.a2aFullPackage
            }
          />
          <Label htmlFor={`${service}Yes`} label="Yes" className="font-bold" />
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem
            value="No"
            id={`${service}No`}
            className="border-[#031D92] border-2 text-[#031D92]"
            disabled={
              service !== "a2aFullPackage" && selectedServices.a2aFullPackage
            }
          />
          <Label htmlFor={`${service}No`} label="No" className="font-bold" />
        </div>
      </RadioGroup>

      {selectedServices[service] && (
        <div className="flex flex-col gap-1">
          <Label label="Amount" htmlFor={`${service}Amount`} />
          <Input
            placeholder={`${label} Amount`}
            name={`${service}Amount`}
            id={`${service}Amount`}
            type="number"
          />
        </div>
      )}
    </div>
  );

  return (
    <div className="space-y-4">
      {renderServiceOption("a2aFullPackage", "A2A Full Package")}
      {renderServiceOption("medical", "Medical")}
      {renderServiceOption("a2aTicket", "A2A Ticket")}
      {renderServiceOption("visaChange", "Visa")}
      {renderServiceOption("uniform", "Uniform")}
    </div>
  );
};

export default ServicesSelection;

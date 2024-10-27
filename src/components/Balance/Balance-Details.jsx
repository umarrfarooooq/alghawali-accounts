import React from "react";
import Label from "../ui/Label";
import Input from "../ui/Input";

const BalanceDetails = ({ data }) => {
  return (
    <div className="bg-[#FFFBFA] border border-[#EBEBEB] w-full lg:max-w-[38rem] lg:min-w-[38rem] mx-auto p-3 sm:p-8 rounded-2xl">
      <div className="bg-[#F2F5FF] rounded-lg p-3 sm:p-8 flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <Label label="Cash" htmlFor="Cash" />
          <Input
            id="Cash"
            value={data?.remaining?.Cash}
            readOnly={true}
            className="text-gray-600"
          />
        </div>
        <div className="flex flex-col gap-1">
          <Label label="Cheque" htmlFor="Cheque" />
          <Input
            id="Cheque"
            value={data?.remaining?.Cheque}
            readOnly={true}
            className="text-gray-600"
          />
        </div>
        <div className="flex flex-col gap-1">
          <Label label="Bank (Total)" htmlFor="BankTotal" />
          <Input
            id="BankTotal"
            value={data?.remaining?.Bank?.totalAmount}
            readOnly={true}
            className="text-gray-600"
          />
        </div>
        {data?.remaining?.Bank?.details &&
          Object.entries(data.remaining.Bank.details).map(
            ([bankName, amount]) => (
              <div key={bankName} className="flex flex-col gap-1">
                <Label
                  label={`Bank (${bankName})`}
                  htmlFor={`Bank_${bankName}`}
                />
                <Input
                  id={`Bank_${bankName}`}
                  value={amount}
                  readOnly={true}
                  className="text-gray-600"
                />
              </div>
            )
          )}
      </div>
    </div>
  );
};

export default BalanceDetails;

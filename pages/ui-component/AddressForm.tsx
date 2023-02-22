import { Button, InputField } from "@frontierwallet/front-ui";
import axios from "axios";
import React, { useState } from "react";
import { FC } from "react";

// import { toastFlashMessage } from "../../utils";
import { toast } from "react-toastify";

interface IInputClass {
  inputClassName?: string;
}

export interface IAddressForm {
  submitForm: () => void;
  handleAddress: (address: string) => void;
  formData: any;
}

export const AddressForm: FC<IAddressForm> = (props) => {
  const { submitForm, handleAddress, formData } = props;
  return (
    <form
      className={`relative mx-10`}
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        submitForm();
      }}
    >
      <p className="text-lg text-left">
        Search token approvals with your token address:
      </p>
      <div className="flex mt-5">
        <InputField
          type="text"
          name="text"
          placeholder="Address"
          className={` ring-gray-200 p-2 !mb-0 !w-[800px] hover:ring-1 focus:outline-black focus:bg-greyBg !text-black bg-white rounded-sm`}
          value={formData.address}
          onChange={(e) => {
            handleAddress(e.target.value);
          }}
        />
        <Button
          className="border border-black p-2 mb-5 ml-3"
          disabled={formData.loader ? true : false}
        >
          {formData.loader ? "Searching..." : "Search"}
        </Button>
      </div>
    </form>
  );
};

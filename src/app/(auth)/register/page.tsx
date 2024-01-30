"use client";
import React from "react";
import PersonalInfoForm from "@/app/account/components/PersonalInfoForm";

const Registration = () => {
  // const session = useSession();
  return (
    <div className="w-full h-full">
      <div className="flex flex-col gap-5">
        {/* <h1 className="text-3xl text-center font-semibold text-gray-700">
          Create account
        </h1> */}
        <PersonalInfoForm />
      </div>
    </div>
  );
};

export default Registration;

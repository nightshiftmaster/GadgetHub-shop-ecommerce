"use client";
import React from "react";
import PersonalInfoForm from "@/app/account/components/PersonalInfoForm";

const Registration = () => {
  return (
    <div className="w-full h-full">
      <div className="flex flex-col gap-5">
        <PersonalInfoForm />
      </div>
    </div>
  );
};

export default Registration;

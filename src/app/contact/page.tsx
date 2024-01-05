"use client";
import React from "react";
import { FormEvent } from "react";
import Image from "next/image";
import { useState } from "react";
import { useRef } from "react";
import { BASE_API_URL } from "@/utils/constants";

// export const metadata = {
//   title: "Contact Information",
//   description: "This is contact page",
// };

const Contacts = () => {
  const [sucess, setSucess] = useState("");
  const [errors, setError] = useState("");
  const [disable, setDisable] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setDisable(true);
      if (!formData.name) {
        throw new Error("Please fill the form !");
      }
      const response = await fetch(`${BASE_API_URL}/api/email`, {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response) {
        setError("");
        setSucess("Email sent successfully!");
        formRef.current?.reset();
        setDisable(false);
      } else {
        setError("Email sending failed. Please try again later.");
      }
    } catch (error: any) {
      setError(error.message);
    }
  };

  return (
    <div
      className="h-screen w-full gap-6 flex-col flex md:text-base text-sm justify-center items-center bg-pink-50"
      data-testid="contact"
    >
      <div className="">
        <h1 className="font-bold md:text-3xl text-2xl">
          Let&apos;s Keep in Touch
        </h1>
      </div>
      <h3 className="">{sucess ? sucess : null}</h3>
      <h3 className="">{errors ? errors : null}</h3>

      <form
        ref={formRef}
        onSubmit={handleSubmit}
        data-testid="form"
        className="flex flex-col gap-10 md:w-1/2 w-2/3"
      >
        <input
          type="text"
          placeholder="name"
          className=" ring-1 p-3 rounded-md"
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="email"
          className=" ring-1 p-3 rounded-md"
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
        <textarea
          className="p-3  ring-1 rounded-md"
          name=""
          id=""
          cols={30}
          rows={10}
          placeholder="message"
          onChange={(e) =>
            setFormData({ ...formData, message: e.target.value })
          }
        />
        <button
          disabled={disable}
          type="submit"
          className="text-white uppercase whitespace-nowrap p-3 text-xs lg:p-3 lg:px-10 text-center lg:text-base  rounded-md bg-fuchsia-400   hover:scale-110 transition-all duration-500"
        >
          Send Message
        </button>
      </form>
    </div>
  );
};

export default Contacts;

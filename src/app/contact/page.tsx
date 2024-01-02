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
    <div className="h-screen w-full bg-pink-50" data-testid="contact">
      <div className="">
        <h1 className="">Let&apos;s Keep in Touch</h1>
      </div>
      <h3 className="">{sucess ? sucess : null}</h3>
      <h3 className="">{errors ? errors : null}</h3>

      <div className="flex flex-col">
        <div className="">
          <Image className="" fill={true} src="" alt="contact image" />
        </div>
        <form
          ref={formRef}
          className=""
          onSubmit={handleSubmit}
          data-testid="form"
        >
          <input
            type="text"
            placeholder="name"
            className=""
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
          <input
            type="text"
            placeholder="email"
            className=""
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />
          <textarea
            className=""
            name=""
            id=""
            cols={30}
            rows={10}
            placeholder="message"
            onChange={(e) =>
              setFormData({ ...formData, message: e.target.value })
            }
          />
          <button disabled={disable} type="submit" className="">
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contacts;

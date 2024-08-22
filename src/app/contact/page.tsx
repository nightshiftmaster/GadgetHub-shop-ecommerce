"use client";
import React from "react";
import Link from "next/link";
import { useState } from "react";
import { BASE_API_URL } from "@/utils/constants";
import { useFormik } from "formik";
import * as Yup from "yup";

const Contacts = () => {
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [disable, setDisable] = useState(false);

  const validationSchema = Yup.object({
    name: Yup.string().required("↑ Please fill the name field"),
    email: Yup.string()
      .email("↑ Invalid email address")
      .required("↑ Email is required"),
    message: Yup.string().required("↑ Message is required"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      message: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        setDisable(true);

        const response = await fetch(`${BASE_API_URL}/api/contact`, {
          method: "POST",
          mode: "no-cors",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        });

        if (response) {
          setError("");
          setSuccess("Email sent successfully!");
          resetForm();
        } else {
          setError("Email sending failed. Please try again later.");
        }
      } catch (error: any) {
        setError(error.message);
      } finally {
        setDisable(false);
      }
    },
  });

  return (
    <div
      className="h-screen w-full  flex  justify-center items-center bg-gray-50"
      data-testid="contact"
    >
      <div className="md:h-[90vh]  gap-5 md:text-base text-sm h-full bg-white shadow-xl rounded-xl  text-center flex items-center justify-center flex-col xl:w-[80vh] w-full ">
        <div>
          <h1 className="font-bold text-gray-700 md:text-3xl text-2xl">
            Let&apos;s Keep in Touch
          </h1>
        </div>
        <h3 className="text-blue-500">{success ? success : null}</h3>
        <h3 className="text-red-500">{error ? error : null}</h3>

        <form
          onSubmit={formik.handleSubmit}
          className="flex flex-col xl:text-base md:text-sm text-sm first-line:md:gap-20 gap-10 md:w-1/2 w-2/3 justify-center "
        >
          <div className="flex flex-col gap-4">
            <input
              type="text"
              placeholder="name"
              className={`ring-1  w-full ${
                formik.touched.name && formik.errors.name
                  ? "ring-1 ring-red-500 "
                  : " ring-1"
              } p-3 rounded-md  focus:outline-blue-500`}
              {...formik.getFieldProps("name")}
            />
            {formik.touched.name && formik.errors.name ? (
              <div className="text-red-500">{formik.errors.name}</div>
            ) : null}
          </div>

          <div className="flex flex-col gap-4">
            <input
              type="text"
              placeholder="email"
              className={`ring-1 ${
                formik.touched.email && formik.errors.email
                  ? "ring-1 ring-red-500 "
                  : " ring-1"
              } p-3 rounded-md  focus:outline-blue-500`}
              {...formik.getFieldProps("email")}
            />
            {formik.touched.email && formik.errors.email ? (
              <div className="text-red-500">{formik.errors.email}</div>
            ) : null}
          </div>

          <div className="flex flex-col gap-4">
            <textarea
              className={`ring-1 ${
                formik.touched.message && formik.errors.message
                  ? "ring-1 ring-red-500 "
                  : " ring-1"
              } p-3 rounded-md focus:outline-blue-500`}
              id="message"
              placeholder="message"
              {...formik.getFieldProps("message")}
            />
            {formik.touched.message && formik.errors.message ? (
              <div className="text-red-500">{formik.errors.message}</div>
            ) : null}
          </div>

          <button
            disabled={disable}
            type="submit"
            className="text-white uppercase whitespace-nowrap p-3 text-xs lg:p-3 lg:px-10 text-center lg:text-base rounded-xl bg-fuchsia-400 hover:scale-110 transition-all duration-500"
          >
            <p>Send Message</p>
          </button>
        </form>
        <Link
          href={`${BASE_API_URL}/products`}
          className="text-gray-500  md:text-sm text-xs"
        >{`<< Back to Shopping`}</Link>
      </div>
    </div>
  );
};

export default Contacts;

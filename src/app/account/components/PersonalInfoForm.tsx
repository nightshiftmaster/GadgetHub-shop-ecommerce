"use client";
import userSlice from "@/redux/features/userSlice";
import { Formik, Form, Field } from "formik";
import React, { ChangeEvent, useEffect, useState } from "react";
import DatePickerValue from "./DatePicker";
import { VscAccount } from "react-icons/vsc";
import { useSession } from "next-auth/react";
import { MdOutlineAddAPhoto } from "react-icons/md";
import { useRouter } from "next/navigation";
import { BASE_API_URL } from "@/utils/constants";
import useSWR from "swr";
import { toast } from "react-toastify";
import Loading from "@/components/Loader";
import ProfileAvatar from "./ProfileAvatar";

const PersonalInfoForm = () => {
  const [err, setErr] = useState("");
  const [tumbnail, setTumbnail] = useState("");
  const router = useRouter();
  const session = useSession();

  useEffect(() => {
    setTumbnail(tumbnail);
  }, [tumbnail]);

  const fetcher = (...args: Parameters<typeof fetch>) =>
    fetch(...args).then((res) => res.json());

  const { data, isLoading } = useSWR(
    `${BASE_API_URL}/api/user?email=${session?.data?.user?.email}`,
    fetcher
  );

  if (isLoading) {
    return <Loading />;
  }

  const user = data[0];

  return (
    <div className="flex w-full h-fit justify-center mt-10  mb-5 ">
      <Formik
        initialValues={{
          img: user?.img || session.data?.user?.image,
          firstName: user?.firstName || session.data?.user?.name,
          lastName: user?.lastName,
          dateOfBirth: user?.dateOfBirth,
          email: user?.email || session.data?.user?.email,
          mobileNumber: user?.mobileNumber,
          country: user?.country,
          city: user?.city,
          address: user?.address,
          password: "*********",
        }}
        onSubmit={async (values) => {
          {
            try {
              const res = await fetch(`${BASE_API_URL}/api/auth/register`, {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(values),
              });

              res.status === 201 &&
                router.push("/login?succes=Account has been created");
              toast.success("Congratulations! User created successfully!", {
                theme: "light",
              });
            } catch (err: any) {
              setErr(err);
            }
          }
        }}
      >
        {({ errors, touched, values, handleChange, setFieldValue }) => {
          return (
            <div className="flex w-full flex-col justify-center items-center  gap-5">
              <ProfileAvatar tumbnail={tumbnail} setTumbnail={setTumbnail} />
              <Form className="flex flex-col md:gap-10 gap-10 justify-center items-center w-full md:w-[95vh]">
                <div className="flex justify-center items-center flex-col gap-4 w-full">
                  <div className="flex  gap-3 w-full flex-col  justify-center items-center">
                    <label htmlFor="file" className="">
                      <MdOutlineAddAPhoto size={30} />
                    </label>
                    <input
                      className="opacity-0 absolute"
                      data-testid="avatar-upload"
                      id="img"
                      type="file"
                      accept="image"
                      name="img"
                      onChange={(e: ChangeEvent<HTMLInputElement>) => {
                        let reader = new FileReader();
                        const selectedFile = e.target.files![0];
                        reader.readAsDataURL(selectedFile);
                        reader.onload = () => {
                          setFieldValue("img", reader.result);
                          setTumbnail(reader.result as string);
                        };
                      }}
                    />
                  </div>
                  <div className="flex gap-5 justify-center font-light w-full md:w-[70%] px-10 md:px-0">
                    <div className="flex flex-col gap-3 w-1/2 ">
                      <label htmlFor="firstName">First Name</label>
                      <Field
                        name="firstName"
                        className="p-3 rounded-md ring-1"
                        value={values.firstName}
                      />
                    </div>
                    <div className="flex flex-col gap-3 w-1/2 ">
                      <label htmlFor="lastName">Last Name</label>
                      <Field
                        name="lastName"
                        className="p-3 rounded-md ring-1"
                      />
                    </div>
                  </div>
                  <div className="flex w-full md:px-0 px-8 flex-col gap-4 font-light md:w-[70%]">
                    <label htmlFor="dateOfBirth"></label>
                    <DatePickerValue
                      name="dateOfBirth"
                      setFieldValue={setFieldValue}
                    />
                  </div>
                  <div className="flex w-full md:px-0 px-8 flex-col gap-4 font-light md:w-[70%]">
                    <label htmlFor="email">Email address</label>
                    <Field name="email" className="p-3 rounded-md ring-1" />
                  </div>
                  <div className="flex w-full md:px-0 px-8 flex-col gap-4 font-light md:w-[70%]">
                    <label htmlFor="mobileNumber">Mobile number</label>
                    <Field
                      name="mobileNumber"
                      className="p-3 rounded-md ring-1"
                    />
                  </div>
                  <div className="flex w-full md:px-0 px-8 flex-col gap-4 font-light md:w-[70%]">
                    <label htmlFor="country">Country</label>
                    <Field name="country" className="p-3 rounded-md ring-1" />
                  </div>
                  <div className="flex w-full md:px-0 px-8 flex-col gap-4 font-light md:w-[70%]">
                    <label htmlFor="country">City</label>
                    <Field name="city" className="p-3 rounded-md ring-1" />
                  </div>
                  <div className="flex w-full md:px-0 px-8 flex-col gap-4 font-light md:w-[70%]">
                    <label htmlFor="country">Address</label>
                    <Field name="address" className="p-3 rounded-md ring-1" />
                  </div>
                  <div className="flex w-full md:px-0 px-8 flex-col gap-4 font-light md:w-[70%]">
                    <label htmlFor="country">Password</label>
                    <Field name="password" className="p-3 rounded-md ring-1" />
                  </div>
                </div>
                <button
                  className="uppercase md:p-3  text-xs md:text-base p-2  text-white bg-fuchsia-400 w-1/3"
                  type="submit"
                >
                  Submit
                </button>
              </Form>
            </div>
          );
        }}
      </Formik>
      {/* </div> */}
    </div>
  );
};

export default PersonalInfoForm;

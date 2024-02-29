"use client";
import { Formik, Form, Field } from "formik";
import React, { ChangeEvent, useEffect, useState } from "react";
import DatePickerValue from "./DatePicker";
import { useSession } from "next-auth/react";
import { MdOutlineAddAPhoto } from "react-icons/md";
import { useRouter } from "next/navigation";
import { BASE_API_URL } from "@/utils/constants";
import useSWR from "swr";
import { toast } from "react-toastify";
import Loading from "@/components/Loader";
import ProfileAvatar from "./ProfileAvatar";
import { fetcher } from "@/utils/fetcherSwr";
import * as Yup from "yup";
import { Oval } from "react-loader-spinner";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import CountrySelect from "@/components/CountrySelect";

const PersonalDataSchema = Yup.object().shape({
  firstName: Yup.string().required("Please fill out this field"),
  lastName: Yup.string().required("Please fill out this field"),
  mobileNumber: Yup.number()
    .typeError("invalid mobile number")
    .required("Please fill out this field"),
  email: Yup.string()
    .email("Invalid email")
    .required("Please fill out this field"),
  address: Yup.string().required("Please fill out this field"),
  city: Yup.string().required("Please fill out this field"),
  country: Yup.string().required("Please fill out this field"),
  password: Yup.string()
    .required("Please fill out this field")
    .min(6, "Password is too short - should be 8 chars minimum."),
});

const PersonalInfoForm = () => {
  const [err, setErr] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [passwordShown, setPasswordShown] = useState(false);
  const router = useRouter();
  const session = useSession();

  useEffect(() => {
    setThumbnail(thumbnail);
  }, [thumbnail]);

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
          password: "",
        }}
        validationSchema={PersonalDataSchema}
        onSubmit={async (values) => {
          {
            try {
              const res = await fetch(`/api/auth/register`, {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(values),
              });

              if (res.status === 201) {
                router.push("/login?succes=Account has been created");
                toast.success("Congratulations! User created successfully!", {
                  theme: "light",
                });
              }
              throw new Error("User already exists !");
            } catch (err: any) {
              console.log(err.message);
              setErr(err.message);
            }
          }
        }}
      >
        {({
          errors,
          touched,
          values,
          handleChange,
          setFieldValue,
          isSubmitting,
        }) => {
          return (
            <div className="flex w-full flex-col justify-center items-center  gap-5">
              <div className="text-red-400 text-2xl font-semibold">{err}</div>
              <ProfileAvatar thumbnail={thumbnail} setThumbnail={setThumbnail} />
              <Form className="flex flex-col md:gap-10 xl:text-base md:text-sm text-sm gap-7 justify-center items-center w-full md:w-[95vh]">
                <div className="flex justify-center items-center flex-col gap-4 w-full">
                  <div className="flex  gap-3 w-full flex-col  justify-center items-center">
                    <label htmlFor="file" className="">
                      <MdOutlineAddAPhoto size={30} />
                    </label>
                    <input
                      className="opacity-0 absolute cursor-pointer"
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
                            void setFieldValue("img", reader.result);
                          setThumbnail(reader.result as string);
                        };
                      }}
                    />
                  </div>
                  <div className="flex gap-5 justify-center font-light w-full md:w-[70%] px-10 md:px-0">
                    <div className="flex flex-col gap-3 w-1/2 ">
                      <label htmlFor="firstName">First Name</label>
                      <Field
                        name="firstName"
                        className={`p-3 rounded-md ${
                          errors.firstName && touched.firstName
                            ? "ring-1 ring-red-500"
                            : "ring-1"
                        }`}
                        value={values.firstName}
                      />
                      {typeof errors.firstName === "string" &&
                        touched.firstName && (
                          <div className="text-red-500 font-normal">
                            <span className="mr-2">↑</span>
                            {errors.firstName}
                          </div>
                        )}
                    </div>
                    <div className="flex flex-col gap-3 w-1/2 ">
                      <label htmlFor="lastName">Last Name</label>
                      <Field
                        name="lastName"
                        className={`p-3 rounded-md ${
                          errors.lastName && touched.lastName
                            ? "ring-1 ring-red-500"
                            : "ring-1"
                        }`}
                      />
                      {typeof errors.lastName === "string" &&
                        touched.lastName && (
                          <div className="text-red-500 font-normal">
                            <span className="mr-2">↑</span>
                            {errors.lastName}
                          </div>
                        )}
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
                    <Field
                      name="email"
                      className={`p-3 rounded-md ${
                        errors.email && touched.email
                          ? "ring-1 ring-red-500"
                          : "ring-1"
                      }`}
                    />
                    {typeof errors.email === "string" && touched.email && (
                      <div className="text-red-500 font-normal">
                        <span className="mr-2">↑</span>
                        {errors.email}
                      </div>
                    )}
                  </div>
                  <div className="flex w-full md:px-0 px-8 flex-col gap-4 font-light md:w-[70%]">
                    <label htmlFor="mobileNumber">Mobile number</label>
                    <Field
                      name="mobileNumber"
                      className={`p-3 rounded-md ${
                        errors.mobileNumber && touched.mobileNumber
                          ? "ring-1 ring-red-500"
                          : "ring-1"
                      }`}
                    />
                    {typeof errors.mobileNumber === "string" &&
                      touched.mobileNumber && (
                        <div className="text-red-500 font-normal">
                          <span className="mr-2">↑</span>
                          {errors.mobileNumber}
                        </div>
                      )}
                  </div>
                  <div className="flex w-full md:px-0 px-8 flex-col gap-4 font-light md:w-[70%]">
                    <label htmlFor="country">Country</label>
                    <CountrySelect
                      handleChange={handleChange}
                      errors={errors}
                      touched={touched}
                      currCountry={values.country}
                    />
                    {typeof errors.country === "string" && touched.country && (
                      <div className="text-red-500 font-normal">
                        <span className="mr-2">↑</span>
                        {errors.country}
                      </div>
                    )}
                  </div>
                  <div className="flex w-full md:px-0 px-8 flex-col gap-4 font-light md:w-[70%]">
                    <label htmlFor="city">City</label>
                    <Field
                      name="city"
                      className={`p-3 rounded-md ${
                        errors.city && touched.city
                          ? "ring-1 ring-red-500"
                          : "ring-1"
                      }`}
                    />
                    {typeof errors.city === "string" && touched.city && (
                      <div className="text-red-500 font-normal">
                        <span className="mr-2">↑</span>
                        {errors.city}
                      </div>
                    )}
                  </div>
                  <div className="flex w-full md:px-0 px-8 flex-col gap-4 font-light md:w-[70%]">
                    <label htmlFor="address">Address</label>
                    <Field
                      name="address"
                      className={`p-3 rounded-md ${
                        errors.address && touched.address
                          ? "ring-1 ring-red-500"
                          : "ring-1"
                      }`}
                    />
                    {typeof errors.address === "string" && touched.address && (
                      <div className="text-red-500 font-normal">
                        <span className="mr-2">↑</span>
                        {errors.address}
                      </div>
                    )}
                  </div>
                  <div className="flex w-full md:px-0 px-8 flex-col gap-4 font-light md:w-[70%]">
                    <label htmlFor="country">Password</label>
                    <div className="w-full relative ">
                      <Field
                        name="password"
                        disabled={isSubmitting}
                        type={passwordShown ? "text" : "password"}
                        key="password"
                        className={`flex md:gap-4 gap-3  p-3 items-center justify-center ${
                          errors.password && touched.password
                            ? "ring-1 ring-red-500"
                            : "ring-1"
                        } w-full  rounded-md`}
                      />
                      <div
                        className=" flex  items-center justify-center absolute top-4 right-3"
                        onClick={() =>
                          setPasswordShown(passwordShown ? false : true)
                        }
                      >
                        {passwordShown ? (
                          <FaRegEye size={20} color="#85929E" />
                        ) : (
                          <FaRegEyeSlash size={20} color="#85929E" />
                        )}
                      </div>
                    </div>
                    {errors.password && touched.password && (
                      <div className="text-red-500 font-normal">
                        <span className="mr-2">↑</span>
                        {errors.password}
                      </div>
                    )}
                  </div>
                </div>
                <button
                  className="uppercase md:p-3 text-xs md:text-sm xl:text-base  p-2  text-white bg-fuchsia-400 w-1/3"
                  type="submit"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <div className="flex gap-2 justify-center items-center">
                      <Oval
                        visible={true}
                        height="20"
                        width="20"
                        color="#f3f6f4"
                        strokeWidth="8"
                        secondaryColor="#c0c0c0"
                        ariaLabel="oval-loading"
                        wrapperStyle={{}}
                        wrapperClass=""
                      />
                      Please wait...
                    </div>
                  ) : (
                    "SUBMIT"
                  )}
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

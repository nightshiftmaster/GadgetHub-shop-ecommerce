"use client";
import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import useSWR from "swr";
import { BASE_API_URL } from "@/utils/constants";
import Loading from "@/components/Loader";
import { fetcher } from "@/utils/fetcherSwr";
import { useDispatch } from "react-redux";
import { addDeliveryAddress } from "@/redux/features/productsSlice";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
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
  additionalInfo: Yup.string(),
});

const AdressForm = ({ props }: { props: any }) => {
  const dispatch = useDispatch();
  const { status } = useSession();
  const session = useSession();
  const router = useRouter();

  const delivery = useSelector(
    (state: RootState) => state.productsReducer.deliveryAddress
  );

  const { data, isLoading } = useSWR(
    `${BASE_API_URL}/api/user?email=${session?.data?.user?.email}`,
    fetcher
  );

  if (isLoading) {
    return <Loading />;
  }

  if (status === "unauthenticated") {
    router.push("/login");
  }

  const user = data[0];

  return (
    <div className="flex w-full h-fit justify-center">
      <Formik
        initialValues={{
          firstName:
            delivery.firstName || user?.firstName || session.data?.user?.name,
          lastName: delivery?.lastName || user?.lastName || "",
          mobileNumber: delivery.mobileNumber || user?.mobileNumber || "",
          email: delivery.email || user?.email || session.data?.user?.email,
          address: delivery.address || user?.address || "",
          city: delivery.city || user?.city || "",
          country: delivery.country || user?.country || "",
          additionalInfo: delivery.additionalInfo || user?.additionalInfo || "",
        }}
        validationSchema={PersonalDataSchema}
        onSubmit={() => {
          console.log("submitted from formik");
        }}
      >
        {({ errors, touched, values, handleChange, setFieldValue }) => {
          return (
            <div
              className="flex  flex-col gap-7 w-1/2 items-center"
              data-testid="address-form"
            >
              <Form className="flex flex-col  md:gap-20 gap-14 justify-center items-center md:w-[85vh] w-screen xl:text-base md:text-sm text-sm">
                <div className="flex w-full  justify-center items-center flex-col gap-10">
                  <div className="flex gap-5  justify-center  font-light  md:w-[80%] px-10 md:px-0  w-screen  ">
                    <div className="flex flex-col gap-3 w-1/2">
                      <label htmlFor="firstName">
                        First Name <span className="text-red-500">*</span>
                      </label>
                      <Field
                        name="firstName"
                        data-testid="input-firstName"
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
                    <div className="flex flex-col gap-3 w-1/2">
                      <label htmlFor="lastName">
                        Last Name <span className="text-red-500">*</span>
                      </label>
                      <Field
                        name="lastName"
                        data-testid="input-lastName"
                        className={`p-3 rounded-md ${
                          errors.lastName && touched.lastName
                            ? "ring-1 ring-red-500"
                            : "ring-1"
                        }`}
                        value={values.lastName}
                      />
                      {typeof errors.lastName === "string" &&
                      touched.lastName ? (
                        <div className="text-red-500 font-normal">
                          <span className="mr-2">↑</span>
                          {errors.lastName}
                        </div>
                      ) : null}
                    </div>
                  </div>
                  {(Object.keys(values) as Array<keyof typeof values>)
                    .slice(2, 6)
                    .map((input, i) => {
                      const inputs = [
                        "Mobile number",
                        "Email address",
                        "Delivery address",
                        "City",
                        "Country",
                      ];
                      return (
                        <div
                          className="flex  md:md:w-[80%]  w-screen md:px-0 px-8 flex-col gap-4 font-light"
                          key={i}
                        >
                          <label>
                            {inputs[i]} <span className="text-red-500">*</span>
                          </label>
                          <Field
                            name={input}
                            data-testid={`input-${input}`}
                            className={`p-3 rounded-md ${
                              errors[input] && touched[input]
                                ? "ring-1 ring-red-500"
                                : "ring-1"
                            }`}
                          />

                          {errors[input] && touched[input] && (
                            <div className="text-red-500 font-normal">
                              <span className="mr-2">↑</span>
                              Please fill out this field
                            </div>
                          )}
                        </div>
                      );
                    })}
                  <div className="flex  md:w-[80%] px-8 md:px-0  w-screen   flex-col gap-4 font-light">
                    <label htmlFor="country">
                      Country<span className="text-red-500">*</span>
                    </label>
                    <CountrySelect
                      handleChange={handleChange}
                      errors={errors}
                      touched={touched}
                      currCountry={values.country}
                    />

                    {typeof errors.country === "string" && touched.country ? (
                      <div className="text-red-500 font-normal  md:text-base text-sm">
                        <span className="mr-2">↑</span>
                        {errors.country}
                      </div>
                    ) : null}
                  </div>

                  <div className="flex flex-col md:w-[78%] px-8 md:px-0  w-screen gap-4 font-light">
                    <label htmlFor="additionalInfo">
                      Additional info (optional)
                    </label>
                    <textarea
                      name="additionalInfo"
                      className="ring-1 p-3 rounded-md"
                      rows={5}
                      onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                        setFieldValue("additionalInfo", e.target.value);
                      }}
                      value={values.additionalInfo}
                    ></textarea>
                  </div>

                  <button
                    className="uppercase md:p-3  text-xs md:text-base p-2  text-white bg-fuchsia-400 w-1/3"
                    type="button"
                    onClick={() => {
                      dispatch(addDeliveryAddress(values));
                      Object.values(values)
                        .slice(0, 7)
                        .every((value) => value?.length !== 0) &&
                        props.nextStep();
                    }}
                  >
                    Next
                  </button>
                </div>
              </Form>
            </div>
          );
        }}
      </Formik>
    </div>
  );
};

export default AdressForm;

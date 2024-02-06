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
  const [tumbnail, setTumbnail] = useState("");
  const [passwordShown, setPasswordShown] = useState(false);
  const router = useRouter();
  const session = useSession();

  useEffect(() => {
    setTumbnail(tumbnail);
  }, [tumbnail]);

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
              const res = await fetch(`${BASE_API_URL}/api/auth/register`, {
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
              <ProfileAvatar tumbnail={tumbnail} setTumbnail={setTumbnail} />
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
                    <select
                      id="country"
                      name="country"
                      className={`p-4 rounded-md  bg-white ${
                        errors.country && touched.country
                          ? "ring-1 ring-red-500"
                          : "ring-1"
                      }`}
                      onChange={handleChange}
                    >
                      <option value="choose a country">choose a country</option>
                      <option value="">Afghanistan</option>
                      <option value="Åland Islands">Åland Islands</option>
                      <option value="Albania">Albania</option>
                      <option value="Algeria">Algeria</option>
                      <option value="American Samoa">American Samoa</option>
                      <option value="Andorra">Andorra</option>
                      <option value="Angola">Angola</option>
                      <option value="Anguilla">Anguilla</option>
                      <option value="Antarctica">Antarctica</option>
                      <option value="Antigua and Barbuda">
                        Antigua and Barbuda
                      </option>
                      <option value="Argentina">Argentina</option>
                      <option value="Armenia">Armenia</option>
                      <option value="Aruba">Aruba</option>
                      <option value="Australia">Australia</option>
                      <option value="Austria">Austria</option>
                      <option value="Azerbaijan">Azerbaijan</option>
                      <option value="Bahamas">Bahamas</option>
                      <option value="Bahrain">Bahrain</option>
                      <option value="Bangladesh">Bangladesh</option>
                      <option value="Barbados">Barbados</option>
                      <option value="Belarus">Belarus</option>
                      <option value="Belgium">Belgium</option>
                      <option value="Belize">Belize</option>
                      <option value="Benin">Benin</option>
                      <option value="Bermuda">Bermuda</option>
                      <option value="Bhutan">Bhutan</option>
                      <option value="Bolivia">Bolivia</option>
                      <option value="Bosnia and Herzegovina">
                        Bosnia and Herzegovina
                      </option>
                      <option value="Botswana">Botswana</option>
                      <option value="Bouvet Island">Bouvet Island</option>
                      <option value="Brazil">Brazil</option>
                      <option value="British Indian Ocean Territory">
                        British Indian Ocean Territory
                      </option>
                      <option value="Brunei Darussalam">
                        Brunei Darussalam
                      </option>
                      <option value="Bulgaria">Bulgaria</option>
                      <option value="Burkina Faso">Burkina Faso</option>
                      <option value="Burundi">Burundi</option>
                      <option value="Cambodia">Cambodia</option>
                      <option value="Cameroon">Cameroon</option>
                      <option value="Canada">Canada</option>
                      <option value="Cape Verde">Cape Verde</option>
                      <option value="Cayman Islands">Cayman Islands</option>
                      <option value="Central African Republic">
                        Central African Republic
                      </option>
                      <option value="Chad">Chad</option>
                      <option value="Chile">Chile</option>
                      <option value="China">China</option>
                      <option value="Christmas Island">Christmas Island</option>
                      <option value="Cocos (Keeling) Islands">
                        Cocos (Keeling) Islands
                      </option>
                      <option value="Colombia">Colombia</option>
                      <option value="Comoros">Comoros</option>
                      <option value="Congo">Congo</option>
                      <option value="Congo, The Democratic Republic of The">
                        Congo, The Democratic Republic of The
                      </option>
                      <option value="Cook Islands">Cook Islands</option>
                      <option value="Costa Rica">Costa Rica</option>
                      {/* <option value="Cote D'ivoire">Cote D'ivoire</option> */}
                      <option value="Croatia">Croatia</option>
                      <option value="Cuba">Cuba</option>
                      <option value="Cyprus">Cyprus</option>
                      <option value="Czech Republic">Czech Republic</option>
                      <option value="Denmark">Denmark</option>
                      <option value="Djibouti">Djibouti</option>
                      <option value="Dominica">Dominica</option>
                      <option value="Dominican Republic">
                        Dominican Republic
                      </option>
                      <option value="Ecuador">Ecuador</option>
                      <option value="Egypt">Egypt</option>
                      <option value="El Salvador">El Salvador</option>
                      <option value="Equatorial Guinea">
                        Equatorial Guinea
                      </option>
                      <option value="Eritrea">Eritrea</option>
                      <option value="Estonia">Estonia</option>
                      <option value="Ethiopia">Ethiopia</option>
                      <option value="Falkland Islands (Malvinas)">
                        Falkland Islands (Malvinas)
                      </option>
                      <option value="Faroe Islands">Faroe Islands</option>
                      <option value="Fiji">Fiji</option>
                      <option value="Finland">Finland</option>
                      <option value="France">France</option>
                      <option value="French Guiana">French Guiana</option>
                      <option value="French Polynesia">French Polynesia</option>
                      <option value="French Southern Territories">
                        French Southern Territories
                      </option>
                      <option value="Gabon">Gabon</option>
                      <option value="Gambia">Gambia</option>
                      <option value="Georgia">Georgia</option>
                      <option value="Germany">Germany</option>
                      <option value="Ghana">Ghana</option>
                      <option value="Gibraltar">Gibraltar</option>
                      <option value="Greece">Greece</option>
                      <option value="Greenland">Greenland</option>
                      <option value="Grenada">Grenada</option>
                      <option value="Guadeloupe">Guadeloupe</option>
                      <option value="Guam">Guam</option>
                      <option value="Guatemala">Guatemala</option>
                      <option value="Guernsey">Guernsey</option>
                      <option value="Guinea">Guinea</option>
                      <option value="Guinea-bissau">Guinea-bissau</option>
                      <option value="Guyana">Guyana</option>
                      <option value="Haiti">Haiti</option>
                      <option value="Heard Island and Mcdonald Islands">
                        Heard Island and Mcdonald Islands
                      </option>
                      <option value="Holy See (Vatican City State)">
                        Holy See (Vatican City State)
                      </option>
                      <option value="Honduras">Honduras</option>
                      <option value="Hong Kong">Hong Kong</option>
                      <option value="Hungary">Hungary</option>
                      <option value="Iceland">Iceland</option>
                      <option value="India">India</option>
                      <option value="Indonesia">Indonesia</option>
                      <option value="Iran, Islamic Republic of">
                        Iran, Islamic Republic of
                      </option>
                      <option value="Iraq">Iraq</option>
                      <option value="Ireland">Ireland</option>
                      <option value="Isle of Man">Isle of Man</option>
                      <option value="Israel">Israel</option>
                      <option value="Italy">Italy</option>
                      <option value="Jamaica">Jamaica</option>
                      <option value="Japan">Japan</option>
                      <option value="Jersey">Jersey</option>
                      <option value="Jordan">Jordan</option>
                      <option value="Kazakhstan">Kazakhstan</option>
                      <option value="Kenya">Kenya</option>
                      <option value="Kiribati">Kiribati</option>
                      {/* <option value="Korea, Democratic People's Republic of">
                        Korea, Democratic People's Republic of
                      </option> */}
                      <option value="Korea, Republic of">
                        Korea, Republic of
                      </option>
                      <option value="Kuwait">Kuwait</option>
                      <option value="Kyrgyzstan">Kyrgyzstan</option>
                      {/* <option value="Lao People's Democratic Republic">
                        Lao People's Democratic Republic
                      </option> */}
                      <option value="Latvia">Latvia</option>
                      <option value="Lebanon">Lebanon</option>
                      <option value="Lesotho">Lesotho</option>
                      <option value="Liberia">Liberia</option>
                      <option value="Libyan Arab Jamahiriya">
                        Libyan Arab Jamahiriya
                      </option>
                      <option value="Liechtenstein">Liechtenstein</option>
                      <option value="Lithuania">Lithuania</option>
                      <option value="Luxembourg">Luxembourg</option>
                      <option value="Macao">Macao</option>
                      <option value="Macedonia, The Former Yugoslav Republic of">
                        Macedonia, The Former Yugoslav Republic of
                      </option>
                      <option value="Madagascar">Madagascar</option>
                      <option value="Malawi">Malawi</option>
                      <option value="Malaysia">Malaysia</option>
                      <option value="Maldives">Maldives</option>
                      <option value="Mali">Mali</option>
                      <option value="Malta">Malta</option>
                      <option value="Marshall Islands">Marshall Islands</option>
                      <option value="Martinique">Martinique</option>
                      <option value="Mauritania">Mauritania</option>
                      <option value="Mauritius">Mauritius</option>
                      <option value="Mayotte">Mayotte</option>
                      <option value="Mexico">Mexico</option>
                      <option value="Micronesia, Federated States of">
                        Micronesia, Federated States of
                      </option>
                      <option value="Moldova, Republic of">
                        Moldova, Republic of
                      </option>
                      <option value="Monaco">Monaco</option>
                      <option value="Mongolia">Mongolia</option>
                      <option value="Montenegro">Montenegro</option>
                      <option value="Montserrat">Montserrat</option>
                      <option value="Morocco">Morocco</option>
                      <option value="Mozambique">Mozambique</option>
                      <option value="Myanmar">Myanmar</option>
                      <option value="Namibia">Namibia</option>
                      <option value="Nauru">Nauru</option>
                      <option value="Nepal">Nepal</option>
                      <option value="Netherlands">Netherlands</option>
                      <option value="Netherlands Antilles">
                        Netherlands Antilles
                      </option>
                      <option value="New Caledonia">New Caledonia</option>
                      <option value="New Zealand">New Zealand</option>
                      <option value="Nicaragua">Nicaragua</option>
                      <option value="Niger">Niger</option>
                      <option value="Nigeria">Nigeria</option>
                      <option value="Niue">Niue</option>
                      <option value="Norfolk Island">Norfolk Island</option>
                      <option value="Northern Mariana Islands">
                        Northern Mariana Islands
                      </option>
                      <option value="Norway">Norway</option>
                      <option value="Oman">Oman</option>
                      <option value="Pakistan">Pakistan</option>
                      <option value="Palau">Palau</option>
                      <option value="Palestinian Territory, Occupied">
                        Palestinian Territory, Occupied
                      </option>
                      <option value="Panama">Panama</option>
                      <option value="Papua New Guinea">Papua New Guinea</option>
                      <option value="Paraguay">Paraguay</option>
                      <option value="Peru">Peru</option>
                      <option value="Philippines">Philippines</option>
                      <option value="Pitcairn">Pitcairn</option>
                      <option value="Poland">Poland</option>
                      <option value="Portugal">Portugal</option>
                      <option value="Puerto Rico">Puerto Rico</option>
                      <option value="Qatar">Qatar</option>
                      <option value="Reunion">Reunion</option>
                      <option value="Romania">Romania</option>
                      <option value="Russian Federation">
                        Russian Federation
                      </option>
                      <option value="Rwanda">Rwanda</option>
                      <option value="Saint Helena">Saint Helena</option>
                      <option value="Saint Kitts and Nevis">
                        Saint Kitts and Nevis
                      </option>
                      <option value="Saint Lucia">Saint Lucia</option>
                      <option value="Saint Pierre and Miquelon">
                        Saint Pierre and Miquelon
                      </option>
                      <option value="Saint Vincent and The Grenadines">
                        Saint Vincent and The Grenadines
                      </option>
                      <option value="Samoa">Samoa</option>
                      <option value="San Marino">San Marino</option>
                      <option value="Sao Tome and Principe">
                        Sao Tome and Principe
                      </option>
                      <option value="Saudi Arabia">Saudi Arabia</option>
                      <option value="Senegal">Senegal</option>
                      <option value="Serbia">Serbia</option>
                      <option value="Seychelles">Seychelles</option>
                      <option value="Sierra Leone">Sierra Leone</option>
                      <option value="Singapore">Singapore</option>
                      <option value="Slovakia">Slovakia</option>
                      <option value="Slovenia">Slovenia</option>
                      <option value="Solomon Islands">Solomon Islands</option>
                      <option value="Somalia">Somalia</option>
                      <option value="South Africa">South Africa</option>
                      <option value="South Georgia and The South Sandwich Islands">
                        South Georgia and The South Sandwich Islands
                      </option>
                      <option value="Spain">Spain</option>
                      <option value="Sri Lanka">Sri Lanka</option>
                      <option value="Sudan">Sudan</option>
                      <option value="Suriname">Suriname</option>
                      <option value="Svalbard and Jan Mayen">
                        Svalbard and Jan Mayen
                      </option>
                      <option value="Swaziland">Swaziland</option>
                      <option value="Sweden">Sweden</option>
                      <option value="Switzerland">Switzerland</option>
                      <option value="Syrian Arab Republic">
                        Syrian Arab Republic
                      </option>
                      <option value="Taiwan">Taiwan</option>
                      <option value="Tajikistan">Tajikistan</option>
                      <option value="Tanzania, United Republic of">
                        Tanzania, United Republic of
                      </option>
                      <option value="Thailand">Thailand</option>
                      <option value="Timor-leste">Timor-leste</option>
                      <option value="Togo">Togo</option>
                      <option value="Tokelau">Tokelau</option>
                      <option value="Tonga">Tonga</option>
                      <option value="Trinidad and Tobago">
                        Trinidad and Tobago
                      </option>
                      <option value="Tunisia">Tunisia</option>
                      <option value="Turkey">Turkey</option>
                      <option value="Turkmenistan">Turkmenistan</option>
                      <option value="Turks and Caicos Islands">
                        Turks and Caicos Islands
                      </option>
                      <option value="Tuvalu">Tuvalu</option>
                      <option value="Uganda">Uganda</option>
                      <option value="Ukraine">Ukraine</option>
                      <option value="United Arab Emirates">
                        United Arab Emirates
                      </option>
                      <option value="United Kingdom">United Kingdom</option>
                      <option value="United States">United States</option>
                      <option value="United States Minor Outlying Islands">
                        United States Minor Outlying Islands
                      </option>
                      <option value="Uruguay">Uruguay</option>
                      <option value="Uzbekistan">Uzbekistan</option>
                      <option value="Vanuatu">Vanuatu</option>
                      <option value="Venezuela">Venezuela</option>
                      <option value="Viet Nam">Viet Nam</option>
                      <option value="Virgin Islands, British">
                        Virgin Islands, British
                      </option>
                      <option value="Virgin Islands, U.S.">
                        Virgin Islands, U.S.
                      </option>
                      <option value="Wallis and Futuna">
                        Wallis and Futuna
                      </option>
                      <option value="Western Sahara">Western Sahara</option>
                      <option value="Yemen">Yemen</option>
                      <option value="Zambia">Zambia</option>
                      <option value="Zimbabwe">Zimbabwe</option>
                    </select>
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

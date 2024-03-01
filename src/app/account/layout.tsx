"use client";
import React, { useEffect, useState } from "react";
import { TbChecklist } from "react-icons/tb";
import { MdOutlineFeedback } from "react-icons/md";
import { CiLogout } from "react-icons/ci";
import Link from "next/link";
import { removeAllProducts } from "@/redux/features/productsSlice";
import { BASE_API_URL } from "@/utils/constants";
import { VscAccount } from "react-icons/vsc";
import { signOut } from "next-auth/react";
import ModalWindow from "./components/ModalWindow";
import { useDispatch } from "react-redux";
import { usePathname, useRouter } from "next/navigation";
import useSWR from "swr";
import { useSession } from "next-auth/react";
import WishIcon from "./wishlist/components/WishIcon";

const navs = [
  {
    name: "Personal information",
    id: 1,
    path: `/account`,
    icon: <VscAccount size={30} />,
  },
  {
    name: "Orders",
    id: 2,
    path: `/account/orders`,
    icon: <TbChecklist size={30} />,
  },
  {
    name: "Wishlist",
    id: 3,
    path: `/account/wishlist`,
    icon: <WishIcon />,
  },

  {
    name: "Feedback",
    id: 4,
    path: `/contact`,
    icon: <MdOutlineFeedback size={30} />,
  },
  { name: "Logout", id: 5, path: "", icon: <CiLogout size={30} /> },
];

const Layout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const session = useSession();
  const [currPage, setCurrPage] = useState<string | null>();
  const dispatch = useDispatch();

  const fetcher = (...args: Parameters<typeof fetch>) =>
    fetch(...args).then((res) => res.json());

  const { data, isLoading, error } = useSWR(
    `${BASE_API_URL}/api/user?email=${session?.data?.user?.email}`,
    fetcher
  );

  let isAccountCreated = data?.length === 0;

  useEffect(() => {
    const currentPageName = pathname.split("/").pop();
    if (currentPageName === "account") {
      setCurrPage("Personal Information");
    }
    if (pathname.includes("orders")) {
      setCurrPage("Orders");
    }
    if (pathname.includes("wishlist")) {
      setCurrPage("wishlist");
    }
  }, [pathname]);

  async function logOut() {
    await signOut({ callbackUrl: `${BASE_API_URL}/login` });
    dispatch(removeAllProducts());
  }

  return (
    <div className="h-full w-full">
      {/* modal window */}
      {isAccountCreated && <ModalWindow />}
      {/* mobile account */}

      {/* desktop account */}
      <div className="flex h-full w-full -mt-5 z-20 ">
        {/* navigation */}
        <div className="bg-gray-700 md:flex hidden h-screen w-[20%] md:w-[30%] lg:w-[20%]">
          <div className="hidden md:flex bg-gray-700 flex-col text-slate-200 h-screen gap-5 ">
            <div className="flex flex-col">
              <h1 className="text-2xl lg:text-4xl p-12 font-bold">
                My account
              </h1>
              <hr className="w-full h-px  bg-gray-300 border-0 rounded "></hr>
            </div>
            <ul className="flex uppercase font-sans justify-center text-sm lg:text-base flex-col w-full gap-5">
              {navs.slice(0, 3).map((nav) => {
                return (
                  <Link
                    href={nav.path}
                    onClick={() => setCurrPage(nav.name)}
                    key={nav.id}
                  >
                    <div className="flex w-full  h-[10vh] px-10 gap-3 justify-start items-center hover:bg-slate-400 duration-300">
                      {nav.icon}
                      <div>
                        <li>{nav.name}</li>
                      </div>
                    </div>
                  </Link>
                );
              })}

              {/* logout */}
              <div
                className="flex gap-3  px-10 justify-start h-[10vh]  hover:bg-slate-400 items-center cursor-pointer duration-500"
                onClick={() => {
                  void logOut();
                }}
              >
                {navs[4].icon}
                <div>
                  <li>{navs[4].name}</li>
                </div>
              </div>
            </ul>
          </div>
        </div>

        {/* dashboard */}
        <div className="bg-gray-100 overflow-auto overflow-x-hidden flex flex-col h-screen w-full md:w-[70%] lg:w-[80%] p-4">
          {/* head */}

          <div className="bg-white h-[10vh] hidden md:flex justify-center items-center">
            <h1 className="text-2xl  uppercase font-semibold text-gray-800 p-5">
              {currPage}
            </h1>
          </div>

          {/* body */}

          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;

"use client";
import Loading from "@/components/Loader";
import { BASE_API_URL } from "@/utils/constants";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { VscAccount } from "react-icons/vsc";
import useSWR from "swr";

const ProfileAvatar = ({
  tumbnail,
  setTumbnail,
}: {
  tumbnail: string;
  setTumbnail: any;
}) => {
  const session = useSession();
  const [currAvatar, setCurrAvatar] = useState("");

  const fetcher = (...args: Parameters<typeof fetch>) =>
    fetch(...args).then((res) => res.json());

  const { data, isLoading } = useSWR(
    `${BASE_API_URL}/api/user?email=${session?.data?.user?.email}`,
    fetcher
  );

  useEffect(() => {
    if (session.status === "authenticated" && user) {
      setCurrAvatar(user?.img);
    }
    if (session?.data?.user?.image) {
      setCurrAvatar(session?.data?.user?.image);
    }

    if (tumbnail) {
      setCurrAvatar(tumbnail);
    }
  }, [tumbnail]);

  if (isLoading) {
    return <Loading />;
  }

  const user = data[0];

  return (
    <div>
      <div className="flex justify-center items-center">
        {currAvatar ? (
          <img
            src={currAvatar}
            alt="avatar"
            className="rounded-full h-28 w-28 object-cover border-4 border-white"
          />
        ) : (
          <VscAccount size={100} color="#383838" />
        )}
      </div>
    </div>
  );
};

export default ProfileAvatar;

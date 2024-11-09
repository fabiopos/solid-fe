"use client";
import GlobalSideBar from "@/components/GlobalSideBar/GlobalSideBar";
import { useSession } from "next-auth/react";

const SettingsSideBar = () => {
  const { data } = useSession();
  return <GlobalSideBar footer={<p>{data?.user.subscriptionId}</p>} />;
};

export default SettingsSideBar;

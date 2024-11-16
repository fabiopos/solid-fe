"use client";
import { useSession } from "next-auth/react";
import PrivateNavBar from "./PrivateNavBar";
import PublicNavBar from "./PublicNavBar";
import Image from "next/image";
import logo from "@/app/assets/logo.svg";

const GlobalNavBar = () => {
  const { status } = useSession();  
  switch (status) {
    case "authenticated":
      return (
        <nav className="w-full flex justify-between px-5">
          <Image priority src={logo.src} alt="logo" width={45} height={45} />
          <PrivateNavBar />
        </nav>
      );
    case "unauthenticated":
      return (
        <nav className="w-full flex justify-between px-5">
          <Image priority src={logo.src} alt="logo" width={45} height={45} />
          <PublicNavBar />
        </nav>
      );
    case "loading":
      return null;
  }
};

export default GlobalNavBar;

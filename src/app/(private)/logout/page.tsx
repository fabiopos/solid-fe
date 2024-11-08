"use client";
import { signOut } from "next-auth/react";
import { redirect } from "next/navigation";
import { useEffect } from "react";

const LogoutPage = () => {
  useEffect(() => {
    signOut().then(() => redirect("/login"));
  }, []);
};

export default LogoutPage;

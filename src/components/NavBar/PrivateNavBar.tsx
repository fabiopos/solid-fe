"use client";
import { usePathname } from "next/navigation";
import { buttonVariants } from "../ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import LogoutButton from "../Logout/LogoutButton";
import { useSession } from "next-auth/react";
import { navigationMenuStyle } from "../ui/navigation-menu";
import { menuItems } from "@/constants/menu";



const PrivateNavBar = () => {
  const pathname = usePathname();
  const { data } = useSession()

  return (
    <ul className="flex space-x-2 p-4 text-lg">
      {menuItems.filter(x => x.navBar).map((item) => (
        <Link
          key={item.url}
          href={item.url}
          className={cn(
            buttonVariants({ variant: "linkHover2" }),
            pathname === item.url
              ? "bg-neutral-600 text-slate-50 hover:bg-slate-600 after:bg-slate-50"
              : "hover:bg-transparent",
            "justify-start"
          )}
        >
          {item.title}
        </Link>
      ))}
      <LogoutButton />
      <span className={navigationMenuStyle()}>{data?.user.name}</span>
    </ul>
  );
};

export default PrivateNavBar;

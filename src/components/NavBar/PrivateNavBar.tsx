"use client";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { buttonVariants } from "../ui/button";
import { cn } from "@/lib/utils";
import { navigationMenuStyle } from "@/components/ui/navigation-menu";
import { menuItems } from "@/constants/menu";
import LogoutButton from "@/components/logout/logout-button";



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

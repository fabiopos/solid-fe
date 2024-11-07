'use client'
import { usePathname } from "next/navigation";
import { buttonVariants } from "../ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";

const items = [
  {
    href: "/",
    title: "Home",
  },
  {
    href: "/about",
    title: "About",
  },
  {
    href: "/pricing",
    title: "Pricing",
  },
  {
    href: "/signup",
    title: "Sign up",
  },
  {
    href: "/login",
    title: "Log in",
  },
];

const PublicNavBar = () => {
  const pathname = usePathname();

  return (
    <ul className="flex space-x-2 p-4 text-lg">
      {items.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            buttonVariants({ variant: "linkHover2" }),
            pathname === item.href
              ? "bg-neutral-600 text-slate-50 hover:bg-slate-600 after:bg-slate-50"
              : "hover:bg-transparent",
            "justify-start"
          )}
        >
          {item.title}
        </Link>
      ))}
    </ul>
  );
};

export default PublicNavBar;

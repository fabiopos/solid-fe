"use client";
import {
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarGroup,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "../ui/sidebar";
import Link from "next/link";
import { buttonVariants } from "../ui/button";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { menuItems } from "@/constants/menu";



const MainSidebarGroup = () => {
  const pathname = usePathname();
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Menu</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {menuItems.filter(x => x.sideBar).map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton asChild>
                <Link
                  href={item.url}
                  className={cn(
                    buttonVariants({ variant: "linkHover2" }),
                    pathname === item.url
                      ? "bg-neutral-600 text-slate-50 hover:bg-slate-600 after:bg-slate-50"
                      : "hover:bg-transparent",
                    "justify-start"
                  )}
                >
                  <item.icon className="text-md" size="48" />
                  <span className="text-md">{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
};

export default MainSidebarGroup;

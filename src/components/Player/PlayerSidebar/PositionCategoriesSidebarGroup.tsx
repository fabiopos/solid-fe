import {
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarGroup,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "../../ui/sidebar";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { buttonVariants } from "../../ui/button";
import { usePathname } from "next/navigation";


const positionsCategories = [
  {
    title: "All",
    url: "/players",
    icon: undefined,
  },
  {
    title: "Goalkeepers",
    url: "/players/goalkeeper",
    icon: null,
  },
  {
    title: "Defenders",
    url: "/players/defender",
    icon: null,
  },
  {
    title: "Midfielders",
    url: "/players/midfielder",
    icon: null,
  },
  {
    title: "Forwards",
    url: "/players/forward",
    icon: null,
  },
];

const PositionCategoriesSidebarGroup = () => {
  const pathname = usePathname();
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Players</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {positionsCategories.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton asChild>
                <Link
                  href={item.url}
                  className={cn(
                    buttonVariants({ variant: "linkHover2" }),
                    pathname === item.url
                      ? "bg-slate-800 text-slate-50 hover:bg-slate-600 after:bg-slate-50"
                      : "hover:bg-transparent",
                    "justify-start"
                  )}
                >
                  <span>{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
};

export default PositionCategoriesSidebarGroup;

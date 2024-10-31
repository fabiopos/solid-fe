"use client";

import * as React from "react";
import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import ListItem from "./ListItem";
import Image from "next/image";
import logo from "@/app/assets/logo.svg";
import { useSession } from "next-auth/react";
import { SolidAuth } from "@/features/auth/application/SolidAuth";

const features: { title: string; href: string; description: string }[] = [
  {
    title: "Teams",
    href: "/teams",
    description: "Manage your teams and all data variants associated.",
  },
  {
    title: "Players",
    href: "/players",
    description: "All your players data.",
  },
  {
    title: "Seasons",
    href: "/seasons",
    description: "Displays all the seasons.",
  },
  {
    title: "Competitions",
    href: "/competitions",
    description: "All the competitions historic and in-progress.",
  },
  {
    title: "Lineups",
    href: "/lineups",
    description: "A tool for managers to create lineups.",
  },
];

export default function NavBar() {
  const { data } = useSession();
  return (
    <div className="fixed flex justify-center align-middle w-full text-center max-w-full p-8">
      <NavigationMenu>
        <Image priority src={logo.src} alt="logo" width={45} height={45} />
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Getting started</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                <li className="row-span-3">
                  <NavigationMenuLink asChild>
                    <Link
                      className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                      href="/"
                    >
                      {/* <Icons.logo className="h-6 w-6" /> */}
                      <div className="mb-2 mt-4 text-lg font-medium">
                        solid manager
                      </div>
                      <p className="text-sm leading-tight text-muted-foreground">
                        Your team management tool
                      </p>
                    </Link>
                  </NavigationMenuLink>
                </li>
                <ListItem href="/subscription/start" title="Subscribe">
                  Create a subscription
                </ListItem>
                <ListItem href="/docs/subscription" title="About subscriptions">
                  How works a subscription?
                </ListItem>
                <ListItem href="/docs/features" title="Features">
                  Teams, Seasons and competitions and more...
                </ListItem>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Features</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                {features.map((feature) => (
                  <ListItem
                    key={feature.title}
                    title={feature.title}
                    href={feature.href}
                  >
                    {feature.description}
                  </ListItem>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          {data && (
            <NavigationMenuItem>
              <NavigationMenuTrigger>
                {data.user?.name ?? "username"}
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                  <li className="row-span-4">
                    <div className="flex h-full w-full select-none flex-col justify-center text-center rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md">
                      <Image
                        priority
                        src={logo.src}
                        alt="logo"
                        width={150}
                        height={150}
                      />
                    </div>
                  </li>
                  <ListItem href="/account" title="Account"></ListItem>
                  <ListItem href="/profile" title="Profile"></ListItem>
                  <ListItem
                    href="#"
                    onClick={() => SolidAuth.logout()}
                    className="hover:cursor-pointer"
                    title="Logout"
                  ></ListItem>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          )}
          <NavigationMenuItem>
            {!data && (
              <Link href="/login" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  Log In
                </NavigationMenuLink>
              </Link>
            )}
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
}

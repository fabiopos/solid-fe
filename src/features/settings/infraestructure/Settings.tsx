"use client";
import { Switch } from "@/components/ui/switch";
// import { useTheme } from "../domain/useSettings";
import { Label } from "@/components/ui/label";
import { format } from "date-fns";
import SettingsItem from "./SettingsItem";
import { FulfilledSubscription } from "@/features/subscription/domain/subscription.effect.schema";
import ActiveText from "@/components/ui/active-text";

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
 
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface SettingsProps {
  subscription: FulfilledSubscription;
}
const Settings = ({ subscription }: SettingsProps) => {
  // const { darkMode, toggleDarkMode, isDarkModeEnabled } = useTheme();
  const { setTheme } = useTheme();
  return (
    <>
      <ul className="">
        <SettingsItem
          label={"Theme"}
          value={
            <>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="icon">
                    <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                    <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                    <span className="sr-only">Toggle theme</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => setTheme("light")}>
                    Light
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setTheme("dark")}>
                    Dark
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setTheme("system")}>
                    System
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          }
        />

        <SettingsItem
          label="Autoselect Team"
          value={
            <>
              <Switch id="airplane-mode" />
              <Label htmlFor="airplane-mode">On</Label>
            </>
          }
        />

        <SettingsItem
          label="Subscription Plan"
          value={subscription.plan?.name}
        />

        <SettingsItem
          label="Subscription Starts on"
          value={
            subscription.startDate
              ? format(subscription.startDate, "dd MMMM yyyy")
              : "--"
          }
        />

        <SettingsItem
          label="Subscription Ends on"
          value={
            subscription.endDate
              ? format(subscription.endDate, "dd MMMM yyyy")
              : "--"
          }
        />

        <SettingsItem
          label="Status"
          value={<ActiveText isActive={subscription.active} />}
        />

        <SettingsItem
          label="Teams Count"
          value={subscription.teams?.length ?? 0}
        />
        <SettingsItem
          label="Users Count"
          value={subscription.users?.length ?? 0}
        />
        <SettingsItem
          label="Features Count"
          value={subscription.features?.length ?? 0}
        />

        {subscription.features?.map((subFeature) => (
          <SettingsItem
            key={subFeature.id}
            label={`Max ${subFeature.feature?.name} allowed`}
            value={subFeature.max}
          />
        ))}
      </ul>
    </>
  );
};

export default Settings;

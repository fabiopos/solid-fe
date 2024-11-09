"use client";
import { Switch } from "@/components/ui/switch";
import { useTheme } from "../domain/useSettings";
import { Label } from "@/components/ui/label";
import { Subscription } from "@/types/types.common";
import { format } from "date-fns";
import SettingsItem from "./SettingsItem";

interface SettingsProps {
  subscription: Subscription;
}
const Settings = ({ subscription }: SettingsProps) => {
  const { darkMode, toggleDarkMode, isDarkModeEnabled } = useTheme();
  return (
    <>
      <div className="grid grid-cols-[200px_auto] gap-5 justify-between">
        <SettingsItem
          label="Theme"
          value={
            <>
              <Switch
                id="theme-mode"
                onCheckedChange={toggleDarkMode}
                defaultChecked={isDarkModeEnabled}
              />
              <Label htmlFor="theme-mode">
                {darkMode ? "Light mode" : "Dark Mode"}
              </Label>
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
          value={subscription.plan.name}
        />

        <SettingsItem
          label="Subscription Starts on"
          value={format(subscription.startDate, "dd MMMM yyyy")}
        />

        <SettingsItem
          label="Subscription Ends on"
          value={format(subscription.endDate, "dd MMMM yyyy")}
        />

        <SettingsItem
          label="Status"
          value={subscription.active ? "Active" : "Inactive"}
        />

        <SettingsItem label="Teams Count" value={subscription.teams?.length ?? 0} />
        <SettingsItem label="Users Count" value={subscription.users?.length ?? 0} />
        <SettingsItem label="Features Count" value={subscription.features?.length ?? 0} />
      </div>
    </>
  );
};

export default Settings;

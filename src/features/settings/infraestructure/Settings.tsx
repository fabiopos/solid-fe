"use client";
import { Switch } from "@/components/ui/switch";
import { useTheme } from "../domain/useSettings";
import { Label } from "@/components/ui/label";
import { format } from "date-fns";
import SettingsItem from "./SettingsItem";
import { FulfilledSubscription } from "@/features/subscription/domain/subscription.effect.schema";
import ActiveText from "@/components/ui/active-text";

interface SettingsProps {
  subscription: FulfilledSubscription;
}
const Settings = ({ subscription }: SettingsProps) => {
  const { darkMode, toggleDarkMode, isDarkModeEnabled } = useTheme();
  return (
    <>
      <ul className="">
        <SettingsItem
          label={darkMode ? "Light Mode" : "Dark Mode"}
          value={
            <>
              <Switch
                id="theme-mode"
                onCheckedChange={toggleDarkMode}
                defaultChecked={isDarkModeEnabled}
              />
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

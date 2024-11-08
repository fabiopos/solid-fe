"use client";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useTheme } from "@/features/settings/domain/useSettings";

const SettingsPage = () => {
  const { darkMode, toggleDarkMode, isDarkModeEnabled } = useTheme();

  return (
    <div className="">
      <h1 className="text-3xl font-extrabold my-5">Settings</h1>

      <div className="grid grid-cols-[200px_auto] gap-5 justify-between">
        <div className="border-r pr-5">
          <span>Theme</span>
        </div>
        <div>
          <div className="flex items-center space-x-2">
            <Switch id="theme-mode" onCheckedChange={toggleDarkMode} defaultChecked={isDarkModeEnabled} />
            <Label htmlFor="theme-mode">
              {darkMode ? "Light mode" : "Dark Mode"}
            </Label>
          </div>
        </div>

        <div className="border-r pr-5">
          <span>Autoselect Team</span>
        </div>
        <div>
          <div className="flex items-center space-x-2">
            <Switch id="airplane-mode" />
            <Label htmlFor="airplane-mode">On</Label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;

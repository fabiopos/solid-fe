"use client";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCallback, useMemo, useState } from "react";
import { TeamCreate } from "../application/TeamCreate";
import { ApiClient } from "@/lib/ApiClient";
import { useSession } from "next-auth/react";
import { EmptyTeam } from "../domain/team.schema";
import { useRouter } from "next/navigation";

interface TeamCreateDrawerProps {
  title?: string;
  subtitle?: string;
  open: boolean;
  onClose: () => void;
}

function TeamCreateDrawer({
  onClose,
  open,
  title,
  subtitle,
}: TeamCreateDrawerProps) {
  const router = useRouter();
  const { data } = useSession();
  const [name, setName] = useState("");
  const isDisabled = useMemo(() => !name, [name]);

  const handleSubmit = useCallback(async () => {
    const teamc = new TeamCreate(new ApiClient());
    await teamc.createRival(
      EmptyTeam.make({ name }),
      data?.user.access_token ?? ""
    );

    router.refresh();
    setName("");
    onClose();
  }, [data?.user.access_token, name, onClose, router]);

  return (
    <Drawer open={open} direction="right" onClose={onClose}>
      <DrawerContent>
        <div className="mx-auto w-full max-w-md">
          <DrawerHeader>
            <DrawerTitle>{title ?? "Add New Team"}</DrawerTitle>
            <DrawerDescription>{subtitle}</DrawerDescription>
          </DrawerHeader>
          <div className="p-5 space-y-2">
            <Label>Team Name</Label>
            <Input
              placeholder="Team Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <DrawerFooter>
            <Button disabled={isDisabled} onClick={handleSubmit}>
              Create Team
            </Button>
            <DrawerClose onClick={onClose}></DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}

export default TeamCreateDrawer;

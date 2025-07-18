import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogContent,
} from "@/components/ui/dialog";
import FieldPositionCombo from "../FieldPositionCombo/FieldPositionCombo";
import { Label } from "@/components/ui/label";
import FieldPositionSelect from "../FieldPositionSelect/FieldPositionSelect";
import { useSession } from "next-auth/react";
import { useSolidStore } from "@/providers/store.provider";
import {
  selectAccessToken,
  selectSelectedPlayer,
  selectSelectedPlayerPositions,
} from "@/stores/selectors";
import { useMutation } from "@tanstack/react-query";
import { patchPlayerPositionsOptions } from "@/core/query/player/player.query";

function FieldPositionModal() {
  const { data } = useSession();
  const selectedPlayer = useSolidStore(selectSelectedPlayer);
  const setSelectedPlayer = useSolidStore((state) => state.setSelectedPlayer);
  const syncSelectedPlayerChanges = useSolidStore(
    (state) => state.syncSelectedPlayerChanges
  );

  const selectedPlayerPositions = useSolidStore(selectSelectedPlayerPositions);
  const token = useSolidStore(selectAccessToken);
  const { mutate, isPending } = useMutation(
    patchPlayerPositionsOptions({
      onSuccess: () => {
        syncSelectedPlayerChanges();
        setSelectedPlayer(null);
      },
    })
  );

  const handleOpenChange = (open: boolean) => {
    if (!open) setSelectedPlayer(null);
  };

  const onSaveChanges = () => {
    if (!data || !selectedPlayer) return;
    mutate({
      pid: selectedPlayer.id!,
      body: {
        favPosition: selectedPlayer.favPositionId ?? "",
        fieldPositions: selectedPlayerPositions,
      },
      token,
    });
  };

  if (!selectedPlayer) return null;
  return (
    <Dialog
      modal
      open={Boolean(selectedPlayer)}
      onOpenChange={handleOpenChange}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Edit field position for {selectedPlayer.firstName}{" "}
            {selectedPlayer.lastName}
          </DialogTitle>
          <DialogDescription>
            Change your field positions for this player
          </DialogDescription>
        </DialogHeader>
        <div className="min-h-[400px]">
          <div className="flex flex-col gap-5">
            <div className="flex gap-2 items-center">
              <Label>Primary Position</Label>
              <FieldPositionCombo
                defaultValue={selectedPlayer.favPositionId ?? ""}
              />
            </div>
            <div>
              <Label>Secondary Field Positions</Label>
              <FieldPositionSelect />
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button type="button" onClick={onSaveChanges} disabled={isPending}>
            {isPending ? "Saving..." : "Save changes"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default FieldPositionModal;

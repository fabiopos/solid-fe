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
import { usePlayersStore } from "@/context/PlayersCtx";
import { useSession } from "next-auth/react";
import { useMemo } from "react";

function FieldPositionModal() {
  const { data } = useSession();
  const {
    teamId,
    selectedPlayer,
    setSelectedPlayer,
    patchPlayerFieldPositions,
    fetchPlayers,
    playerStatusUpdate,
  } = usePlayersStore((state) => state);
  const handleOpenChange = (open: boolean) => {
    if (!open) setSelectedPlayer(null);
  };

  const onSaveChanges = () => {
    if (!data) return;
    patchPlayerFieldPositions(data.user.access_token).then(() =>
      fetchPlayers(teamId ?? "", data.user.access_token)
    );
  };

  const isLoading = useMemo(
    () =>
      playerStatusUpdate.id === selectedPlayer?.id &&
      playerStatusUpdate.status === "IN_PROGRESS",
    [playerStatusUpdate, selectedPlayer]
  );

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
            Edit field position for {selectedPlayer?.firstName}{" "}
            {selectedPlayer?.lastName}
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
                defaultValue={selectedPlayer?.favPositionId ?? ""}
              />
            </div>
            <div>
              <Label>Secondary Field Positions</Label>
              <FieldPositionSelect />
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button type="button" onClick={onSaveChanges} disabled={isLoading}>
            {isLoading ? "Wait..." : "Save changes"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default FieldPositionModal;

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

function FieldPositionModal() {
  const { data } = useSession();
  const { selectedPlayer, setSelectedPlayer, patchPlayerFieldPositions } =
    usePlayersStore((state) => state);
  const handleOpenChange = (open: boolean) => {
    if (!open) setSelectedPlayer(null);
  };

  const onSaveChanges = () => {
    console.log(selectedPlayer);
    if (!data) return;
    patchPlayerFieldPositions(data.user.access_token);
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
            Edit field position for {selectedPlayer?.firstName}{" "}
            {selectedPlayer?.lastName}
          </DialogTitle>
          <DialogDescription>
            Change your field position to improve your performance
          </DialogDescription>
        </DialogHeader>
        <div className="min-h-[400px]">
          <div className="flex flex-col gap-5">
            <div className="flex gap-2 items-center">
              <Label>Primary Position</Label>
              <FieldPositionCombo
                defaultValue={selectedPlayer?.favPosition?.id ?? ""}
              />
            </div>
            <div>
              <Label>Secondary Field Positions</Label>
              <FieldPositionSelect />
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button type="button" onClick={onSaveChanges}>
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default FieldPositionModal;

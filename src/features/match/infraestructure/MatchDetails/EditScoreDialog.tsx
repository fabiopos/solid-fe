import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { FulfilledMatch } from "../../domain/match.schema";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useCallback } from "react";
import { useMatchDetailsStore } from "@/context/MatchDetailsCtx";
import { useSession } from "next-auth/react";
interface EditScoreDialogProps {
  match: FulfilledMatch;
  open: boolean;
  onOpenChange: (state: boolean) => void;
}
export function EditScoreDialog({
  match,
  open,
  onOpenChange,
}: EditScoreDialogProps) {
  const { data } = useSession();
  const { setScore, formattedScore, putScore, scoreRequestStatus } =
    useMatchDetailsStore((state) => state);

  const handleSaveChanges = useCallback(() => {
    if (!data) return;
    putScore(data.user.access_token).then(() => onOpenChange(false));
  }, [data, putScore, onOpenChange]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Score</DialogTitle>
          <DialogDescription>Make changes to match score.</DialogDescription>
        </DialogHeader>
        <div className="grid grid-rows-2 gap-4 py-4 justify-center">
          <div className="flex gap-2">
            <span>{match.homeTeam?.name}</span>
            <span>vs</span>
            <span>{match.awayTeam?.name}</span>
          </div>
          <InputOTP maxLength={2} value={formattedScore} onChange={setScore}>
            <InputOTPGroup>
              <InputOTPSlot index={0} />
            </InputOTPGroup>
            <InputOTPSeparator />
            <InputOTPGroup>
              <InputOTPSlot index={1} />
            </InputOTPGroup>
          </InputOTP>
        </div>
        <DialogFooter>
          <Button
            type="button"
            disabled={scoreRequestStatus === "IN_PROGRESS" || !formattedScore}
            onClick={handleSaveChanges}
          >
            {scoreRequestStatus === "IN_PROGRESS" ? "Wait..." : "Save changes"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CheckCheck, Clock, Ellipsis, Loader, Trash } from "lucide-react";
import { useSession } from "next-auth/react";
import { useParams, useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { EmptyMatch, FulfilledMatch } from "../domain/match.schema";
import { useMatchStore } from "@/context/MatchCtx";
import MatchEditDrawer from "./MatchEditDrawer";

interface MatchTriggerIconProps {
  match: FulfilledMatch;  
}
function MatchTriggerIcon({ match }: MatchTriggerIconProps) {
  const { competitionId } = useParams();
  const { data } = useSession();
  const { patchingStatus, deletingStatus, patchMatch, deleteMatch } = useMatchStore(
    (state) => state
  );
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const handleOpenDrawer = () => {
    // setSelectedCompetition(competition);
    setOpen(true);
  };
  const handleCloseDrawer = () => {
    // setSelectedCompetition(null);
    setOpen(false);
  };
  const handleSetDown = (id: string, completed: boolean) => {
    patchMatch(
      id,
      EmptyMatch.make({
        ...match,
        completed,
      }),
      data?.user.access_token ?? ""
    );
  };
  const handleDelete = (id: string) => {
    deleteMatch(id, data?.user.access_token ?? "");
  };

  const isLoading = useMemo(() => {
    return (
      patchingStatus.id === match.id && patchingStatus.status === "IN_PROGRESS"
    );
  }, [patchingStatus, match]);

  const isDeleting = useMemo(() => {
    return (
      deletingStatus.id === match.id && deletingStatus.status === "IN_PROGRESS"
    );
  }, [deletingStatus, match]);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger>
          {isLoading || isDeleting ? <Loader className="animate-spin" /> : <Ellipsis />}
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel className="text-neutral-400 text-xs">
            Actions
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => router.push(`/matches/${match.id}`)}>
            <div className="grid grid-cols-[150px_10px] items-center gap-2">
              <span>View Match Details</span>
            </div>
          </DropdownMenuItem>

          <DropdownMenuItem onClick={() => handleOpenDrawer()}>
            <div className="grid grid-cols-[150px_10px] items-center gap-2">
              <span>Edit match details</span>
            </div>
          </DropdownMenuItem>

          <DropdownMenuLabel className="text-neutral-400 text-xs">
            Competition Status
          </DropdownMenuLabel>
          <DropdownMenuItem
            disabled={!match.completed}
            onClick={() => handleSetDown(match.id!, false)}
          >
            <div className="grid grid-cols-[150px_10px] items-center gap-2">
              <span>Set as Scheduled</span>
              <Clock className="text-blue-400" />
            </div>
          </DropdownMenuItem>

          <DropdownMenuItem
            disabled={match.completed}
            onClick={() => handleSetDown(match.id!, true)}
          >
            <div className="grid grid-cols-[150px_10px] items-center gap-2">
              <span>Set as completed</span>
              <CheckCheck className="text-green-600" />
            </div>
          </DropdownMenuItem>

          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => handleDelete(match.id!)}>
            <div className="grid grid-cols-[150px_10px] items-center gap-2">
              <span>Delete this match</span>
              <Trash className="text-red-600" />
            </div>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <MatchEditDrawer
        match={match}
        open={open}
        onClose={handleCloseDrawer}
        competitionId={competitionId as string}
        // competition={selectedCompetition}
      />
    </>
  );
}

export default MatchTriggerIcon;

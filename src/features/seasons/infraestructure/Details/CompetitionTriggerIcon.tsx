"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useCompetitionStore } from "@/context/CompetitionCtx";
import {
  EmptyCompetition,
  FulfilledCompetition,
} from "@/features/competition/domain/competition.schema";
import CompetitionEditDrawer from "@/features/competition/infraestructure/CompetitionEditDrawer";
import { CompetitionStatusEnum } from "@/shared/enums/competitionStatusEnum";
import {
  Ban,
  Check,
  CheckCheckIcon,
  Ellipsis,
  Loader,
  Trash,
} from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";

interface CompetitionTriggerIconProps {
  competition: FulfilledCompetition;
}
function CompetitionTriggerIcon({ competition }: CompetitionTriggerIconProps) {
  const { data } = useSession();
  const {
    selectedCompetition,
    setSelectedCompetition,
    patchCompetition,
    deleteCompetition,
    patchingStatus,
  } = useCompetitionStore((state) => state);
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const handleOpenDrawer = () => {
    setSelectedCompetition(competition);
    setOpen(true);
  };
  const handleCloseDrawer = () => {
    setSelectedCompetition(null);
    setOpen(false);
  };
  const handleSetDown = (id: string, status: CompetitionStatusEnum) => {
    patchCompetition(
      id,
      EmptyCompetition.make({
        ...competition,
        startDate: undefined,
        endDate: undefined,
        status,
      }),
      data?.user.access_token ?? ""
    );
  };
  const handleDelete = (id: string) => {
    deleteCompetition(id, data?.user.access_token ?? "");
  };

  const isLoading = useMemo(() => {
    return (
      patchingStatus.id === competition.id &&
      patchingStatus.status === "IN_PROGRESS"
    );
  }, [patchingStatus, competition]);
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger>
          {isLoading ? <Loader className="animate-spin" /> : <Ellipsis />}
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel className="text-neutral-400 text-xs">
            Actions
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => router.push(`/competitions/${competition.id}`)}
          >
            <div className="grid grid-cols-[150px_10px] items-center gap-2">
              <span>View Matches</span>
            </div>
          </DropdownMenuItem>

          <DropdownMenuItem onClick={() => handleOpenDrawer()}>
            <div className="grid grid-cols-[150px_10px] items-center gap-2">
              <span>Edit details</span>
            </div>
          </DropdownMenuItem>

          <DropdownMenuLabel className="text-neutral-400 text-xs">
            Competition Status
          </DropdownMenuLabel>
          <DropdownMenuItem
            disabled={competition.status === CompetitionStatusEnum.COMPLETED}
            onClick={() =>
              handleSetDown(competition.id!, CompetitionStatusEnum.COMPLETED)
            }
          >
            <div className="grid grid-cols-[150px_10px] items-center gap-2">
              <span>Set as completed</span>
              <CheckCheckIcon className="text-green-600" />
            </div>
          </DropdownMenuItem>

          <DropdownMenuItem
            disabled={competition.status === CompetitionStatusEnum.IN_PROGRESS}
            onClick={() =>
              handleSetDown(competition.id!, CompetitionStatusEnum.IN_PROGRESS)
            }
          >
            <div className="grid grid-cols-[150px_10px] items-center gap-2">
              <span>Set as in progress</span>
              <Check className="text-orange-600" />
            </div>
          </DropdownMenuItem>

          <DropdownMenuItem
            disabled={competition.status === CompetitionStatusEnum.CANCELLED}
            onClick={() =>
              handleSetDown(competition.id!, CompetitionStatusEnum.CANCELLED)
            }
          >
            <div className="grid grid-cols-[150px_10px] items-center gap-2">
              <span>Set as cancelled</span>
              <Ban className="text-red-600" />
            </div>
          </DropdownMenuItem>

          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => handleDelete(competition.id!)}>
            <div className="grid grid-cols-[150px_10px] items-center gap-2">
              <span>Delete this competition</span>
              <Trash className="text-red-600" />
            </div>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <CompetitionEditDrawer
        open={open}
        onClose={handleCloseDrawer}
        competition={selectedCompetition}
      />
    </>
  );
}

export default CompetitionTriggerIcon;

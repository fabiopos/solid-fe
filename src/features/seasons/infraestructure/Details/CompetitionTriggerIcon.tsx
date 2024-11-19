"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CompetitionType } from "@/features/competition/domain/competition.schema";
import { CompetitionStatusEnum } from "@/shared/enums/competitionStatusEnum";
import { Ban, Check, CheckCheckIcon, Ellipsis, Trash } from "lucide-react";
import { useRouter } from "next/navigation";

interface CompetitionTriggerIconProps {
  competition: CompetitionType;
}
function CompetitionTriggerIcon({ competition }: CompetitionTriggerIconProps) {
  const router = useRouter();
  const handleOpenDrawer = () => {};
  const handleSetDown = (id: string, status: CompetitionStatusEnum) => {};
  const handleDelete = (id: string) => {};
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Ellipsis />
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

      {/* <SeasonEditDrawer open={open} onClose={handleCloseDrawer} /> */}
    </>
  );
}

export default CompetitionTriggerIcon;

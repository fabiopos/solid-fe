"use client";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import {
  Ban,
  Check,
  CheckCheckIcon,
  Ellipsis,
  Loader,
  Trash,
} from "lucide-react";
import { FulfilledSeason, PartialSeason } from "../../domain/season.schema";
import { SeasonStatusEnum } from "@/shared/enums/seasonStatusEnum";
import { useCallback, useState } from "react";
import { useSeasonStore } from "@/context/SeasonCtx";
import { useSession } from "next-auth/react";
import { toDate } from "date-fns";
import SeasonDrawer from "./SeasonDrawer";

interface SeasonActionTriggerIconProps {
  season: FulfilledSeason;
}
function SeasonActionTriggerIcon(props: SeasonActionTriggerIconProps) {
  const { data } = useSession();
  const [open, setOpen] = useState(false)

  const {
    setSeasonStatus,
    updateSeason,
    seasonStatusUpdate,
    deleteSeason,
    seasonStatusDelete,
    setSelectedSeason,
    selectedSeason,
  } = useSeasonStore((state) => state);
  const { season } = props;

  const handleSetDown = useCallback(
    (seasonId: string, status: SeasonStatusEnum) => {
      setSeasonStatus(seasonId, status);
      updateSeason(
        seasonId,
        PartialSeason.make({
          ...season,
          startDate: season.startDate ? toDate(season.startDate) : null,
          endDate: season.endDate ? toDate(season.endDate) : null,
          status: status,
        }),
        data?.user.access_token ?? ""
      );
    },
    []
  );

  const handleDelete = useCallback((seasonId: string) => {
    deleteSeason(seasonId, data?.user.access_token ?? "");
  }, []);

  const handleOpenDrawer = useCallback(() => {
    setSelectedSeason(season.id);
    setOpen(true)
  }, []);

  const handleCloseDrawer = useCallback(() => {
    setSelectedSeason(undefined);
    setOpen(false)
  }, []);

  if (
    seasonStatusUpdate.id === season.id &&
    seasonStatusUpdate.status === "IN_PROGRESS"
  ) {
    return <Loader className="animate-spin" />;
  }

  if (
    seasonStatusDelete.id === season.id &&
    seasonStatusDelete.status === "IN_PROGRESS"
  ) {
    return <Loader className="animate-spin" />;
  }

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
          <DropdownMenuItem>
            <div className="grid grid-cols-[120px_10px] items-center gap-2">
              <span>View Competitions</span>
            </div>
          </DropdownMenuItem>

          <DropdownMenuItem onClick={() => handleOpenDrawer()}>
            <div className="grid grid-cols-[120px_10px] items-center gap-2">
              <span>Edit details</span>
            </div>
          </DropdownMenuItem>

          <DropdownMenuLabel className="text-neutral-400 text-xs">
            Season Status
          </DropdownMenuLabel>
          <DropdownMenuItem
            disabled={season.status === SeasonStatusEnum.COMPLETED}
            onClick={() =>
              handleSetDown(season.id!, SeasonStatusEnum.COMPLETED)
            }
          >
            <div className="grid grid-cols-[110px_10px] items-center gap-2">
              <span>Set as completed</span>
              <CheckCheckIcon className="text-green-600" />
            </div>
          </DropdownMenuItem>

          <DropdownMenuItem
            disabled={season.status === SeasonStatusEnum.IN_PROGRESS}
            onClick={() =>
              handleSetDown(season.id!, SeasonStatusEnum.IN_PROGRESS)
            }
          >
            <div className="grid grid-cols-[110px_10px] items-center gap-2">
              <span>Set as in progress</span>
              <Check className="text-orange-600" />
            </div>
          </DropdownMenuItem>

          <DropdownMenuItem
            disabled={season.status === SeasonStatusEnum.CANCELLED}
            onClick={() =>
              handleSetDown(season.id!, SeasonStatusEnum.CANCELLED)
            }
          >
            <div className="grid grid-cols-[110px_10px] items-center gap-2">
              <span>Set as cancelled</span>
              <Ban className="text-red-600" />
            </div>
          </DropdownMenuItem>

          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => handleDelete(season.id!)}>
            <div className="grid grid-cols-[110px_10px] items-center gap-2">
              <span>Delete this season</span>
              <Trash className="text-red-600" />
            </div>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <SeasonDrawer open={open} onClose={handleCloseDrawer} />
    </>
  );
}

export default SeasonActionTriggerIcon;

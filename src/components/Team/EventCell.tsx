import SoccerBall from "@/components/Icons/SoccerBall";
import { format } from "date-fns";
import { DayContentProps } from "react-day-picker";
import { twMerge } from "tailwind-merge";

interface EventCellProps extends DayContentProps {
  selectedClassName?: string;
}

export default function EventCell({
  activeModifiers,
  date,
  selectedClassName,
}: EventCellProps) {
  return (
    <>
      {!activeModifiers.today &&
      Object.keys(activeModifiers).length > 0 &&
      !activeModifiers.outside &&
      !activeModifiers.disabled ? (
        <div
          className={twMerge(
            "flex flex-col items-center justify-center",
            selectedClassName
          )}
        >
          <span>{format(date, "d")}</span>
          {/* <SoccerBall size={10} /> */}
          <SoccerBall width={10} height={10} />
        </div>
      ) : (
        format(date, "d")
      )}
    </>
  );
}

import SoccerBall from "@/components/Icons/SoccerBall";
import { format } from "date-fns";
import { Effect, pipe } from "effect";
import { useCallback, useMemo } from "react";
import { ActiveModifiers, DayContentProps } from "react-day-picker";
import { twMerge } from "tailwind-merge";

interface EventCellProps extends DayContentProps {
  selectedClassName?: string;
}

export default function EventCell({
  activeModifiers,
  date,
  selectedClassName,
}: EventCellProps) {
  const isToday = useCallback((mods: ActiveModifiers) => !!mods.today, []);
  const hasModifiers = useCallback(
    (mods: ActiveModifiers) => Object.keys(mods).length > 0,
    []
  );
  const hasModifiersUuid = useCallback(
    (mods: ActiveModifiers) => Object.keys(mods).some((x) => x.length > 30),
    []
  );
  const isOutside = useCallback((mods: ActiveModifiers) => !!mods.outside, []);

  const showEvent = useMemo(() => {
    return pipe(
      activeModifiers,
      ()=> Effect.succeed(hasModifiers(activeModifiers)).pipe(
        Effect.if({
          onTrue: ()=> Effect.succeed(!isToday(activeModifiers)),
          onFalse: ()=> Effect.succeed(false)
        }),
        Effect.if({
          onTrue: ()=> Effect.succeed(!isOutside(activeModifiers)),
          onFalse: ()=> Effect.succeed(false)
        }),
        Effect.if({
          onTrue: ()=> Effect.succeed(hasModifiersUuid(activeModifiers)),
          onFalse: ()=> Effect.succeed(false)
        })        
      ),
      Effect.runSync      
    );
  }, [activeModifiers, hasModifiers, hasModifiersUuid, isOutside, isToday]);

  return (
    <>
      {showEvent ? (
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

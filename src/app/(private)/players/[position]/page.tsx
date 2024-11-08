"use client";
import { Separator } from "@/components/ui/separator";
import { positionsCategories } from "@/constants/fieldPosition";
import PlayerList from "@/features/players/infraestructure/PlayerList";
import { useParams } from "next/navigation";
import { useMemo } from "react";

const DEFAULT_TITLE = "All Players";

const PlayersByPositionPage = () => {
  const { position } = useParams();

  const category = useMemo(() => {
    if (!position) return;
    return positionsCategories.find(
      (x) =>
        x.key.toString().toUpperCase() === position?.toString().toUpperCase()
    );
  }, [position]);

  const pageTitle = useMemo(() => {
    if (!category) return DEFAULT_TITLE;

    return category?.title;
  }, [category]);

  return (
    <div className="p-5">
      <h2 className="text-3xl">{pageTitle ?? "All Players"}</h2>
      <Separator className="mb-5" />
      <PlayerList />
    </div>
  );
};

export default PlayersByPositionPage;

import {DropZone} from "./DropZone";
import {usePlayersStore} from "@/context/PlayersCtx";

const positions = [
    {id: "gk", label: "Goalkeeper"},
    {id: "cb1", label: "Center Back 1"},
    {id: "cb2", label: "Center Back 2"},
    {id: "cb3", label: "Center Back 3"},
    {id: "cm1", label: "Midfielder 1"},
    {id: "cm2", label: "Midfielder 2"},
    {id: "cm3", label: "Midfielder 3"},
    {id: "cf1", label: "Forward 1"},
];


export function LineupField() {
    const fullLineup = usePlayersStore((s) => s.lineup);
    const teamId = usePlayersStore((s) => s.teamId);
    const resetLineup = usePlayersStore((s) => s.resetLineup);

    const handleSave = () => {
        const payload = Object.entries(fullLineup)
            .filter(([, player]) => player != null)
            .map(([positionId, player]) => ({
                positionId,
                playerId: String(player!.id),
            }));

        console.log("Alineación a guardar en LocalStorage", {
            teamId,
            positions: payload,
        })
    }

    return (
        <>
            <div
                className="py-8 bg-green-800 flex flex-wrap justify-center gap-6 rounded-2xl"
            >
                {positions.map((pos) => (
                    <div
                        key={pos.id}
                        className={pos.id === "gk" ? "w-full flex justify-center" : "w-auto"}
                    >
                        <DropZone
                            id={pos.id}
                            label={pos.label}
                        />
                    </div>
                ))}
            </div>
            <div className="mt-4 flex justify-center items-center space-x-4">
                <button onClick={handleSave} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                    Save lineup
                </button>
                <button onClick={resetLineup} className="bg-red-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                    Reset lineup
                </button>
            </div>
        </>
    );
}
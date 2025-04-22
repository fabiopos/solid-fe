import {DropZone} from "./DropZone";
import {usePlayersStore} from "@/context/PlayersCtx";
import {ApiClient} from "@/lib/ApiClient";
import {LineupCreate} from "@/features/players/application/LineupCreate";

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
    const lineup = usePlayersStore((s) => s.lineup);
    const teamId = usePlayersStore((s) => s.teamId);

    const handleSave = async () => {
        const payload = Object.entries(lineup)
            .filter(([, player]) => player != null)
            .map(([positionId, player]) => ({
                positionId,
                playerId: String(player!.id),
            }));

        const client = new ApiClient();
        const lineupCreate = new LineupCreate(client);

        const result = await lineupCreate.createLineup({teamId, positions: payload});
        if (result) {
            alert("✅ Alineación guardada");
        } else {
            alert("❌ Error al guardar alineación");
        }

        console.log("Alineación a guardar", {
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
            <div className="mt-4 flex justify-center">
                <button onClick={handleSave} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                    Save lineup
                </button>
            </div>
        </>
    );
}
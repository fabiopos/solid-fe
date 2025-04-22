import {ApiClient} from "@/lib/ApiClient";

interface LineupPayload {
    teamId: string;
    positions: {
        positionId: string;
        playerId: string;
    }[];
}

export class LineupCreate {
    constructor(private readonly client: ApiClient) {
    }

    async createLineup(payload: LineupPayload) {
        try {
            const res = await this.client.POST(`player-position/lineup`, payload);
            if (!res.ok) return null;
            return await res.json();
        } catch (err) {
            console.error("Error de red o inesperado", err);
            return null;
        }
    }
}
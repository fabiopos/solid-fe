import { EmptyPlayer } from "@/features/players/domain/player.effect.schema";
import { NewPlayer } from "@/stores/player/playerInvite-slice";
import { DocumentType, DominantFoot } from "@/types/types.common";

export function mapToEmptyPlayer(newPlayer: NewPlayer, teamId: string) {
  const { avatarFile, avatarUrl, ...restNewPlayer } = newPlayer;
  return EmptyPlayer.make({
    ...restNewPlayer,
    documentType: newPlayer?.documentType as DocumentType,
    teamId,
    shirtName: newPlayer.nameOnShirt,
    dominantFoot: DominantFoot.RIGHT, // TODO: add this to the form
    arl: newPlayer.riskInsurance,
    eps: newPlayer.healthProvider,
    bornDate: newPlayer.birthDate,
  });
}

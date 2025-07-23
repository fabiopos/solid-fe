import { FulfilledTeam } from "@/features/teams/domain/team.schema";
import { validateTeamInvite } from "@/services/team/program/team.post";
import { mutationOptions } from "@tanstack/react-query";
import { Effect } from "effect";

interface ValidateInviteMutationOptionsParams {
  onSuccess?: (
    data: FulfilledTeam,
    variables: { teamId: string },
    ctx: unknown
  ) => void;
}
export const validateInviteMutationOptions = ({
  onSuccess,
}: ValidateInviteMutationOptionsParams) =>
  mutationOptions({
    mutationFn: ({ teamId }: { teamId: string }) =>
      Effect.runPromise(validateTeamInvite({ teamId })),
    onSuccess,
    onError: (error) => {
      console.error("Error validating team invite:", error);
    },
  });

// interface ValidateInviteQueryOptionsParams {
//   sid: string;
//   tid: string;
// }

// export const validateInviteQueryOptions = ({
//   sid,
//   tid,
// }: ValidateInviteQueryOptionsParams) =>
//   queryOptions({
//     queryFn: () => Effect.runPromise(queryTeamInvite({ teamId, sid })),
//   });

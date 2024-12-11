import { getCookieTeamId } from "@/app/actions";
import { auth } from "@/auth";
import { H1 } from "@/components/ui/typograhpy";
import { CompetitionStoreProvider } from "@/context/CompetitionCtx";
import { CompetitionGet } from "@/features/competition/application/CompetitionGet";
import SeasonCompetitionCard from "@/features/seasons/infraestructure/Details/SeasonCompetitionCard";
import { ApiClient } from "@/lib/ApiClient";

async function MatchesPage() {
  const allCompetitions = await getAllCompetitionsByTeam();
  return (
    <CompetitionStoreProvider season={null} allCompetitions={allCompetitions}>
      <div>
        <H1>All Competitions</H1>        
        <div className="grid grid-cols-2 gap-2 my-2">
          {allCompetitions?.map((c) => (
            <div key={c.id}>
              <SeasonCompetitionCard competition={c} />
            </div>
          ))}
        </div>
      </div>
    </CompetitionStoreProvider>
  );
}

async function getAllCompetitionsByTeam() {
  const teamId = await getCookieTeamId();

  if (!teamId) return;

  const session = await auth();

  if (!session) return;
  const token = session.user.access_token;
  const compClient = new CompetitionGet(new ApiClient());
  const competitions = await compClient.getAllByTeam(teamId, token);  
  return competitions;
}

export default MatchesPage;

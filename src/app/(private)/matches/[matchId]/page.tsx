async function MatchDetailsPage({ params }: { params: { matchId: string } }) {
  const { matchId } = await params;
  const match = await getMatchDetails(matchId);
  return <div>MatchDetailsPage {match.matchId}</div>;
}

async function getMatchDetails(matchId: string) {
  return { matchId };
}
export default MatchDetailsPage;

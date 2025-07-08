import { getLastMatches } from "@/actions/dashboard.actions";
import LastMatchesFt from "@/features/dashboard/infraestructure/LastMatchesFt";
import { Effect } from "effect";

async function LastMatchesSection() {
  const { lastMatches } = await getData();
  return <LastMatchesFt lastMatches={lastMatches} />;
}

async function getData() {
  try {
    const lastMatches = await Effect.runPromise(getLastMatches()());
    return { lastMatches };
  } catch (error) {
    console.log(error);
    return { lastMatches: [] };
  }
}

export default LastMatchesSection;

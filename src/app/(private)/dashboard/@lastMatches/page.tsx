import { getLastMatches } from "@/actions/dashboard.actions";
import LastMatchesFt from "@/features/dashboard/infraestructure/LastMatchesFt";
import { Effect } from "effect";

async function LastMatchesSection() {
  const { lastMatches } = await getData();
  return <LastMatchesFt lastMatches={lastMatches} />;
}

async function getData() {
  try {
    const program = getLastMatches()();
    const lastMatches = await Effect.runPromise(
      program.pipe(
        Effect.catchTags({
          NoAuthError: (e) => {
            return Effect.fail(e);
          },
          NoTokenError: (e) => {
            return Effect.fail(e);
          },
        })
      )
    );
    return { lastMatches };
  } catch (error) {
    console.log("Error =>", error);
    return { lastMatches: [] };
  }
}

export default LastMatchesSection;

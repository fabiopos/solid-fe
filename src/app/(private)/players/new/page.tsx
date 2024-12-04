import { NewPlayerStoreProvider } from "@/context/NewPlayerCtx";
import NewPlayer from "@/features/players/infraestructure/NewPlayer/NewPlayer";

function NewPlayerPage() {
  return (
    <NewPlayerStoreProvider>
      <NewPlayer />
    </NewPlayerStoreProvider>
  );
}

export default NewPlayerPage;

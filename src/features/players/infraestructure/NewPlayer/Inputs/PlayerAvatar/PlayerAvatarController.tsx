import { useNewPlayerStore } from "@/context/NewPlayerCtx";
import PlayerAvatarInput from "./PlayerAvatarInputView";

function PlayerAvatarController() {
  const { setAvatarFile, setAvatarUrl, avatarUrl } = useNewPlayerStore(
    (state) => state
  );
  return (
    <PlayerAvatarInput
      avatarUrl={avatarUrl}
      setAvatarFile={setAvatarFile}
      setAvatarUrl={setAvatarUrl}
    />
  );
}

export default PlayerAvatarController;

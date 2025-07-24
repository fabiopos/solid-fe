import { useNewPlayerStore } from "@/context/NewPlayerCtx";
import FavPositionSelectView from "./FavPositionSelectView";

function FavPositionSelectController() {
  const { favPosition, setFavFieldPosition } = useNewPlayerStore(
    (state) => state
  );
  return (
    <FavPositionSelectView
      favPosition={favPosition}
      setFavFieldPosition={setFavFieldPosition}
    />
  );
}

export default FavPositionSelectController;

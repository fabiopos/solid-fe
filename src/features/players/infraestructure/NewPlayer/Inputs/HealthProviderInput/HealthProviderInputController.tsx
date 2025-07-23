import { useNewPlayerStore } from "@/context/NewPlayerCtx";
import HealthProviderInputView from "./HealthProviderInputView";

function HealthProviderInputController() {
  const { healthProvider, setHealthProvider } = useNewPlayerStore(
    (state) => state
  );
  return (
    <HealthProviderInputView
      healthProvider={healthProvider}
      setHealthProvider={setHealthProvider}
    />
  );
}

export default HealthProviderInputController;

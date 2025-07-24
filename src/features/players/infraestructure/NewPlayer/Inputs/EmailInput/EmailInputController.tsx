import { useNewPlayerStore } from "@/context/NewPlayerCtx";
import EmailInputView from "./EmailInput";

function EmailInputController() {
  const { email, setEmail, isValidEmail } = useNewPlayerStore((state) => state);
  return (
    <EmailInputView
      email={email}
      isValidEmail={isValidEmail}
      setEmail={setEmail}
    />
  );
}

export default EmailInputController;

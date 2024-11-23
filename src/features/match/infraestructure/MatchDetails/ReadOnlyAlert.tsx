import { Alert } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

function ReadOnlyAlert() {
  return (
    <Alert>
      <div className="flex gap-5">
        <AlertCircle />
        <p>Your team is not in this match, you cannot edit match details</p>
      </div>
    </Alert>
  );
}

export default ReadOnlyAlert;

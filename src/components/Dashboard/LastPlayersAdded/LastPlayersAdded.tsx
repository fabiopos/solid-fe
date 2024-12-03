import { Avatar } from "@/components/ui/avatar";
import { AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";

function LastPlayersAdded() {
  return (
    <div className="space-y-5">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-5">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback> FP </AvatarFallback>
          </Avatar>
          <span>Fabio Posada</span>
        </div>
        <span className="text-slate-500">28 jun, 2005</span>
      </div>

      <div className="flex justify-between items-center">
        <div className="flex items-center gap-5">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback> FP </AvatarFallback>
          </Avatar>
          <span>Fabio Posada</span>
        </div>
        <span className="text-slate-500">28 jun, 2005</span>
      </div>
    </div>
  );
}

export default LastPlayersAdded;

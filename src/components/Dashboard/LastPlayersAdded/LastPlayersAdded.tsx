import { Avatar } from "@/components/ui/avatar";
import { AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";

function LastPlayersAdded() {
  return (
    <ul>
      <li>
        <div className="flex justify-between">
          <div className="flex gap-2">
            <Avatar>
              <AvatarImage />
              <AvatarFallback> FP </AvatarFallback>
            </Avatar>
            <span>Fabio Posada</span>
          </div>
          <span className="text-slate-500">28 jun, 2005</span>
        </div>
      </li>
      <li>
        <div className="flex justify-between">
          <div className="flex gap-2">
            <Avatar>
              <AvatarImage />
              <AvatarFallback> PN </AvatarFallback>
            </Avatar>
            <span>Paolo de Nicola</span>
          </div>
          <span className="text-slate-500">23 may, 2005</span>
        </div>
      </li>
    </ul>
  );
}

export default LastPlayersAdded;

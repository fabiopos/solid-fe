import { Avatar } from "@/components/ui/avatar";
import { AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";

function TopScorers() {
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
          <span className="text-slate-500">3</span>
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
          <span className="text-slate-500">2</span>
        </div>
      </li>
    </ul>
  );
}

export default TopScorers;

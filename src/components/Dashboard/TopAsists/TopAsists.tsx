import { Avatar } from "@/components/ui/avatar";
import { AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";

function TopAsists() {
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
      <span className="text-slate-500">4 goals</span>
    </div>

    <div className="flex justify-between items-center">
      <div className="flex items-center gap-5">
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback> FP </AvatarFallback>
        </Avatar>
        <span>Fabio Posada</span>
      </div>
      <span className="text-slate-500">2 goals</span>
    </div>
  </div>
  );
}

export default TopAsists;
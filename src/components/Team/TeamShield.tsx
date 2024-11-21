import { Shield } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

function TeamShieldAvatar({ src }: { src: string | null | undefined }) {
  return (
    <Avatar>
      <AvatarImage src={src ?? ""} className="object-scale-down" />
      <AvatarFallback>
        <Shield />
      </AvatarFallback>
    </Avatar>
  );
}

export default TeamShieldAvatar;

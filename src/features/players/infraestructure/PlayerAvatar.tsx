import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface PlayerAvatarProps {
  imageUrl: string | null | undefined;
  fallback: string;
}

// "https://cdn.cloudflare.steamstatic.com/steamcommunity/public/images/avatars/d6/d685ba1f50f4f47e24e193e611b5196fdfc9e7ef_full.jpg"

export default function PlayerAvatar({
  imageUrl,
  fallback,
}: PlayerAvatarProps) {
  return (
    <Avatar>
      <AvatarImage src={imageUrl ?? ''} className="object-cover" />
      <AvatarFallback>{fallback}</AvatarFallback>
    </Avatar>
  );
}

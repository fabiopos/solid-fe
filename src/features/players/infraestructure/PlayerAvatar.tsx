import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface PlayerAvatarProps {
  imageUrl: string | null;
  fallback: string;
}

export default function PlayerAvatar({
  imageUrl,
  fallback,
}: PlayerAvatarProps) {
  return (
    <Avatar>
      <AvatarImage
        src={
          imageUrl ??
          "https://cdn.cloudflare.steamstatic.com/steamcommunity/public/images/avatars/d6/d685ba1f50f4f47e24e193e611b5196fdfc9e7ef_full.jpg"
        }
      />
      <AvatarFallback>{fallback}</AvatarFallback>
    </Avatar>
  );
}

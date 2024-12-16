import PlayerFileInput from "@/components/Player/PlayerImageInput";
import { usePlayerDetailsStore } from "@/context/PlayerDetailsCtx";
import { useSession } from "next-auth/react";
import Image from "next/image";
import React, { useCallback } from "react";

interface EditPlayerAvatarInputProps {
  avatarUrl?: string | null;
  pid: string;
}
function EditPlayerAvatarInput({ pid, avatarUrl }: EditPlayerAvatarInputProps) {
  const { data } = useSession();
  const { setAvatarUrl, putAvatar } = usePlayerDetailsStore((state) => state);
  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!data) return;
      if (!e.target.files) return;
      const file = e.target.files[0];
      if (!file) return;
      putAvatar(pid, file, data.user.access_token);
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setAvatarUrl(String(reader.result));
      };
    },
    [data]
  );
  return (
    <div className="border border-slate-300 rounded-lg p-2 flex flex-col items-center justify-center">
      {avatarUrl ? (
        <Image src={avatarUrl} width={100} height={100} alt="avatar url" />
      ) : (
        <div className="flex min-h-[200px] items-center justify-center ">
          Choose a photo
        </div>
      )}
      <PlayerFileInput
        label="Choose Photo"
        name="photo"
        onChange={handleFileChange}
      />
    </div>
  );
}

export default EditPlayerAvatarInput;

"use client";
import PlayerFileInput from "@/components/Player/PlayerImageInput";
import { useNewPlayerStore } from "@/context/NewPlayerCtx";
import Image from "next/image";
import React, { useCallback, useState } from "react";

function PlayerAvatarInput() {
  const { setAvatarUrl, avatarUrl, setAvatarFile } = useNewPlayerStore((state) => state);
  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!e.target.files) return;
      const file = e.target.files[0];
      if(!file) return;
      setAvatarFile(file)
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setAvatarUrl(String(reader.result));
      };
    },
    []
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

export default PlayerAvatarInput;

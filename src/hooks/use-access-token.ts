import { useAuthStore } from "@/context/AuthCtx";

export const useAccessToken = () => {
  const { session } = useAuthStore((state) => state);
  const access_token = session?.user.access_token;
  return access_token;
};

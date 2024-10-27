"use client";

import { useSession } from "next-auth/react";

export default function Landing() {
  const { data } = useSession();
  return <div>{data && <pre>{JSON.stringify(data)}</pre>}</div>;
}

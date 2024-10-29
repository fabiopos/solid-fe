"use client";

import { useSession } from "next-auth/react";

export default function Landing() {
  const { data } = useSession();
  return (
    <div>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis eveniet
      commodi placeat.
      {/* {data && <pre>{JSON.stringify(data, null, 2)}</pre>} */}
    </div>
  );
}

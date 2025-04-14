import {useEffect, useState} from "react";

export function useMediaQuery(query: string): boolean {
    const [matches, setMatches] = useState(false);

    useEffect(() => {

        if (typeof window === "undefined") return;

        const media = window.matchMedia(query);
        const handler = () => setMatches(media.matches);

        handler();
        media.addEventListener("change", handler);

        return () => media.removeEventListener("change", handler);
    }, [query]);

    return matches;
}
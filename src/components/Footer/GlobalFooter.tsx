"use client";
import {useSession} from "next-auth/react";
import PublicFooter from "@/components/Footer/PublicFooter";


const GlobalFooter = () => {
    const {status} = useSession();
    switch (status) {
        case "authenticated":
            return (
                <></>
            );
        case "unauthenticated":
            return (
                <PublicFooter/>
            );
        case "loading":
            return null;
    }
};

export default GlobalFooter;

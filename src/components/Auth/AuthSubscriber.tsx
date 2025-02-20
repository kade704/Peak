"use client";

import { getProfileFromId } from "@/actions/profiles";
import { useAuthStore } from "@/stores/auth";
import { supabaseBrowserClient } from "@/supabase/supabaseClient";
import { useEffect } from "react";

const AuthSubscriber = () => {
    const setProfile = useAuthStore((state) => state.actions.setProfile);
    const supabaseBrowser = supabaseBrowserClient();

    useEffect(() => {
        const { data } = supabaseBrowser.auth.onAuthStateChange(async (_event, session) => {
            if (!session || !session.user) {
                setProfile(null);
                return;
            }

            const profile = await getProfileFromId(session.user.id);
            setProfile(profile);
        });

        return () => {
            data?.subscription.unsubscribe();
        };
    }, [setProfile]);

    return null;
};

export default AuthSubscriber;

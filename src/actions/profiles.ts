"use server";

import { supabaseServerClient } from "@/supabase/supabaseServer";
import { Profile } from "@/types/app.types";
import { PostgrestError } from "@supabase/supabase-js";

export const getProfileFromId = async (id: string) => {
    const supabase = await supabaseServerClient();

    const { data: profile, error }: { data: Profile | null; error: PostgrestError | null } = await supabase
        .from("profiles")
        .select()
        .eq("id", id)
        .single();

    if (error) {
        console.log(`Error getting profile for id ${id}`);
        return null;
    }

    return profile;
};

export const isExistingUsername = async (username: string) => {
    const supabase = await supabaseServerClient();

    const { data: profile }: { data: Profile | null } = await supabase
        .from("profiles")
        .select()
        .eq("username", username)
        .single();

    return profile !== null;
};

export const getProfileFromUsername = async (username: string) => {
    const supabase = await supabaseServerClient();

    username = decodeURIComponent(username);

    const { data: profile, error }: { data: Profile | null; error: PostgrestError | null } = await supabase
        .from("profiles")
        .select()
        .eq("username", username)
        .single();

    if (error) {
        console.log(`Error getting profile for username ${username}`);
        return null;
    }

    return profile;
};

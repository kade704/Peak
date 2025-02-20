"use server";

import { supabaseServerClient } from "@/supabase/supabaseServer";

export async function likePost(postid: string) {
    const supabase = await supabaseServerClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        console.log("User not signed in");
        return;
    }

    await supabase.from("likes").insert([{ post_id: parseInt(postid), profile_id: user.id }]);
}

export async function unlikePost(postid: string) {
    const supabase = await supabaseServerClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        console.log("User not signed in");
        return;
    }

    await supabase.from("likes").delete().eq("post_id", parseInt(postid)).eq("profile_id", user.id);
}

export async function isLikedPost(postid: string) {
    const supabase = await supabaseServerClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        console.log("User not signed in");
        return false;
    }

    const { data } = await supabase.from("likes").select().eq("post_id", parseInt(postid)).eq("profile_id", user.id);

    if (!data) {
        return false;
    }

    return data.length > 0;
}

export async function getPostLikeCount(postid: string) {
    const supabase = await supabaseServerClient();

    const { data } = await supabase.from("likes").select().eq("post_id", parseInt(postid));

    if (!data) {
        return 0;
    }

    return data.length;
}

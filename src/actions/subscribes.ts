"use server";

import { supabaseServerClient } from "@/supabase/supabaseServer";

export async function subscribeChannel(channelId: string) {
    const supabase = await supabaseServerClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        console.log("User not signed in");
        return;
    }

    await supabase.from("subscribes").insert([{ profile_id: user.id, channel_id: channelId }]);
}

export async function unsubscribeChannel(channelId: string) {
    const supabase = await supabaseServerClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        console.log("User not signed in");
        return;
    }

    await supabase.from("subscribes").delete().eq("profile_id", user.id).eq("channel_id", channelId);
}

export async function isSubscribed(channelId: string) {
    const supabase = await supabaseServerClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        console.log("User not signed in");
        return false;
    }

    const { data } = await supabase.from("subscribes").select("*").eq("channel_id", channelId).eq("profile_id", user.id);

    if (!data) {
        return false;
    }

    return data.length > 0;
}

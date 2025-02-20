"use server";

import { supabaseServerClient } from "@/supabase/supabaseServer";
import { ChannelItemView, SubscribeChannelView } from "@/types/app.types";
import { PostgrestError } from "@supabase/supabase-js";

export async function getChannelByID(id: string) {
    const supabase = await supabaseServerClient();

    const { data: channel, error }: { data: ChannelItemView | null; error: PostgrestError | null } = await supabase
        .from("channels_item_view")
        .select("*")
        .eq("id", id)
        .single();

    if (!channel || error) {
        console.log(`Error getting channel ${id}`);
        return null;
    }

    return channel;
}

export async function getChannels() {
    const supabase = await supabaseServerClient();
    const { data: channels, error }: { data: ChannelItemView[] | null; error: PostgrestError | null } = await supabase
        .from("channels_item_view")
        .select("*");

    if (!channels || error) {
        console.log("Error getting channels");
        return [];
    }

    return channels;
}

export async function getRecommendedChannels() {
    const supabase = await supabaseServerClient();
    const { data: channels, error }: { data: ChannelItemView[] | null; error: PostgrestError | null } = await supabase
        .from("channels")
        .select("*")
        .order("updated_at", { ascending: false })
        .limit(4);

    if (!channels || error) {
        console.log("Error getting recommended channels");
        return [];
    }

    return channels;
}

export async function getSubscribedChannels() {
    const supabase = await supabaseServerClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        console.log("User not signed in");
        return [];
    }

    const { data, error }: { data: SubscribeChannelView[] | null; error: PostgrestError | null } = await supabase
        .from("subscribes_channel_view")
        .select("*")
        .eq("profile_id", user.id);

    if (error || !data) {
        console.error("Error fetching subscribes", error);
        return [];
    }

    return data;
}

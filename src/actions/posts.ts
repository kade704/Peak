"use server";

import { Category, Post, PostContentView, PostItemView } from "@/types/app.types";
import { supabaseServerClient } from "../supabase/supabaseServer";
import { PostgrestError } from "@supabase/supabase-js";

export async function getPostContentFromID(postid: string) {
    const supabase = await supabaseServerClient();

    const { data: post, error }: { data: PostContentView | null; error: PostgrestError | null } = await supabase
        .from("posts_content_view")
        .select()
        .eq("id", parseInt(postid))
        .single();

    if (!post || error) {
        console.log(`Error getting post with id ${postid}`);
        return null;
    }

    return post;
}

export async function getPostItemsFromChannel(channelid: string, category: string, page: number) {
    const supabase = await supabaseServerClient();

    if (category === "all") {
        const { data: posts, error }: { data: PostItemView[] | null; error: PostgrestError | null } = await supabase
            .from("posts_item_view")
            .select("*")
            .eq("channel_id", channelid)
            .order("created_at", { ascending: false })
            .range((page - 1) * 10, page * 10 - 1);

        if (!posts || error) {
            console.log(`Error getting posts from channel with id ${channelid}`);
            console.log(error);
            return [];
        }

        return posts;
    } else {
        const { data: posts, error }: { data: PostItemView[] | null; error: PostgrestError | null } = await supabase
            .from("posts_item_view")
            .select("*")
            .eq("channel_id", channelid)
            .eq("category", category as Category)
            .order("created_at", { ascending: false })
            .range((page - 1) * 10, page * 10 - 1);

        if (!posts || error) {
            console.log(`Error getting posts from channel with id ${channelid}`);
            console.log(error);
            return [];
        }

        return posts;
    }
}

export async function increasePostVisitCount(postid: string) {
    const supabase = await supabaseServerClient();

    const { error } = await supabase.rpc("increment_visit_count", { post_id: parseInt(postid) });
    console.log(error);
}

export async function getRecentPostsFromChannel(channelid: string) {
    const supabase = await supabaseServerClient();

    const { data: posts, error }: { data: PostItemView[] | null; error: PostgrestError | null } = await supabase
        .from("posts_item_view")
        .select("*")
        .eq("channel_id", channelid)
        .order("created_at", { ascending: false })
        .range(0, 4);

    if (!posts || error) {
        console.log(`Error getting posts from channel with id ${channelid}`);
        return [];
    }

    return posts;
}

export async function countPagesFromChannel(channelid: string) {
    const supabase = await supabaseServerClient();

    const { data, error }: { data: { count: number }[] | null; error: PostgrestError | null } = await supabase
        .from("posts_item_view")
        .select("count", { count: "exact" })
        .eq("channel_id", channelid);

    if (!data || error) {
        console.log(`Error counting posts from channel with id ${channelid}`);
        return -1;
    }

    let count = Math.ceil(data[0].count / 10);
    count = count > 0 ? count : 1;

    return count;
}

export async function isPostMine(postid: string) {
    const supabase = await supabaseServerClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        console.log("User not signed in");
        return false;
    }

    const { data: post }: { data: Post | null; error: PostgrestError | null } = await supabase
        .from("posts")
        .select("author_id")
        .eq("id", parseInt(postid))
        .single();

    if (!post) {
        console.log(`Post with id ${postid} not found`);
        return false;
    }

    return post.author_id === user.id;
}

export async function createPost(title: string, content: string, channelid: string, category: string, thumbnail: string) {
    const supabase = await supabaseServerClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        console.log("User not signed in");
        return;
    }

    await supabase.from("posts").insert({
        content,
        title,
        channel_id: channelid,
        category: category as Category,
        thumbnail_url: thumbnail,
        author_id: user.id,
    });
}

export async function getPostsFromUser(userid: string) {
    const supabase = await supabaseServerClient();

    const { data: posts, error }: { data: Post[] | null; error: PostgrestError | null } = await supabase
        .from("posts_item_view")
        .select("*")
        .eq("author", userid)
        .order("created_at", { ascending: false });

    if (!posts || error) {
        console.log(`Error getting posts from user with id ${userid}`);
        return [];
    }

    return posts;
}

export async function searchPostItems(query: string, page: number) {
    query = decodeURIComponent(query);

    const supabase = await supabaseServerClient();

    const { data: posts, error }: { data: PostItemView[] | null; error: PostgrestError | null } = await supabase
        .from("posts_item_view")
        .select("*")
        .ilike("title", `%${query}%`)
        .order("created_at", { ascending: false })
        .range((page - 1) * 10, page * 10 - 1);

    if (!posts || error) {
        console.log(`Error searching posts with query ${query}`);
        return [];
    }

    return posts;
}

export async function countPagesWithSearch(query: string) {
    query = decodeURIComponent(query);

    const supabase = await supabaseServerClient();

    const { data, error }: { data: { count: number }[] | null; error: PostgrestError | null } = await supabase
        .from("posts_item_view")
        .select("count", { count: "exact" })
        .ilike("title", `%${query}%`);

    if (!data || error) {
        console.log(`Error counting posts with query ${query}`);
        return -1;
    }

    let count = Math.ceil(data[0].count / 10);
    count = count > 0 ? count : 1;

    return count;
}

export async function getBannerPosts() {
    const supabase = await supabaseServerClient();

    const { data: posts, error }: { data: PostItemView[] | null; error: PostgrestError | null } = await supabase
        .from("posts_item_view")
        .select("*")
        .neq("thumbnail_url", "")
        .order("visit_count", { ascending: false })
        .range(0, 5);

    if (!posts || error) {
        console.log(`Error getting hotest posts`);
        console.log(error);
        return [];
    }

    return posts;
}

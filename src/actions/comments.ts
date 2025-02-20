"use server";

import { supabaseServerClient } from "@/supabase/supabaseServer";
import { CommentItemView } from "@/types/app.types";
import { PostgrestError } from "@supabase/supabase-js";

export async function getCommentsFromPost(postid: string) {
    const supabase = await supabaseServerClient();
    const { data: comments, error }: { data: CommentItemView[] | null; error: PostgrestError | null } = await supabase
        .from("comments_item_view")
        .select("*")
        .eq("post_id", parseInt(postid));

    if (!comments || error) {
        console.log(`Error getting comments for post ${postid}`);
        console.log(error);
        return [];
    }

    return comments;
}

export async function createComment(postid: string, content: string) {
    const supabase = await supabaseServerClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        console.log("User not signed in");
        return;
    }

    await supabase.from("comments").insert([{ post_id: parseInt(postid), author_id: user.id, content }]);
}

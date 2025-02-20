"use server";

import { supabaseServerClient } from "@/supabase/supabaseServer";
import { decode } from "base64-arraybuffer";
import { v4 } from "uuid";

export async function addImage(data: File, bucket: string): Promise<string> {
    const supabase = await supabaseServerClient();

    let extension = data.name.split(".").pop();
    if (!extension) {
        return "";
    }

    extension = extension.toLowerCase();
    if (!["jpg", "jpeg", "png", "gif"].includes(extension)) {
        return "";
    }

    const path = `${v4()}.${extension}`;

    const { error } = await supabase.storage.from(bucket).upload(path, data);

    if (error) {
        console.log("Error uploading file: ", error);
        console.log(error);
        return "";
    }

    const {
        data: { publicUrl },
    } = supabase.storage.from(bucket).getPublicUrl(path);

    return publicUrl;
}

export async function addImageFromData(data: string, bucket: string): Promise<string> {
    const supabase = await supabaseServerClient();

    const path = `${v4()}.png`;
    const base64 = data.split("base64,")[1];

    const { error } = await supabase.storage.from(bucket).upload(path, decode(base64), {
        contentType: "image/png",
    });

    if (error) {
        console.log("Error uploading file: ", error);
        console.log(error);
        return "";
    }

    const {
        data: { publicUrl },
    } = supabase.storage.from(bucket).getPublicUrl(path);

    return publicUrl;
}

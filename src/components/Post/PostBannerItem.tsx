"use client";

import { postItemDate } from "@/lib/date";
import Image from "next/image";
import Link from "next/link";

export type PostBannerItemProps = {
    id: number;
    title: string;
    thumbnail_url: string;
    channel_id: string;
    category: string;
    visit_count: number;
    comment_count: number;
    created_at: string;
    author_username: string;
};

const PostBannerItem = ({
    id,
    title,
    thumbnail_url,
    channel_id,
    visit_count,
    comment_count,
    author_username,
    created_at,
}: PostBannerItemProps) => {
    return (
        <Link href={`/b/${channel_id}/${id}`} className="relative w-[280px] h-[210px] flex flex-col">
            <div className="relative w-full h-[120px] rounded-lg bg-base-300 overflow-hidden">
                {thumbnail_url && <Image fill src={thumbnail_url} alt="썸네일" className="object-cover" />}
            </div>
            <h3 className="flex-1 mt-2 w-full font-semibold line-clamp-2">{title}</h3>
            <div className="mt-2 w-full flex gap-2 items-center ">
                <h6 className="text-neutral-content">u/{author_username}</h6>
                <h6 className="text-neutral-content">•</h6>
                <h6 className="text-neutral-content">{postItemDate(created_at)}</h6>
            </div>
        </Link>
    );
};

export default PostBannerItem;

"use client";

import { postItemDate } from "@/lib/date";

import Link from "next/link";

export type PostSimpleItemProps = {
    id: number;
    title: string;
    channel_id: string;
    author_username: string;
    created_at: string;
    comment_count: number;
};

const PostSimpleItem = ({ id, title, channel_id, author_username, created_at, comment_count }: PostSimpleItemProps) => {
    return (
        <Link
            href={`/b/${channel_id}/${id}`}
            className="relative p-4 w-full h-[70px] text-base-content flex items-center gap-3 hover:bg-base-200 trasition duration-200  "
        >
            <div className="flex-1 flex flex-col gap-2">
                <div className="flex gap-1 items-center">
                    <h5 className="font-semibold line-clamp-1">{title}</h5>
                    <h5 className="text-primary">{`[${comment_count}]`}</h5>
                </div>
                <div className="w-full flex gap-2 items-center ">
                    <h6 className="text-neutral-content">u/{author_username}</h6>
                    <h6 className="text-neutral-content">•</h6>
                    <h6 className="text-neutral-content">{postItemDate(created_at)}</h6>
                </div>
            </div>
        </Link>
    );
};

export default PostSimpleItem;

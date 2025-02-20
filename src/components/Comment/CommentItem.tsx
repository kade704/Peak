"use client";

import { postItemDate } from "@/lib/date";
import Image from "next/image";
import Link from "next/link";

export type CommentItemProps = {
    id: number;
    content: string;
    created_at: string;
    author_avatar_url: string;
    author_username: string;
};

const CommentItem = ({ author_username, content, created_at, author_avatar_url }: CommentItemProps) => {
    return (
        <div className="w-full py-4 flex items-center gap-4">
            <Link href={`/u/${author_username}`}>
                <Image width={40} height={40} src={author_avatar_url} alt="아바타" className="rounded-full" />
            </Link>
            <div className="space-y-1">
                <div className="flex items-center gap-2">
                    <h5 className="font-semibold">{author_username}</h5>
                    <h6>•</h6>
                    <h6>{postItemDate(created_at)}</h6>
                </div>
                <h4>{content}</h4>
            </div>
        </div>
    );
};

export default CommentItem;

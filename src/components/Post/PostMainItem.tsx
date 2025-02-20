"use client";

import { categoryToText } from "@/lib/category";
import { postItemDate } from "@/lib/date";
import { Category } from "@/types/app.types";
import Image from "next/image";
import Link from "next/link";
import { FaEye, FaCalendarAlt } from "react-icons/fa";

export type PostMainItemProps = {
    id: number;
    title: string;
    category: Category;
    author_username: string;
    channel_id: string;
    created_at: string;
    thumbnail_url: string;
    comment_count: number;
    visit_count: number;
};

const PostMainItem = ({
    id,
    title,
    thumbnail_url,
    author_username,
    channel_id,
    category,
    created_at,
    comment_count,
    visit_count,
}: PostMainItemProps) => {
    return (
        <Link
            href={`/b/${channel_id}/${id}`}
            className="relative p-4 w-full h-[80px] text-base-content flex items-center gap-4 hover:bg-base-200 trasition duration-200  "
        >
            <div className="relative w-[60px] h-[60px] rounded-md bg-base-300 overflow-hidden">
                {thumbnail_url && <Image fill src={thumbnail_url} alt="썸네일" className="object-cover" />}
            </div>
            <div className="flex-1 flex flex-col gap-2">
                <h3 className="font-bold line-clamp-1">{title}</h3>
                <div className="w-full flex gap-2 items-center ">
                    <h6>{categoryToText(category)}</h6>
                    <h6>•</h6>
                    <div className="flex items-center gap-1">
                        <h6>u/{author_username}</h6>
                    </div>
                    <h6>•</h6>
                    <div className="flex items-center gap-1">
                        <FaCalendarAlt size={10} />
                        <h6>{postItemDate(created_at)}</h6>
                    </div>
                    <h6>•</h6>
                    <div className="flex items-center gap-1">
                        <FaEye size={12} />
                        <h6>{visit_count}</h6>
                    </div>
                </div>
            </div>
            <div className="w-[50px] h-[50px] bg-base-200 flex items-center justify-center rounded-md">
                <h3>{comment_count}</h3>
            </div>
        </Link>
    );
};

export default PostMainItem;

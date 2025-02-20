"use client";

import Link from "next/link";
import PostSimpleItem, { PostSimpleItemProps } from "./PostSimpleItem";

export type PostSimpleListProps = {
    channel_id: string;
    channel_name: string;
    posts: PostSimpleItemProps[];
};

const PostSimpleList = ({ channel_id, channel_name, posts }: PostSimpleListProps) => {
    return (
        <div className="w-[450px] flex flex-col bg-base-100 shadow-md rounded-lg">
            <Link href={`/b/${channel_id}`}>
                <h2 className="font-bold p-4">{channel_name}</h2>
            </Link>
            {posts.map((post) => (
                <div key={post.id}>
                    <div className="border-b border-base-300"></div>
                    <PostSimpleItem {...post} />
                </div>
            ))}
            {posts.length === 0 && (
                <div className="flex items-center justify-center w-full h-96">
                    <h2>게시글이 없습니다.</h2>
                </div>
            )}
        </div>
    );
};

export default PostSimpleList;

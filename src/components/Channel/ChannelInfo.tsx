"use client";

import Link from "next/link";

type ChannelInfoProps = {
    id: string;
    display_name: string;
    description: string;
    subscribe_count: number;
    post_count: number;
};

const ChannelInfo = ({ id, display_name, description, subscribe_count, post_count }: ChannelInfoProps) => {
    return (
        <div className="mt-10 p-4 w-[256px] h-[220px] bg-base-100 rounded-2xl shadow-md flex flex-col">
            <Link href={`/b/${id}`}>
                <h2 className="font-semibold">{display_name}</h2>
            </Link>
            <h4 className="">b/{id}</h4>
            <h5 className="flex-1 mt-2">{description}</h5>
            <div className="mt-4 mb-2 flex justify-between">
                <div className="flex-1">
                    <h4>{subscribe_count}명</h4>
                    <h5>구독자</h5>
                </div>
                <div className="flex-1">
                    <h4>{post_count}개</h4>
                    <h5>게시물</h5>
                </div>
            </div>
        </div>
    );
};

export default ChannelInfo;

"use client";

import { useAuthStore } from "@/stores/auth";
import Link from "next/link";
import { FaPlus } from "react-icons/fa";

type PostCreateButtonProps = {
    channelid: string;
};

const PostCreateButton = ({ channelid }: PostCreateButtonProps) => {
    const profile = useAuthStore((state) => state.profile);

    return (
        profile && (
            <Link href={`/b/${channelid}/newPost`}>
                <button className="btn btn-primary rounded-full flex items-center">
                    <FaPlus size={16} />
                    <h4>글쓰기</h4>
                </button>
            </Link>
        )
    );
};

export default PostCreateButton;

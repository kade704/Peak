"use client";

import { likePost, unlikePost } from "@/actions/likes";
import { useAuthStore } from "@/stores/auth";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import { FcLike, FcDislike } from "react-icons/fc";

type LikeButtonProps = {
    postid: string;
    liked: boolean;
    likeCount: number;
};

const LikeButton = ({ postid, liked, likeCount }: LikeButtonProps) => {
    const router = useRouter();
    const profile = useAuthStore((state) => state.profile);

    const handleButtonClicked = async () => {
        if (liked) {
            await unlikePost(postid);
        } else {
            await likePost(postid);
        }
        router.refresh();
    };

    return (
        profile && (
            <button onClick={handleButtonClicked} className={clsx("btn btn-secondary rounded-full", liked && "btn-outline")}>
                {liked ? <FcDislike /> : <FcLike />}
                <h5 className="text-secondary-content">{likeCount}</h5>
            </button>
        )
    );
};

export default LikeButton;

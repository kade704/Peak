"use client";

import { createComment } from "@/actions/comments";
import { useAuthStore } from "@/stores/auth";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

type FormData = {
    content: string;
};

type CommentFormProps = {
    postid: string;
};

const CommentForm = ({ postid }: CommentFormProps) => {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<FormData>();

    const router = useRouter();
    const profile = useAuthStore((state) => state.profile);

    const onSubmit = async (data: FormData) => {
        await createComment(postid, data.content);
        router.refresh();
    };

    return (
        profile && (
            <form onSubmit={handleSubmit(onSubmit)} className="mt-6 w-full flex gap-4">
                <div className="flex-1 relative space-y-2">
                    <input
                        type="text"
                        className="w-full input input-bordered flex-1 pt-4 h-20"
                        placeholder="댓글을 입력하세요."
                        {...register("content", {
                            required: "댓글을 입력해주세요.",
                        })}
                    />
                    <div className="absolute top-1 left-4 flex items-center gap-2">
                        <Image width={16} height={16} src={profile.avatar_url} alt="아바타" className="rounded-full" />
                        <h5>{profile.username}</h5>
                    </div>
                    {errors.content && <h5 className="text-error">{errors.content.message}</h5>}
                </div>
                <button type="submit" className="btn btn-primary text-base-100 rounded-full" disabled={isSubmitting}>
                    댓글 작성
                </button>
            </form>
        )
    );
};

export default CommentForm;

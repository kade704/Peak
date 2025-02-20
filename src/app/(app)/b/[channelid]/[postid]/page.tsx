import { getCommentsFromPost } from "@/actions/comments";
import { isLikedPost } from "@/actions/likes";
import { getPostContentFromID, increasePostVisitCount } from "@/actions/posts";
import CommentForm from "@/components/Comment/CommentForm";
import CommentList from "@/components/Comment/CommentList";
import CopyLinkButton from "@/components/CopyLinkButton";
import LikeButton from "@/components/LikeButton";
import PostContentView from "@/components/Post/PostContentView";
import PostNotFound from "@/components/Post/PostNotFound";
import { categoryToText } from "@/lib/category";
import { postItemDate } from "@/lib/date";
import Image from "next/image";
import Link from "next/link";

const PostPage = async ({ params }: { params: Promise<{ postid: string }> }) => {
    const postid = (await params).postid;

    const post = await getPostContentFromID(postid);

    if (!post) {
        return <PostNotFound />;
    }

    await increasePostVisitCount(postid);
    const comments = await getCommentsFromPost(postid);
    const liked = await isLikedPost(postid);

    return (
        <div className="mt-10 mb-20 w-full space-y-4">
            <div className="w-full bg-base-100 rounded-xl shadow-md">
                <div className="p-6">
                    <h4 className="text-neutral-content">{categoryToText(post.category)}</h4>
                    <h1 className="mt-2 font-bold"> {post.title}</h1>
                    <div className="mt-6 w-full flex items-center justify-between">
                        <Link href={`/u/${post.author_username}`} className="flex items-center">
                            <Image width={40} height={40} src={post.author_avatar_url} className="rounded-full" alt="아바타" />
                            <div className="ml-3 space-y-1">
                                <h5 className="font-semibold">u/{post.author_username} </h5>
                                <h6 className="text-neutral-content"> {postItemDate(post.created_at)} 작성</h6>
                            </div>
                        </Link>
                        <CopyLinkButton />
                    </div>
                </div>
                <div className="w-full border-b border-base-300" />
                <div className="p-6">
                    <PostContentView value={post.content} />
                    <div className="mt-4 w-full flex justify-center">
                        <LikeButton postid={postid} liked={liked} likeCount={post.like_count} />
                    </div>
                </div>
            </div>
            <div className="w-full bg-base-100 rounded-xl shadow-md">
                <div className="p-6">
                    <h2 className="font-semibold">댓글 {comments.length}개</h2>
                </div>
                <div className="w-full border-b border-base-300" />
                <div className="p-6">
                    {comments && <CommentList comments={comments} />}
                    <CommentForm postid={postid} />
                </div>
            </div>
        </div>
    );
};
export default PostPage;

"use client";

import PostMainItem, { PostMainItemProps } from "./PostMainItem";

export type PostMainListProps = {
    posts: PostMainItemProps[];
};

const PostMainList = ({ posts }: PostMainListProps) => {
    return (
        <div className="w-full flex flex-col bg-base-100 shadow-md rounded-lg">
            {posts.map((post, i) => (
                <div key={post.id}>
                    <PostMainItem {...post} />
                    {i !== posts.length - 1 && <div className="border-b border-base-300"></div>}
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

export default PostMainList;

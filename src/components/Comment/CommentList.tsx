"use client";

import CommentItem, { CommentItemProps } from "./CommentItem";

type CommentListProps = {
    comments: CommentItemProps[];
};

const CommentList = ({ comments }: CommentListProps) => {
    return (
        <>
            {comments.length === 0 ? (
                <div className="flex items-center justify-center w-full h-[100px]">
                    <h3>댓글이 없습니다.</h3>
                </div>
            ) : (
                <div>
                    {comments.map((comment, i) => (
                        <div key={comment.id}>
                            <CommentItem {...comment} />
                            {i !== comments.length - 1 && <div className="border-b border-base-300"></div>}
                        </div>
                    ))}
                </div>
            )}
        </>
    );
};

export default CommentList;

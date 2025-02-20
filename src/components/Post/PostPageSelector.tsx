"use client";

import clsx from "clsx";
import Link from "next/link";

type PostPageSelectorProps = {
    channelid: string;
    category: string;
    page_count: number;
};

const PostPageSelector = ({ channelid, category, page_count }: PostPageSelectorProps) => {
    return (
        <div className="w-full flex gap-2 items-center justify-center">
            {Array.from({ length: page_count }, (_, i) => i + 1).map((page) => (
                <Link
                    key={page}
                    href={`/b/${channelid}?category=${category}&page=${page}`}
                    className={clsx("btn btn-sm", page ? "btn-primary" : "btn-secondary")}
                >
                    <h5>{page}</h5>
                </Link>
            ))}
        </div>
    );
};

export default PostPageSelector;

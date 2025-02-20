import { countPagesWithSearch, searchPostItems } from "@/actions/posts";
import PostMainList from "@/components/Post/PostMainList";
import clsx from "clsx";
import Link from "next/link";
import { redirect } from "next/navigation";

const SearchPage = async ({ searchParams }: { searchParams: Promise<{ q: string | null; page: number | null }> }) => {
    const { q: query, page } = await searchParams;

    if (!query) {
        return <h1>검색어를 입력해주세요.</h1>;
    }
    const page_count = await countPagesWithSearch(query);

    if (!page) {
        redirect(`/search?q=${query}&page=1`);
    }

    const posts = await searchPostItems(query, page);

    return (
        <div className="mt-10 w-[768px]">
            <h1 className="text-3xl font-bold">"{query}" 검색 결과</h1>
            <div className="h-4" />
            <PostMainList posts={posts} />
            <div className="h-4" />
            <div className="w-full flex gap-2 items-center justify-center">
                {Array.from({ length: page_count }, (_, i) => i + 1).map((page) => (
                    <Link
                        key={page}
                        href={`/search?q=${query}&page=${page}`}
                        className={clsx("btn btn-sm", page ? "btn-primary" : "btn-secondary")}
                    >
                        <h5 className="text-base-content">{page}</h5>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default SearchPage;

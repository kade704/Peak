"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaSearch } from "react-icons/fa";

const SearchForm = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const router = useRouter();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        router.push(`/search?q=${searchTerm}`);
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="hidden md:flex w-[386px] h-8 items-center justify-center">
                <div className="relative w-full h-full max-w-[600px]">
                    <input
                        type="text"
                        className="w-full input h-full bg-base-300"
                        placeholder="검색"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <Link href={`/search?q=${searchTerm}&page=1`}>
                        <FaSearch className="absolute right-2 top-1/2 -translate-y-1/2" />
                    </Link>
                </div>
            </div>
        </form>
    );
};

export default SearchForm;

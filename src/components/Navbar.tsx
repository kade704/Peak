"use client";

import Link from "next/link";
import Signout from "./Signout";
import { useAuthStore } from "@/stores/auth";
import Image from "next/image";
import ThemeChanger from "./ThemeChanger";
import Logo from "./Logo";
import SearchForm from "./SearchForm";

const Navbar = () => {
    const profile = useAuthStore((state) => state.profile);

    return (
        <nav className="fixed z-20 w-full h-[70px] flex items-center justify-center px-10 bg-base-200">
            <div className="w-[1024px] h-[40px] flex items-center justify-between gap-4">
                <Logo />
                <SearchForm />
                <ThemeChanger />
                {profile ? (
                    <div className="flex items-center gap-4">
                        <Link href={`/u/${profile.username}`} className="flex items-center gap-2">
                            <Image src={profile.avatar_url} alt="아바타" width={24} height={24} className="rounded-full" />
                            <p className="text-base-content">{profile.username}</p>
                        </Link>
                        <Signout />
                    </div>
                ) : (
                    <Link href="/login" className="h-full">
                        <button className="w-[90px] h-full btn btn-sm btn-primary text-base-100 rounded-full">
                            <h4>로그인</h4>
                        </button>
                    </Link>
                )}
            </div>
        </nav>
    );
};
export default Navbar;

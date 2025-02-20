"use client";

import { useAuthStore } from "@/stores/auth";

const Signout = () => {
    const signout = useAuthStore((state) => state.actions.signout);

    const handleSignout = () => {
        signout();
    };
    return (
        <button onClick={handleSignout} className="btn btn-sm btn-error rounded-full">
            로그아웃
        </button>
    );
};

export default Signout;

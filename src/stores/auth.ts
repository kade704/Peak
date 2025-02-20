import { addImageFromData } from "@/actions/assets";
import { isExistingUsername } from "@/actions/profiles";
import { supabaseBrowserClient } from "@/supabase/supabaseClient";
import { Profile } from "@/types/app.types";
import { create } from "zustand";

export type AuthStatus = {
    success: boolean;
    error_message?: string;
    error_where?: "email" | "username" | "password";
};

type AuthState = {
    profile: Profile | null;
    actions: {
        setProfile: (profile: Profile | null) => void;
        login: (email: string, password: string) => Promise<AuthStatus>;
        signup: (email: string, username: string, password: string, avatar: string) => Promise<AuthStatus>;
        signout: () => void;
    };
};

export const useAuthStore = create<AuthState>((set) => ({
    profile: null,
    actions: {
        setProfile: (profile) => set({ profile }),
        login: async (email, password) => {
            const supabase = supabaseBrowserClient();
            const { error } = await supabase.auth.signInWithPassword({
                email: email,
                password: password,
            });

            if (error) {
                return { success: false, error_message: "이메일 또는 비밀번호가 일치하지 않습니다.", error_where: "email" };
            }

            return { success: true };
        },
        signup: async (email, username, password, avatar) => {
            const existingUsername = await isExistingUsername(username);
            if (existingUsername) {
                return { success: false, error_message: "이미 존재하는 사용자 이름입니다.", error_where: "username" };
            }

            const supabase = supabaseBrowserClient();

            const avatar_url = await addImageFromData(avatar, "avatars");

            const { error } = await supabase.auth.signUp({
                email: email,
                password: password,
                options: {
                    data: {
                        username: username,
                        avatar_url: avatar_url,
                    },
                },
            });

            if (error?.message == "User already registered") {
                return { success: false, error_message: "이미 존재하는 이메일입니다.", error_where: "email" };
            }

            if (error) {
                console.error(error);
                return { success: false, error_message: "회원가입 중 오류가 발생했습니다.", error_where: "email" };
            }

            return { success: true };
        },
        signout: () => {
            const supabase = supabaseBrowserClient();
            supabase.auth.signOut();
        },
    },
}));

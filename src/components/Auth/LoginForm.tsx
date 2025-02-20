"use client";

import { useForm } from "react-hook-form";
import { redirect } from "next/navigation";
import { useAuthStore } from "@/stores/auth";
import Logo from "../Logo";

type FormData = {
    email: string;
    password: string;
};

const LoginForm = () => {
    const {
        register,
        handleSubmit,
        setError,
        formState: { errors, isSubmitting },
    } = useForm<FormData>();

    const login = useAuthStore((state) => state.actions.login);

    const onSubmit = async (data: FormData) => {
        const status = await login(data.email, data.password);

        if (!status.success) {
            setError("email", { message: status.error_message }, { shouldFocus: true });
            return;
        }

        redirect("/home");
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-[400px] p-4 bg-base-100 rounded-tl-2xl flex flex-col gap-4 z-10 shadow-lg"
            style={{ borderRadius: "20px 0 20px 0" }}
        >
            <div className="w-full flex items-center justify-center">
                <Logo />
            </div>
            <div className="relative mt-4 w-full">
                <h5 className="absolute left-4 top-2 text-content opacity-50">이메일</h5>
                <input
                    type="text"
                    className="w-full input input-bordered h-16 pt-4"
                    {...register("email", {
                        required: "이메일을 입력해주세요.",
                        pattern: {
                            value: /^[_a-z0-9-]+(.[_a-z0-9-]+)*@(?:\w+\.)+\w+$/i,
                            message: "이메일 형식으로 입력해주세요.",
                        },
                    })}
                />

                <div className="label">
                    <span className="label-text text-red-500">{errors.email?.message}</span>
                </div>
            </div>

            <div className="relative w-full">
                <h5 className="absolute left-4 top-2 text-content opacity-50">비밀번호</h5>
                <input
                    type="password"
                    className="w-full input input-bordered h-16 pt-4"
                    {...register("password", {
                        required: "비밀번호를 입력해주세요.",
                        minLength: { value: 6, message: "비밀번호는 6자리 이상 입력해 주세요." },
                    })}
                />
                <div className="label">
                    <span className="label-text text-red-500">{errors.password?.message}</span>
                </div>
            </div>

            <button type="submit" className="w-full btn btn-primary mt-4 h-12" disabled={isSubmitting}>
                <h3 className="text-base-100">로그인</h3>
            </button>

            <div className="flex items-center justify-center gap-2">
                <h5 className="text-center text-neutral-content">계정이 없으십니까?</h5>
                <a href="signup" className="font-semibold text-sm">
                    가입하기
                </a>
            </div>
        </form>
    );
};

export default LoginForm;

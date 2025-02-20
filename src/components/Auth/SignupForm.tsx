"use client";

import { Controller, useForm } from "react-hook-form";
import { redirect } from "next/navigation";
import Link from "next/link";
import { useAuthStore } from "@/stores/auth";
import AvatarUploader from "../AvatarUploader";
import Logo from "../Logo";

type FormData = {
    email: string;
    password: string;
    username: string;
    avatar: string;
};

type SignupFormProps = {
    defaultAvatar: string;
};

const SignupForm = ({ defaultAvatar }: SignupFormProps) => {
    const {
        register,
        handleSubmit,
        setError,
        control,
        formState: { errors, isSubmitting },
    } = useForm<FormData>({
        defaultValues: {
            avatar: defaultAvatar,
        },
    });

    const signup = useAuthStore((state) => state.actions.signup);

    const onSubmit = async (data: FormData) => {
        const status = await signup(data.email, data.username, data.password, data.avatar);

        if (!status.success && status.error_where) {
            setError(status.error_where, { message: status.error_message }, { shouldFocus: true });
            return;
        }

        if (data) {
            redirect("/home");
        }
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-[400px] p-4 bg-base-100 flex flex-col gap-4 z-10 shadow-lg"
            style={{ borderRadius: "20px 0 20px 0" }}
        >
            <div className="w-full flex items-center justify-center">
                <Logo />
            </div>
            <div className="relative mt-4 w-full">
                <h5 className="absolute left-4 top-2 text-content opacity-50">이메일</h5>
                <input
                    type="text"
                    className="w-full input input-bordered  h-16 pt-4"
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
                <h5 className="absolute left-4 top-2 text-content opacity-50">유저이름</h5>
                <input
                    type="text"
                    className="w-full input input-bordered  h-16 pt-4"
                    {...register("username", {
                        required: "유저이름 입력해주세요.",
                        pattern: {
                            value: /^[a-zA-Z0-9ㄱ-ㅎㅏ-ㅣ가-힣]{2,20}$/i,
                            message: "유저이름은 기호랑 띄어쓰기없이 2자리 이상 20자리 이하로 입력해주세요.",
                        },
                    })}
                />
                <div className="label">
                    <span className="label-text text-red-500">{errors.username?.message}</span>
                </div>
            </div>

            <div className="relative w-full">
                <h5 className="absolute left-4 top-2 text-content opacity-50">비밀번호</h5>
                <input
                    type="password"
                    className="w-full input input-bordered  h-16 pt-4"
                    {...register("password", {
                        required: "비밀번호를 입력해주세요.",
                        minLength: { value: 6, message: "비밀번호는 6자리 이상 입력해 주세요." },
                    })}
                />
                <div className="label">
                    <span className="label-text text-red-500">{errors.password?.message}</span>
                </div>
            </div>
            <Controller
                name="avatar"
                control={control}
                render={({ field: { onChange, value } }) => <AvatarUploader value={value} onChange={onChange} />}
            />

            <button type="submit" className="w-full btn btn-primary mt-4 h-12" disabled={isSubmitting}>
                <h3 className="text-base-100">회원 가입</h3>
            </button>

            <div className="flex items-center justify-center gap-2">
                <h5 className="text-center text-neutral-content">이미 회원이십니까?</h5>
                <a href="login" className="text-content font-semibold text-sm">
                    로그인하기
                </a>
            </div>
        </form>
    );
};

export default SignupForm;

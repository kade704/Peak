import { generateAvatar } from "@/lib/avatar";
import SignupForm from "components/Auth/SignupForm";

const SignupPage = async () => {
    const defaultAvatar = await generateAvatar();

    return (
        <main className="w-full h-screen flex items-center justify-center bg-base-300">
            <div className="absolute w-full h-full flex items-center justify-center overflow-hidden">
                <div
                    className="absolute w-[200%] h-[200%] bg-base-200 bg-center bg-repeat rotate-45 origin-center"
                    style={{
                        maskImage: "url('/logo.svg')",
                        maskSize: "300px 300px",
                        maskRepeat: "repeat",
                        maskPosition: "center",
                    }}
                />
            </div>

            <SignupForm defaultAvatar={defaultAvatar} />
        </main>
    );
};

export default SignupPage;

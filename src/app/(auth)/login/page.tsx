import LoginForm from "components/Auth/LoginForm";

const LoginPage = () => {
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

            <LoginForm />
        </main>
    );
};

export default LoginPage;

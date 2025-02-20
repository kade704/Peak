import Link from "next/link";

const Logo = () => {
    return (
        <Link href="/home" className="flex items-center gap-1">
            <div className="w-[36px] h-[36px] bg-primary" style={{ maskImage: "url('/logo.svg')" }}></div>
            <h1 className="text-3xl text-primary font-bold">Peak</h1>
        </Link>
    );
};

export default Logo;

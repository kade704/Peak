import type { Metadata } from "next";
import "./globals.css";
import localFont from "next/font/local";
import AuthSubscriber from "components/Auth/AuthSubscriber";
import ThemeSubscriber from "@/components/ThemeSubscriber";
import NextTopLoader from "nextjs-toploader";

const pretendard = localFont({
    src: "./pretendard.woff2",
    variable: "--font-pretendard",
    display: "swap",
    weight: "45 920",
});

export const metadata: Metadata = {
    title: "Peak",
    description: "최대규모 게임 커뮤니티 플랫폼",
    icons: {
        icon: "/logo.svg",
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="kr">
            <body className={`${pretendard.variable} font-pretendard bg-base-200 min-h-screen overflow-x-hidden`}>
                <NextTopLoader color="oklch(var(--p))" />
                <AuthSubscriber />
                <ThemeSubscriber />
                {children}
            </body>
        </html>
    );
}

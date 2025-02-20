"use client";

import Image from "next/image";
import Link from "next/link";

export type ChannelMainItemProps = {
    id: string;
    display_name: string;
    description: string;
    icon_url: string;
};

const ChannelMainItem = ({ id, display_name, description, icon_url }: ChannelMainItemProps) => {
    return (
        <Link
            href={`/b/${id}`}
            className="w-[300px] p-2 bg-base-100 rounded-lg hover:bg-base-200 cursor-pointer trasition duration-200"
        >
            <div className="flex items-center gap-2">
                {icon_url && <Image width={40} height={40} src={icon_url} alt="아이콘" className="object-cover rounded-full" />}
                <div className="flex flex-col">
                    <h2 className="text-xl font-bold">{display_name}</h2>
                    <h5>b/{id}</h5>
                </div>
            </div>
            <h6 className="mt-2">{description}</h6>
        </Link>
    );
};

export default ChannelMainItem;

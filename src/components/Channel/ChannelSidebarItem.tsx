"use client";

import Image from "next/image";
import Link from "next/link";

export type ChannelSidebarItemProps = {
    id: string;
    display_name: string;
    icon_url: string;
};

const ChannelSidebarItem = ({ id, display_name, icon_url }: ChannelSidebarItemProps) => {
    return (
        <Link
            href={`/b/${id}`}
            className="p-2 flex items-center gap-2 hover:bg-base-200 cursor-pointer rounded-lg trasition duration-200"
        >
            {display_name && <Image width={24} height={24} src={icon_url} alt="아이콘" className="object-cover rounded-lg" />}
            <h5 className="truncate">{display_name}</h5>
        </Link>
    );
};

export default ChannelSidebarItem;

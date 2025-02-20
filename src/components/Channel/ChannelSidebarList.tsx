"use client";

import ChannelSidebarItem, { ChannelSidebarItemProps } from "./ChannelSidebarItem";

type ChannelSidebarListProps = {
    channels: ChannelSidebarItemProps[];
};

const ChannelSidebarList = ({ channels }: ChannelSidebarListProps) => {
    return (
        <div className="flex flex-col">
            {channels.map((channel) => (
                <ChannelSidebarItem key={channel.id} {...channel} />
            ))}
        </div>
    );
};

export default ChannelSidebarList;

"use client";

import ChannelMainItem, { ChannelMainItemProps } from "./ChannelMainItem";

type ChannelMainListProps = {
    channels: ChannelMainItemProps[];
};

const ChannelMainList = ({ channels }: ChannelMainListProps) => {
    return (
        <div className="grid grid-cols-3 gap-4">
            {channels.map((channel) => (
                <ChannelMainItem key={channel.id} {...channel} />
            ))}
        </div>
    );
};

export default ChannelMainList;

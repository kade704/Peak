import { getChannelByID } from "@/actions/channels";
import ChannelInfo from "@/components/Channel/ChannelInfo";
import ChannelNotFound from "@/components/Channel/ChannelNotFound";

const ChannelLayout = async ({
    children,
    params,
}: Readonly<{
    children: React.ReactNode;
    params: Promise<{ channelid: string }>;
}>) => {
    const { channelid } = await params;
    const channel = await getChannelByID(channelid);

    if (!channel) {
        return <ChannelNotFound />;
    }

    return (
        <div className="w-full h-full flex gap-10 justify-center">
            <div className="w-[768px]">{children}</div>
            <ChannelInfo {...channel} />
        </div>
    );
};

export default ChannelLayout;

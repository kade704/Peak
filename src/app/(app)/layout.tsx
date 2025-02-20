import { getRecommendedChannels, getSubscribedChannels } from "@/actions/channels";
import Sidebar from "@/components/Sidebar";
import Navbar from "components/Navbar";

const MainLayout = async ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) => {
    const recommend_channels = await getRecommendedChannels();
    const subscribed_channels = (await getSubscribedChannels()).map((subscribe) => ({
        id: subscribe.channel_id,
        display_name: subscribe.channel_display_name,
        icon_url: subscribe.channel_icon_url,
    }));

    return (
        <div className="relative">
            <Navbar />
            <Sidebar recommend_channels={recommend_channels} subscribed_channels={subscribed_channels} />
            <main className="ml-[230px] px-2 pt-[70px] w-[calc(100vw-230px)] flex items-center justify-center">{children}</main>
        </div>
    );
};

export default MainLayout;

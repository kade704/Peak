import { getChannels } from "@/actions/channels";
import ChannelMainList from "@/components/Channel/ChannelMainList";

const ChannelsPage = async () => {
    const channels = await getChannels();

    return (
        <div>
            <h1 className="my-10 text-4xl font-bold">채널 탐색</h1>
            <ChannelMainList channels={channels} />
        </div>
    );
};

export default ChannelsPage;

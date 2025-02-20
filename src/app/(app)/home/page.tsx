import { getRecommendedChannels } from "@/actions/channels";
import { getBannerPosts, getRecentPostsFromChannel } from "@/actions/posts";
import PostBannerList from "@/components/Post/PostBannerList";
import PostSimpleList from "@/components/Post/PostSimpleList";

const HomePage = async () => {
    const channels = await getRecommendedChannels().then(
        async (channels) =>
            await Promise.all(
                channels.map(async (channel) => ({
                    ...channel,
                    posts: await getRecentPostsFromChannel(channel.id),
                }))
            )
    );

    const posts = await getBannerPosts();

    return (
        <div className="mt-10">
            <PostBannerList posts={posts} />
            <div className="mt-4 grid grid-cols-2 gap-4">
                {channels.map((channel) => (
                    <PostSimpleList
                        key={channel.id}
                        channel_id={channel.id}
                        channel_name={channel.display_name}
                        posts={channel.posts}
                    />
                ))}
            </div>
            <div className="h-20"></div>
        </div>
    );
};

export default HomePage;

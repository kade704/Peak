import { countPagesFromChannel, getPostItemsFromChannel } from "actions/posts";
import PostMainList from "components/Post/PostMainList";
import PostCreateButton from "@/components/Post/PostCreateButton";
import PostCategorySelector from "@/components/Post/PostCategorySelector";
import PostPageSelector from "@/components/Post/PostPageSelector";
import { redirect } from "next/navigation";
import SubscribeButton from "@/components/SubscribeButton";
import { isSubscribed } from "@/actions/subscribes";
import { getChannelByID } from "@/actions/channels";
import Image from "next/image";

const ChannelPage = async ({
    params,
    searchParams,
}: {
    params: Promise<{ channelid: string }>;
    searchParams: Promise<{ category: string | undefined; page: number | undefined }>;
}) => {
    const { channelid } = await params;
    const { category, page } = await searchParams;

    if (!channelid) {
        return <div>Channel not found</div>;
    }

    if (!page || !category || page < 1) {
        redirect(`/b/${channelid}?category=all&page=1`);
    }

    const posts = await getPostItemsFromChannel(channelid, category, page);
    const page_count = await countPagesFromChannel(channelid);
    const subscribed = await isSubscribed(channelid);
    const channel = await getChannelByID(channelid);

    if (!channel) {
        return <div>Channel not found</div>;
    }

    return (
        <div className="relative mt-10 flex flex-col">
            <div className="relative w-full h-[150px] overflow-hidden rounded-lg">
                <Image fill src={channel.banner_url} className="object-cover" alt="배너" />
            </div>
            <Image
                width={80}
                height={80}
                className="absolute left-6 object-cover rounded-full border-4 border-base-200 translate-y-[120px]"
                src={channel.icon_url}
                alt="아이콘"
            />
            <div className="ml-[120px] h-[80px] flex items-center justify-between gap-4">
                <h1 className="font-bold">{channel.display_name}</h1>
                <div className="flex gap-4 items-center">
                    <SubscribeButton channelid={channelid} subscribed={subscribed} />
                    <PostCreateButton channelid={channelid} />
                </div>
            </div>
            <PostCategorySelector channelid={channelid} />
            <div className="h-4" />
            <PostMainList posts={posts} />
            <div className="h-4" />
            <PostPageSelector channelid={channelid} page_count={page_count} category={category} />
        </div>
    );
};

export default ChannelPage;

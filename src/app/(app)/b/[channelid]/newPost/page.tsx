import PostForm from "@/components/Post/PostForm";

const NewPostPage = async ({ params }: { params: Promise<{ channelid: string }> }) => {
    const channelid = (await params).channelid;

    return <PostForm channelid={channelid} />;
};

export default NewPostPage;

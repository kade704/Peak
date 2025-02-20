"use client";

import { subscribeChannel, unsubscribeChannel } from "@/actions/subscribes";
import { useAuthStore } from "@/stores/auth";
import clsx from "clsx";
import { useRouter } from "next/navigation";

type SubscribeButtonProps = {
    channelid: string;
    subscribed: boolean;
};

const SubscribeButton = ({ channelid, subscribed }: SubscribeButtonProps) => {
    const router = useRouter();
    const profile = useAuthStore((state) => state.profile);

    const handleButtonClicked = async () => {
        if (subscribed) {
            await unsubscribeChannel(channelid);
        } else {
            await subscribeChannel(channelid);
        }
        router.refresh();
    };

    return (
        profile && (
            <button onClick={handleButtonClicked} className={clsx("btn btn-secondary rounded-full", subscribed && "btn-outline")}>
                <h3 className="text-secondary-content">{subscribed ? "구독 중" : "구독"}</h3>
            </button>
        )
    );
};

export default SubscribeButton;

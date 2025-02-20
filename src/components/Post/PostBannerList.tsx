"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import PostBannerItem, { PostBannerItemProps } from "./PostBannerItem";
import { Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import "./PostBannerList.css";

type PostBannerListProps = {
    posts: PostBannerItemProps[];
};

const PostBannerList = ({ posts }: PostBannerListProps) => {
    return (
        <div className="w-[916px] flex flex-col bg-base-100 shadow-md rounded-lg">
            <h2 className="font-bold p-4">인기 게시물</h2>
            <div className="border-b border-base-300"></div>
            <div className="mt-4 px-4">
                <Swiper
                    pagination={{ clickable: true }}
                    navigation={true}
                    modules={[Pagination, Autoplay]}
                    slidesPerView={3}
                    spaceBetween={20}
                    autoplay={{ delay: 5000 }}
                    className="w-full flex items-center h-[250px]"
                >
                    {posts.map((post) => (
                        <SwiperSlide key={post.id}>
                            <PostBannerItem key={post.id} {...post} />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    );
};

export default PostBannerList;

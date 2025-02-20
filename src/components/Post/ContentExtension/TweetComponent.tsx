import { NodeViewProps, NodeViewWrapper, ReactNodeViewRenderer } from "@tiptap/react";
import { mergeAttributes, Node, nodePasteRule } from "@tiptap/core";
import { Tweet } from "react-tweet";

export const TweetComponent = ({ node }: NodeViewProps) => {
    const url = node.attrs.url;
    const tweetIdRegex = /\/status\/(\d+)/g;
    const id = tweetIdRegex.exec(url)?.[1];

    return (
        <NodeViewWrapper className="twitter-component">
            <Tweet id={id || ""} />
        </NodeViewWrapper>
    );
};

export const TweetNode = Node.create({
    name: "twitter",

    group: "block",

    atom: true,

    draggable: true,

    addPasteRules() {
        const twitterUrl = /^https:\/\/(twitter\.com|x\.com)\/.*\/status\/.*/g;

        return [
            nodePasteRule({
                find: twitterUrl,
                type: this.type,
                getAttributes: (match) => {
                    return { url: match.input };
                },
            }),
        ];
    },

    addAttributes() {
        return {
            url: {
                default: "https://twitter.com/vercel/status/1683920951807971329",
            },
        };
    },

    parseHTML() {
        return [
            {
                tag: "twitter",
            },
        ];
    },

    renderHTML({ HTMLAttributes }) {
        return ["twitter", mergeAttributes(HTMLAttributes)];
    },

    addNodeView() {
        return ReactNodeViewRenderer(TweetComponent);
    },
});

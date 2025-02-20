"use client";

import Image from "@tiptap/extension-image";
import Youtube from "@tiptap/extension-youtube";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { LinkNode } from "./ContentExtension/LinkComponent";
import { TweetNode } from "./ContentExtension/TweetComponent";

type PostContentViewProps = {
    value: string;
};

const PostContentView = ({ value }: PostContentViewProps) => {
    const editor = useEditor({
        extensions: [StarterKit, Image, Youtube, LinkNode, TweetNode],
        content: value,
        editable: false,
        immediatelyRender: false,
        editorProps: {
            attributes: {
                class: "focus:outline-none",
            },
        },
    });

    return <EditorContent editor={editor} />;
};

export default PostContentView;

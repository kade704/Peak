"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Youtube from "@tiptap/extension-youtube";
import Image from "@tiptap/extension-image";
import { LinkNode } from "./ContentExtension/LinkComponent";
import { TweetNode } from "./ContentExtension/TweetComponent";
import { useRef } from "react";
import { FaBold, FaImage, FaItalic, FaRedo, FaStrikethrough, FaUndo, FaYoutube, FaLink } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { TbH1, TbH2, TbH3, TbH4, TbH5, TbH6 } from "react-icons/tb";
import { AiOutlineFontSize } from "react-icons/ai";
import { clsx } from "clsx";

type PostContentEditorProps = {
    value: string;
    onChange: (content: string) => void;
};

const PostContentEditor = ({ value, onChange }: PostContentEditorProps) => {
    const editor = useEditor({
        extensions: [StarterKit, Image, Youtube, LinkNode, TweetNode],
        content: value,
        autofocus: true,
        immediatelyRender: false,
        onUpdate: ({ editor }) => {
            onChange(editor.getHTML());
        },
        editorProps: {
            attributes: {
                class: "focus:outline-none",
            },
        },
    });

    const imageInput = useRef<HTMLInputElement>(null);

    const handleImageUpload = async () => {
        if (!editor) {
            return;
        }

        const file = imageInput.current?.files?.[0];
        if (!file) {
            console.log("No file selected");
            return;
        }

        if (file.size > 1024 * 1024) {
            alert("파일은 1MB를 초과할 수 없습니다.");
            console.log("File is too large");
            return;
        }

        const reader = new FileReader();
        reader.onload = async () => {
            const src = reader.result as string;

            editor.chain().focus().setImage({ src }).run();

            onChange(editor.getHTML());
        };

        reader.readAsDataURL(file);
    };

    const handleAddYoutube = () => {
        if (!editor) {
            return;
        }

        const url = prompt("유튜브 URL을 입력해주세요.");
        if (!url) {
            alert("URL을 입력해주세요.");
            return;
        }

        editor.commands.setYoutubeVideo({
            src: url,
            width: 640,
            height: 480,
        });
    };

    const handleAddLink = () => {
        if (!editor) {
            return;
        }

        const url = prompt("링크 URL을 입력해주세요.");
        if (!url) {
            alert("URL을 입력해주세요.");
            return;
        }

        if (!url.startsWith("http") || !url.startsWith("https")) {
            alert("올바른 URL을 입력해주세요.");
            return;
        }

        editor.commands.insertContent({
            type: "link",
            attrs: {
                href: url,
            },
        });
    };

    const handleAddTwitter = () => {
        if (!editor) {
            return;
        }

        const url = prompt("트위터 URL을 입력해주세요.");
        if (!url) {
            alert("URL을 입력해주세요.");
            return;
        }

        editor.commands.insertContent({
            type: "twitter",
            attrs: {
                url,
            },
        });
    };

    if (!editor) {
        return null;
    }

    return (
        <div>
            <div className="w-full rounded-b bg-base-300 rounded-box flex px-6 py-1">
                <button
                    type="button"
                    title="실행취소"
                    onClick={() => editor.chain().focus().undo().run()}
                    className={clsx("w-10 h-10 flex items-center justify-center hover:bg-base-200 transition-all rounded-md")}
                >
                    <FaUndo size={20} />
                </button>
                <button
                    type="button"
                    title="다시실행"
                    onClick={() => editor.chain().focus().redo().run()}
                    className={clsx("w-10 h-10 flex items-center justify-center hover:bg-base-200 transition-all rounded-md")}
                >
                    <FaRedo size={20} />
                </button>

                <div className="mx-2 w-0.5 h-10 bg-base-200" />

                <div className="dropdown dropdown-bottom">
                    <div
                        tabIndex={0}
                        className="w-10 h-10 flex items-center justify-center hover:bg-base-200 transition-all rounded-md cursor-pointer"
                        title="글씨 크기"
                    >
                        <AiOutlineFontSize size={28} />
                    </div>
                    <ul tabIndex={0} className="menu dropdown-content bg-base-200 rounded-box z-[1] w-[160px] mt-4 p-1 shadow">
                        <li>
                            <button
                                type="button"
                                title="큰글씨"
                                onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                                disabled={!editor.can().chain().focus().toggleHeading({ level: 1 }).run()}
                                className={clsx(
                                    "p-1 flex items-center gap-2",
                                    editor.isActive("heading", { level: 1 }) && "bg-base-300"
                                )}
                            >
                                <TbH1 size={24} />
                                <h4>큰글씨</h4>
                            </button>
                        </li>
                        <li>
                            <button
                                type="button"
                                title="약간 큰글씨"
                                onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                                disabled={!editor.can().chain().focus().toggleHeading({ level: 2 }).run()}
                                className={clsx(
                                    "p-1 flex items-center gap-2",
                                    editor.isActive("heading", { level: 2 }) && "bg-base-300"
                                )}
                            >
                                <TbH2 size={24} />
                                <h4>약간 큰글씨</h4>
                            </button>
                        </li>
                        <li>
                            <button
                                type="button"
                                title="보통 큰글씨"
                                onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
                                disabled={!editor.can().chain().focus().toggleHeading({ level: 3 }).run()}
                                className={clsx(
                                    "p-1 flex items-center gap-2",
                                    editor.isActive("heading", { level: 3 }) && "bg-base-300"
                                )}
                            >
                                <TbH3 size={24} />
                                <h4>보통 큰글씨</h4>
                            </button>
                        </li>
                        <li>
                            <button
                                type="button"
                                title="보통 글씨"
                                onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
                                disabled={!editor.can().chain().focus().toggleHeading({ level: 4 }).run()}
                                className={clsx(
                                    "p-1 flex items-center gap-2",
                                    editor.isActive("heading", { level: 4 }) && "bg-base-300"
                                )}
                            >
                                <TbH4 size={24} />
                                <h4>보통 글씨</h4>
                            </button>
                        </li>
                        <li>
                            <button
                                type="button"
                                title="약간 작은 글씨"
                                onClick={() => editor.chain().focus().toggleHeading({ level: 5 }).run()}
                                disabled={!editor.can().chain().focus().toggleHeading({ level: 5 }).run()}
                                className={clsx(
                                    "p-1 flex items-center gap-2",
                                    editor.isActive("heading", { level: 5 }) && "bg-base-300"
                                )}
                            >
                                <TbH5 size={24} />
                                <h4>약간 작은 글씨</h4>
                            </button>
                        </li>
                        <li>
                            <button
                                type="button"
                                title="작은 글씨"
                                onClick={() => editor.chain().focus().toggleHeading({ level: 6 }).run()}
                                disabled={!editor.can().chain().focus().toggleHeading({ level: 6 }).run()}
                                className={clsx(
                                    "p-1 flex items-center gap-2",
                                    editor.isActive("heading", { level: 6 }) && "bg-base-300"
                                )}
                            >
                                <TbH6 size={24} />
                                <h4>작은 글씨</h4>
                            </button>
                        </li>
                    </ul>
                </div>

                <button
                    type="button"
                    title="굵게"
                    onClick={() => editor.chain().focus().toggleBold().run()}
                    disabled={!editor.can().chain().focus().toggleBold().run()}
                    className={clsx(
                        "w-10 h-10 flex items-center justify-center hover:bg-base-200 transition-all rounded-md",
                        editor.isActive("bold") && "bg-base-200"
                    )}
                >
                    <FaBold size={20} />
                </button>
                <button
                    type="button"
                    title="기울임"
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                    disabled={!editor.can().chain().focus().toggleItalic().run()}
                    className={clsx(
                        "w-10 h-10 flex items-center justify-center hover:bg-base-200 transition-all rounded-md",
                        editor.isActive("italic") && "bg-base-200"
                    )}
                >
                    <FaItalic size={20} />
                </button>
                <button
                    type="button"
                    title="취소선"
                    onClick={() => editor.chain().focus().toggleStrike().run()}
                    disabled={!editor.can().chain().focus().toggleStrike().run()}
                    className={clsx(
                        "w-10 h-10 flex items-center justify-center hover:bg-base-200 transition-all rounded-md",
                        editor.isActive("strike") && "bg-base-200"
                    )}
                >
                    <FaStrikethrough size={20} />
                </button>
                <div className="mx-2 w-0.5 h-10 bg-base-200" />
                <button
                    type="button"
                    title="이미지 삽입"
                    onClick={() => imageInput.current?.click()}
                    className={clsx("w-10 h-10 flex items-center justify-center hover:bg-base-200 transition-all rounded-md")}
                >
                    <FaImage size={20} />
                </button>
                <button
                    type="button"
                    title="유튜브 삽입"
                    onClick={handleAddYoutube}
                    className={clsx(
                        "w-10 h-10 flex items-center justify-center hover:bg-base-200 transition-all rounded-md",
                        editor.isActive("youtube") && "bg-base-200"
                    )}
                >
                    <FaYoutube size={20} />
                </button>
                <button
                    type="button"
                    title="링크 삽입"
                    onClick={handleAddLink}
                    className={clsx(
                        "w-10 h-10 flex items-center justify-center hover:bg-base-200 transition-all rounded-md",
                        editor.isActive("link") && "bg-base-200"
                    )}
                >
                    <FaLink size={18} />
                </button>
                <button
                    type="button"
                    title="트위터 삽입"
                    onClick={handleAddTwitter}
                    className={clsx(
                        "w-10 h-10 flex items-center justify-center hover:bg-base-200 transition-all rounded-md",
                        editor.isActive("twitter") && "bg-base-200"
                    )}
                >
                    <FaXTwitter size={20} />
                </button>
            </div>
            <EditorContent
                className="p-4 bg-base-100 h-[512px] overflow-y-auto rounded-xl rounded-t  cursor-text"
                editor={editor}
            />
            <input type="file" accept="image/*" ref={imageInput} onChange={handleImageUpload} hidden />
        </div>
    );
};

export default PostContentEditor;

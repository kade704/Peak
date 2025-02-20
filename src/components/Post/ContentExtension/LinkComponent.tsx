import { NodeViewProps, NodeViewWrapper, ReactNodeViewRenderer } from "@tiptap/react";
import { mergeAttributes, Node } from "@tiptap/core";
import Link from "next/link";

export const LinkComponent = (props: NodeViewProps) => {
    return (
        <NodeViewWrapper className="link-component">
            <Link
                href={props.node.attrs.href}
                rel="noopener noreferrer"
                target="_blank"
                className="w-[600px] bg-base-100 p-2 rounded-md flex items-center justify-center gap-4 hover:bg-base-200 cursor-pointer transition border-2"
            >
                <h4>외부 링크</h4>
                <h4 className="text-primary">{props.node.attrs.href}</h4>
            </Link>
        </NodeViewWrapper>
    );
};

export const LinkNode = Node.create({
    name: "link",
    group: "block",
    atom: true,
    draggable: true,
    addAttributes() {
        return {
            href: {
                default: "",
            },
        };
    },
    parseHTML() {
        return [
            {
                tag: "link",
            },
        ];
    },
    renderHTML({ HTMLAttributes }) {
        return ["link", mergeAttributes(HTMLAttributes)];
    },
    addNodeView() {
        return ReactNodeViewRenderer(LinkComponent);
    },
});

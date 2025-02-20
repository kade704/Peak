"use client";

import { useState } from "react";

const CopyLinkButton = () => {
    const [copied, setCopied] = useState(false);

    return (
        <button
            type="button"
            className="btn btn-sm btn-secondary rounded-full"
            onClick={() => {
                navigator.clipboard.writeText(location.href);
                setCopied(true);
            }}
        >
            <h5 className="text-base-content">링크 복사 {copied && "✓"}</h5>
        </button>
    );
};

export default CopyLinkButton;

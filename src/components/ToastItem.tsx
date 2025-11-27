import React, { useEffect, useState } from "react";
import { ToastData } from "../core/types";
import { toastStore } from "../core/store";
import { SuccessIcon, ErrorIcon, LoaderIcon, CloseIcon } from "./Icons";

const ToastItem: React.FC<{ toast: ToastData }> = ({ toast }) => {
    const [isHovered, setIsHovered] = useState(false);

    // Icon mapping
    const getIcon = () => {
        if (toast.icon) return toast.icon;
        if (toast.type === "success") return <SuccessIcon />;
        if (toast.type === "error") return <ErrorIcon />;
        if (toast.type === "loading") return <LoaderIcon />;
        return null;
    };

    return (
        <div
            className={`toastly-item toastly-variant-${toast.variant} toastly-${toast.type} ${toast.visible ? 'toastly-enter' : 'toastly-exit'} ${toast.className || ''}`}
            style={toast.style}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            role="alert"
        >
            <div className="icon">{getIcon()}</div>
            <div style={{ flex: 1 }}>{toast.message}</div>
            <button
                className="toastly-close"
                onClick={() => toastStore.dismiss(toast.id)}
                aria-label="Close"
            >
                <CloseIcon />
            </button>
        </div>
    );
};

export default ToastItem;
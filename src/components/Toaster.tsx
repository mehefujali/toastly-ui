import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { toastStore } from "../core/store";
import { ToastData, ToastPosition } from "../core/types";
import ToastItem from "./ToastItem";
import "../styles/toast.css";

interface ToasterProps {
    position?: ToastPosition;
    toastOptions?: {
        className?: string;
        style?: React.CSSProperties;
        variant?: "modern" | "minimalist" | "enterprise" | "glass";
    };
}

export const Toaster: React.FC<ToasterProps> = ({ position = "top-right", toastOptions }) => {
    const [toasts, setToasts] = useState<ToastData[]>([]);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        return toastStore.subscribe((updatedToasts) => {
            setToasts([...updatedToasts]);
        });
    }, []);

    if (!mounted) return null;

    // Group toasts by their specific position if overridden, else use global default
    const getPositionClass = (p: string) => `toastly-container toastly-${p}`;

    const toastsToRender = toasts.map(t => ({
        ...t,
        ...toastOptions, // apply global options
        ...t, // overwrite with individual options
        position: t.position || position
    }));

    // We only render one container per position used
    const usedPositions = Array.from(new Set(toastsToRender.map(t => t.position)));

    return createPortal(
        <>
            {usedPositions.map(pos => (
                <div key={pos} className={getPositionClass(pos || "top-right")}>
                    {toastsToRender
                        .filter(t => t.position === pos)
                        .map(t => (
                            <ToastItem key={t.id} toast={t} />
                        ))}
                </div>
            ))}
        </>,
        document.body
    );
};
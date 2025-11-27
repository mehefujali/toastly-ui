import { ReactNode, CSSProperties } from "react";

export type ToastType =
  | "success"
  | "error"
  | "warning"
  | "info"
  | "loading"
  | "custom";
export type ToastPosition =
  | "top-left"
  | "top-right"
  | "top-center"
  | "bottom-left"
  | "bottom-right"
  | "bottom-center";
export type ToastVariant = "modern" | "minimalist" | "enterprise" | "glass";

export interface ToastOptions {
  id?: string;
  duration?: number;
  position?: ToastPosition;
  variant?: ToastVariant;
  style?: CSSProperties;
  className?: string;
  icon?: ReactNode;
  onDismiss?: (id: string) => void;
}

export interface ToastData extends ToastOptions {
  id: string;
  message: ReactNode;
  type: ToastType;
  visible: boolean;
}

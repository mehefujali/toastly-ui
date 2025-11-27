import { toastStore } from "./core/store";
import { Toaster } from "./components/Toaster";
import { ToastOptions } from "./core/types";

// Public API
const toast = {
  success: (msg: React.ReactNode, options?: ToastOptions) =>
    toastStore.add(msg, "success", options),
  error: (msg: React.ReactNode, options?: ToastOptions) =>
    toastStore.add(msg, "error", options),
  info: (msg: React.ReactNode, options?: ToastOptions) =>
    toastStore.add(msg, "info", options),
  warning: (msg: React.ReactNode, options?: ToastOptions) =>
    toastStore.add(msg, "warning", options),
  loading: (msg: React.ReactNode, options?: ToastOptions) =>
    toastStore.add(msg, "loading", options),
  custom: (msg: React.ReactNode, options?: ToastOptions) =>
    toastStore.add(msg, "custom", options),
  promise: <T>(
    promise: Promise<T>,
    msgs: {
      loading: string;
      success: string | ((data: T) => string);
      error: string | ((err: any) => string);
    },
    options?: ToastOptions
  ) => toastStore.promise(promise, msgs, options),
  dismiss: (id: string) => toastStore.dismiss(id),
};

export { Toaster, toast };

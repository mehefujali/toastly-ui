import { ToastData, ToastOptions, ToastType } from "./types";
import { generateId } from "./utils";

type Listener = (toasts: ToastData[]) => void;

class ToastStore {
  private toasts: ToastData[] = [];
  private listeners: Listener[] = [];

  subscribe(listener: Listener) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener);
    };
  }

  notify() {
    this.listeners.forEach((listener) => listener(this.toasts));
  }

  add(message: React.ReactNode, type: ToastType, options?: ToastOptions) {
    const id = options?.id || generateId();
    const toast: ToastData = {
      id,
      message,
      type,
      visible: true,
      duration: 3000,
      position: "top-right",
      variant: "modern",
      ...options,
    };

    // If updating existing toast (e.g., promise loading -> success)
    const existingIndex = this.toasts.findIndex((t) => t.id === id);
    if (existingIndex > -1) {
      this.toasts[existingIndex] = { ...this.toasts[existingIndex], ...toast };
    } else {
      this.toasts = [toast, ...this.toasts]; // Stack: Newest on top
    }

    this.notify();

    if (toast.duration !== Infinity && type !== "loading") {
      setTimeout(() => {
        this.dismiss(id);
      }, toast.duration);
    }
    return id;
  }

  dismiss(id: string) {
    this.toasts = this.toasts.map((t) =>
      t.id === id ? { ...t, visible: false } : t
    );
    this.notify();

    // Remove from array after animation plays out
    setTimeout(() => {
      this.toasts = this.toasts.filter((t) => t.id !== id);
      this.notify();
    }, 400);
  }

  // Helper for promises
  promise<T>(
    promise: Promise<T>,
    messages: {
      loading: string;
      success: string | ((data: T) => string);
      error: string | ((err: any) => string);
    },
    options?: ToastOptions
  ) {
    const id = this.add(messages.loading, "loading", {
      ...options,
      duration: Infinity,
    });

    promise
      .then((data) => {
        const msg =
          typeof messages.success === "function"
            ? messages.success(data)
            : messages.success;
        this.add(msg, "success", { id, duration: 3000, ...options });
      })
      .catch((err) => {
        const msg =
          typeof messages.error === "function"
            ? messages.error(err)
            : messages.error;
        this.add(msg, "error", { id, duration: 3000, ...options });
      });

    return promise;
  }
}

export const toastStore = new ToastStore();

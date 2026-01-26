import * as Toast from "@radix-ui/react-toast";
import { createContext, useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const ToastContext = createContext(null);

const TOAST_DURATION = 2500;
const AUTO_NAV_DELAY = 2000;

export const ToastProvider = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [toast, setToast] = useState({
    title: "",
    description: "",
    type: "info",
    autoNavigateTo: null,
  });

  const navigate = useNavigate();

  const showToast = useCallback(
    ({ title, description = "", type = "info", autoNavigateTo = null }) => {
      setToast({ title, description, type, autoNavigateTo });
      setOpen(false);

      requestAnimationFrame(() => {
        setOpen(true);
      });
    },
    [],
  );

  const { type, autoNavigateTo } = toast;

  useEffect(() => {
    if (!open) return;
    if (type !== "success") return;
    if (!autoNavigateTo) return;

    const timer = setTimeout(() => {
      navigate(autoNavigateTo);
    }, AUTO_NAV_DELAY);

    return () => clearTimeout(timer);
  }, [open, type, autoNavigateTo, navigate]);

  const variantStyles = {
    success: "border-lime-500/40 text-lime-400",
    error: "border-red-500/40 text-red-400",
    info: "border-zinc-700 text-zinc-200",
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      <Toast.Provider duration={TOAST_DURATION} swipeDirection="right">
        {children}

        <Toast.Root
          open={open}
          onOpenChange={setOpen}
          className={`
            fixed bottom-6 right-6 z-50
            w-[320px]
            rounded-2xl
            bg-zinc-900 border
            p-4 shadow-xl
            ${variantStyles[type]}
          `}
        >
          <Toast.Title className="text-sm font-semibold">
            {toast.title}
          </Toast.Title>

          {toast.description && (
            <Toast.Description className="mt-1 text-xs text-zinc-400">
              {toast.description}
            </Toast.Description>
          )}
        </Toast.Root>

        <Toast.Viewport className="fixed bottom-6 right-6 z-50" />
      </Toast.Provider>
    </ToastContext.Provider>
  );
};

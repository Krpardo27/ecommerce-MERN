import * as Toast from "@radix-ui/react-toast";
import { createContext, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";

export const ToastContext = createContext(null);

export const ToastProvider = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [toast, setToast] = useState({
    title: "",
    description: "",
    action: null,
  });

  const navigate = useNavigate();

  const showToast = useCallback(({ title, description }) => {
    setToast({ title, description });
    setOpen(true);
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      <Toast.Provider swipeDirection="right" duration={3500}>
        {children}

        <Toast.Root
          open={open}
          onOpenChange={setOpen}
          className="
            fixed bottom-6 right-6 z-50
            w-[320px]
            rounded-2xl
            bg-zinc-900 border border-zinc-800
            p-4 shadow-xl
          "
        >
          <Toast.Title className="text-sm font-semibold text-zinc-100">
            {toast.title}
          </Toast.Title>

          <Toast.Description className="mt-1 text-xs text-zinc-400">
            {toast.description}
          </Toast.Description>

          {toast.action && (
            <div className="mt-3">
              <Toast.Action asChild altText="Ver carrito">
                <button
                  onClick={() => {
                    setOpen(false);
                    navigate("/carrito");
                  }}
                  className="
                    text-xs font-semibold
                    text-lime-400
                    hover:underline
                  "
                >
                  Ver carrito
                </button>
              </Toast.Action>
            </div>
          )}
        </Toast.Root>

        <Toast.Viewport />
      </Toast.Provider>
    </ToastContext.Provider>
  );
};

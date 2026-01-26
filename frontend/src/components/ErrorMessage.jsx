const ErrorMessage = ({ children }) => {
  if (!children) return null;

  return (
    <p
      className="
        mt-2
        rounded-xl
        border border-red-500/30
        bg-red-500/10
        px-4 py-2
        text-center text-xs font-medium
        text-red-400
        backdrop-blur
      "
    >
      {children}
    </p>
  );
};

export default ErrorMessage;

// src/components/Loader.tsx

interface LoaderProps {
  text?: string;
  fullScreen?: boolean;
}

export  function Loader({ text = "Loading Funiro...", fullScreen = false }: LoaderProps) {
  return (
    <div
      className={`flex flex-col items-center justify-center gap-5 w-full ${
        fullScreen ? "min-h-screen bg-white/80 backdrop-blur-sm fixed inset-0 z-50" : "min-h-[60vh]"
      }`}
    >
      {/* Animated Spinner Container */}
      <div className="relative flex items-center justify-center">
        {/* Outer Pulsing Glow */}
        <div className="absolute w-20 h-20 rounded-full bg-[#B88E2F]/20 animate-ping" />

        {/* Outer Spinning Dual Ring */}
        <div className="w-16 h-16 rounded-full border-4 border-t-[#B88E2F] border-r-transparent border-b-[#B88E2F] border-l-transparent animate-spin" />

        {/* Inner Counter-Spinning Ring */}
        <div className="absolute w-10 h-10 rounded-full border-2 border-t-transparent border-r-[#333333] border-b-transparent border-l-[#333333] animate-[spin_1s_linear_infinite_reverse]" />

        {/* Center Static Accent Dot */}
        <div className="absolute w-3 h-3 rounded-full bg-[#B88E2F]" />
      </div>

      {/* Animated Loading Text */}
      {text && (
        <p className="font-poppins font-semibold text-xs tracking-[3px] text-[#333333] uppercase animate-pulse">
          {text}
        </p>
      )}
    </div>
  );
}
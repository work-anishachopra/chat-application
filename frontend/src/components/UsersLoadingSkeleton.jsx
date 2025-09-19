function UsersLoadingSkeleton() {
  return (
    <div className="space-y-3">
      {[1, 2, 3].map((item) => (
        <div
          key={item}
          className="bg-slate-800/30 backdrop-blur-sm border border-white/10 p-4 rounded-lg animate-pulse relative overflow-hidden"
        >
          <div className="flex items-center space-x-3">
            {/* Avatar skeleton */}
            <div className="relative">
              <div className="w-12 h-12 bg-slate-700/60 rounded-full border-2 border-white/10"></div>
              {/* Online status skeleton */}
              <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-slate-600/50 rounded-full border-2 border-slate-800"></div>
            </div>

            {/* Text skeleton */}
            <div className="flex-1 min-w-0">
              <div className="h-4 bg-slate-700/60 rounded-md w-3/4 mb-2"></div>
              <div className="h-3 bg-slate-700/40 rounded-md w-1/2"></div>
            </div>
          </div>

          {/* Shimmer effect */}
          <div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-shimmer"
            style={{
              backgroundSize: "200% 100%",
              animation: "shimmer 2s infinite",
            }}
          />
        </div>
      ))}

      {/* CSS for shimmer animation */}
      <style>{`
        @keyframes shimmer {
          0% {
            background-position: -200% 0;
          }
          100% {
            background-position: 200% 0;
          }
        }
      `}</style>
    </div>
  );
}

export default UsersLoadingSkeleton;

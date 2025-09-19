function MessagesLoadingSkeleton() {
  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {[...Array(6)].map((_, index) => (
        <div
          key={index}
          className={`chat ${
            index % 2 === 0 ? "chat-start" : "chat-end"
          } animate-pulse`}
        >
          <div
            className={`chat-bubble backdrop-blur-sm border ${
              index % 2 === 0
                ? "bg-slate-800/50 border-white/10"
                : "bg-gradient-to-br from-purple-500/30 to-pink-500/20 border-purple-400/20"
            } ${
              index % 3 === 0 ? "w-48" : index % 3 === 1 ? "w-32" : "w-40"
            } h-12`}
          >
            {/* Shimmer effect */}
            <div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer rounded-lg"
              style={{
                backgroundSize: "200% 100%",
                animation: "shimmer 2s infinite",
              }}
            />
          </div>
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

export default MessagesLoadingSkeleton;

import { MessageCircleIcon } from "lucide-react";

const NoChatHistoryPlaceholder = ({ name }) => {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center p-6 relative">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          style={{
            backgroundImage:
              "radial-gradient(circle, #ffffff08 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
          className="w-full h-full"
        />
      </div>

      <div className="relative z-10">
        {/* Enhanced icon container */}
        <div className="relative w-20 h-20 bg-gradient-to-br from-purple-500/20 to-pink-500/10 rounded-full flex items-center justify-center mb-6">
          <MessageCircleIcon className="w-10 h-10 text-purple-400" />
          {/* Subtle glow */}
          <div
            className="absolute inset-0 bg-purple-500/10 blur-xl rounded-full animate-pulse"
            style={{ animationDuration: "3s" }}
          />
        </div>

        {/* Enhanced typography */}
        <h3 className="text-xl font-medium text-white mb-4">
          Start your conversation with {name}
        </h3>

        <div className="flex flex-col space-y-4 max-w-md mb-8">
          <p className="text-slate-300 text-sm">
            This is the beginning of your conversation. Send a message to start
            chatting!
          </p>
          {/* Enhanced divider */}
          <div className="h-px w-40 bg-gradient-to-r from-transparent via-purple-400/40 to-transparent mx-auto"></div>
        </div>

        {/* Enhanced suggestion buttons */}
        <div className="flex flex-wrap gap-3 justify-center">
          <button className="px-5 py-2.5 text-sm font-medium text-purple-300 bg-slate-800/40 backdrop-blur-sm border border-purple-400/20 rounded-full hover:bg-slate-700/50 hover:border-purple-400/40 hover:text-white transition-all duration-200 shadow-lg shadow-purple-500/10">
            👋 Say Hello
          </button>
          <button className="px-5 py-2.5 text-sm font-medium text-pink-300 bg-slate-800/40 backdrop-blur-sm border border-pink-400/20 rounded-full hover:bg-slate-700/50 hover:border-pink-400/40 hover:text-white transition-all duration-200 shadow-lg shadow-pink-500/10">
            🤝 How are you?
          </button>
          <button className="px-5 py-2.5 text-sm font-medium text-cyan-300 bg-slate-800/40 backdrop-blur-sm border border-cyan-400/20 rounded-full hover:bg-slate-700/50 hover:border-cyan-400/40 hover:text-white transition-all duration-200 shadow-lg shadow-cyan-500/10">
            📅 Meet up soon?
          </button>
        </div>

        {/* Subtle floating accents */}
        <div
          className="absolute top-16 -left-8 w-2 h-2 bg-purple-400/30 rounded-full blur-sm animate-pulse"
          style={{ animationDuration: "4s" }}
        />
        <div
          className="absolute top-32 -right-6 w-1 h-1 bg-pink-400/40 rounded-full blur-sm animate-pulse"
          style={{ animationDuration: "5s", animationDelay: "2s" }}
        />
        <div
          className="absolute bottom-20 -left-4 w-1.5 h-1.5 bg-cyan-400/30 rounded-full blur-sm animate-pulse"
          style={{ animationDuration: "6s", animationDelay: "1s" }}
        />
      </div>
    </div>
  );
};

export default NoChatHistoryPlaceholder;

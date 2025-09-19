import { MessageCircleIcon } from "lucide-react";

const NoConversationPlaceholder = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center p-6 relative">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          style={{
            backgroundImage:
              "radial-gradient(circle, #ffffff06 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
          className="w-full h-full"
        />
      </div>

      <div className="relative z-10">
        {/* Enhanced icon container */}
        <div className="relative w-24 h-24 bg-gradient-to-br from-cyan-500/20 to-blue-500/15 rounded-full flex items-center justify-center mb-8">
          <MessageCircleIcon className="w-12 h-12 text-cyan-400" />
          {/* Subtle glow */}
          <div
            className="absolute inset-0 bg-cyan-500/10 blur-xl rounded-full animate-pulse"
            style={{ animationDuration: "3s" }}
          />
        </div>

        {/* Enhanced typography */}
        <h3 className="text-2xl font-semibold text-white mb-3">
          Select a conversation
        </h3>
        <p className="text-slate-300 max-w-md leading-relaxed">
          Choose a contact from the sidebar to start chatting or continue a
          previous conversation.
        </p>

        {/* Subtle divider */}
        <div className="h-px w-32 bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent mx-auto mt-6"></div>

        {/* Subtle floating accents */}
        <div
          className="absolute top-16 -left-8 w-2 h-2 bg-cyan-400/25 rounded-full blur-sm animate-pulse"
          style={{ animationDuration: "4s" }}
        />
        <div
          className="absolute top-32 -right-6 w-1 h-1 bg-purple-400/30 rounded-full blur-sm animate-pulse"
          style={{ animationDuration: "5s", animationDelay: "2s" }}
        />
        <div
          className="absolute bottom-20 -left-4 w-1.5 h-1.5 bg-pink-400/25 rounded-full blur-sm animate-pulse"
          style={{ animationDuration: "6s", animationDelay: "1s" }}
        />
        <div
          className="absolute bottom-32 -right-8 w-1 h-1 bg-emerald-400/20 rounded-full blur-sm animate-pulse"
          style={{ animationDuration: "4.5s", animationDelay: "0.5s" }}
        />
      </div>
    </div>
  );
};

export default NoConversationPlaceholder;

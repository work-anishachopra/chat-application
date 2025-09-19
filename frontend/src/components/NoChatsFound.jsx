import { MessageCircleIcon } from "lucide-react";
import { useChatStore } from "../store/useChatStore";

function NoChatsFound() {
  const { setActiveTab } = useChatStore();

  return (
    <div className="flex flex-col items-center justify-center py-12 text-center space-y-6 relative">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          style={{
            backgroundImage:
              "radial-gradient(circle, #ffffff06 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
          className="w-full h-full"
        />
      </div>

      <div className="relative z-10">
        {/* Enhanced icon container */}
        <div className="relative w-18 h-18 bg-gradient-to-br from-purple-500/15 to-pink-500/10 rounded-full flex items-center justify-center mb-2">
          <MessageCircleIcon className="w-9 h-9 text-purple-400" />
          {/* Subtle glow */}
          <div
            className="absolute inset-0 bg-purple-500/8 blur-lg rounded-full animate-pulse"
            style={{ animationDuration: "3s" }}
          />
        </div>

        {/* Enhanced typography */}
        <div className="mb-6">
          <h4 className="text-white font-medium mb-2 text-lg">
            No conversations yet
          </h4>
          <p className="text-slate-300 text-sm px-6 leading-relaxed">
            Start a new chat by selecting a contact from the contacts tab
          </p>
        </div>

        {/* Enhanced button */}
        <button
          onClick={() => setActiveTab("contacts")}
          className="px-6 py-3 text-sm font-medium text-white bg-gradient-to-r from-purple-500/80 to-pink-500/70 backdrop-blur-sm border border-purple-400/30 rounded-lg hover:from-purple-600/80 hover:to-pink-600/70 hover:border-purple-400/50 transition-all duration-200 shadow-lg shadow-purple-500/20 hover:shadow-purple-500/30"
        >
          Find contacts
        </button>

        {/* Subtle floating accents */}
        <div
          className="absolute top-8 -left-6 w-2 h-2 bg-purple-400/25 rounded-full blur-sm animate-pulse"
          style={{ animationDuration: "4s" }}
        />
        <div
          className="absolute top-16 -right-4 w-1 h-1 bg-pink-400/30 rounded-full blur-sm animate-pulse"
          style={{ animationDuration: "5s", animationDelay: "2s" }}
        />
        <div
          className="absolute bottom-12 -left-3 w-1.5 h-1.5 bg-cyan-400/25 rounded-full blur-sm animate-pulse"
          style={{ animationDuration: "6s", animationDelay: "1s" }}
        />
      </div>
    </div>
  );
}

export default NoChatsFound;

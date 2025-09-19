import { XIcon } from "lucide-react";
import { useChatStore } from "../store/useChatStore";
import { useEffect } from "react";
import { useAuthStore } from "../store/useAuthStore";

function ChatHeader() {
  const { selectedUser, setSelectedUser } = useChatStore();
  const { onlineUsers } = useAuthStore();
  const isOnline = onlineUsers.includes(selectedUser._id);

  useEffect(() => {
    const handleEscKey = (event) => {
      if (event.key === "Escape") setSelectedUser(null);
    };

    window.addEventListener("keydown", handleEscKey);

    // cleanup function
    return () => window.removeEventListener("keydown", handleEscKey);
  }, [setSelectedUser]);

  return (
    <div className="flex justify-between items-center bg-slate-800/30 backdrop-blur-sm border-b border-white/10 max-h-[84px] px-6 flex-1 relative">
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-transparent" />

      <div className="flex items-center space-x-3 relative z-10">
        <div className="relative">
          <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white/20">
            <img
              src={selectedUser.profilePic || "/avatar.png"}
              alt={selectedUser.fullName}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Online status indicator */}
          <div
            className={`absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full border-2 border-slate-800 ${
              isOnline
                ? "bg-emerald-400 shadow-lg shadow-emerald-400/50"
                : "bg-slate-500"
            }`}
          />
        </div>

        <div>
          <h3 className="text-white font-medium">{selectedUser.fullName}</h3>
          <p
            className={`text-sm ${
              isOnline ? "text-emerald-400" : "text-slate-400"
            }`}
          >
            {isOnline ? "Online" : "Offline"}
          </p>
        </div>
      </div>

      <button
        onClick={() => setSelectedUser(null)}
        className="relative z-10 p-2 rounded-lg bg-slate-800/50 backdrop-blur-sm border border-white/10 hover:bg-slate-700/50 hover:border-white/20 transition-all duration-200 group"
      >
        <XIcon className="w-5 h-5 text-slate-400 group-hover:text-white transition-colors" />
      </button>
    </div>
  );
}

export default ChatHeader;

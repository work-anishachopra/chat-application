import { useEffect } from "react";
import { useChatStore } from "../store/useChatStore";
import UsersLoadingSkeleton from "./UsersLoadingSkeleton";
import NoChatsFound from "./NoChatsFound";
import { useAuthStore } from "../store/useAuthStore";

function ChatsList() {
  const { getMyChatPartners, chats, isUsersLoading, setSelectedUser } =
    useChatStore();
  const { onlineUsers } = useAuthStore();

  useEffect(() => {
    getMyChatPartners();
  }, [getMyChatPartners]);

  if (isUsersLoading) return <UsersLoadingSkeleton />;
  if (chats.length === 0) return <NoChatsFound />;

  return (
    <>
      {chats.map((chat) => (
        <div
          key={chat._id}
          className="bg-slate-800/30 backdrop-blur-sm border border-white/10 p-4 rounded-lg cursor-pointer hover:bg-slate-700/40 hover:border-purple-400/30 transition-all duration-200 group"
          onClick={() => setSelectedUser(chat)}
        >
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white/20 group-hover:border-purple-400/50 transition-colors duration-200">
                <img
                  src={chat.profilePic || "/avatar.png"}
                  alt={chat.fullName}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Online status indicator */}
              <div
                className={`absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full border-2 border-slate-800 ${
                  onlineUsers.includes(chat._id)
                    ? "bg-emerald-400 shadow-lg shadow-emerald-400/50"
                    : "bg-slate-500"
                }`}
              />
            </div>

            <div className="flex-1 min-w-0">
              <h4 className="text-white font-medium truncate group-hover:text-purple-200 transition-colors duration-200">
                {chat.fullName}
              </h4>
              <p
                className={`text-sm ${
                  onlineUsers.includes(chat._id)
                    ? "text-emerald-400"
                    : "text-slate-400"
                }`}
              >
                {onlineUsers.includes(chat._id) ? "Online" : "Offline"}
              </p>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}

export default ChatsList;

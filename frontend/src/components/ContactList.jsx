import { useEffect } from "react";
import { useChatStore } from "../store/useChatStore";
import UsersLoadingSkeleton from "./UsersLoadingSkeleton";
import { useAuthStore } from "../store/useAuthStore";

function ContactList() {
  const { getAllContacts, allContacts, setSelectedUser, isUsersLoading } =
    useChatStore();
  const { onlineUsers } = useAuthStore();

  useEffect(() => {
    getAllContacts();
  }, [getAllContacts]);

  if (isUsersLoading) return <UsersLoadingSkeleton />;

  return (
    <>
      {allContacts.map((contact) => (
        <div
          key={contact._id}
          className="bg-slate-800/30 backdrop-blur-sm border border-white/10 p-4 rounded-lg cursor-pointer hover:bg-slate-700/40 hover:border-cyan-400/30 transition-all duration-200 group"
          onClick={() => setSelectedUser(contact)}
        >
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white/20 group-hover:border-cyan-400/50 transition-colors duration-200">
                <img
                  src={contact.profilePic || "/avatar.png"}
                  alt={contact.fullName}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Online status indicator */}
              <div
                className={`absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full border-2 border-slate-800 ${
                  onlineUsers.includes(contact._id)
                    ? "bg-emerald-400 shadow-lg shadow-emerald-400/50"
                    : "bg-slate-500"
                }`}
              />
            </div>

            <div className="flex-1 min-w-0">
              <h4 className="text-white font-medium truncate group-hover:text-cyan-200 transition-colors duration-200">
                {contact.fullName}
              </h4>
              <p
                className={`text-sm ${
                  onlineUsers.includes(contact._id)
                    ? "text-emerald-400"
                    : "text-slate-400"
                }`}
              >
                {onlineUsers.includes(contact._id) ? "Online" : "Offline"}
              </p>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}

export default ContactList;

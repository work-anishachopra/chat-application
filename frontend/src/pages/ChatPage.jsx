import { useChatStore } from "../store/useChatStore";

import BorderAnimatedContainer from "../components/BorderAnimatedContainer";
import ProfileHeader from "../components/ProfileHeader";
import ActiveTabSwitch from "../components/ActiveTabSwitch";
import ChatsList from "../components/ChatsList";
import ContactList from "../components/ContactList";
import ChatContainer from "../components/ChatContainer";
import NoConversationPlaceholder from "../components/NoConversationPlaceholder";

function ChatPage() {
  const { activeTab, selectedUser } = useChatStore();

  return (
    <div className="relative w-full max-w-6xl h-[800px]">
      <BorderAnimatedContainer>
        {/* LEFT SIDE - Simplified glassmorphism */}
        <div className="w-80 relative flex flex-col">
          {/* Clean glassmorphism background */}
          <div className="absolute inset-0 bg-slate-800/30 backdrop-blur-lg rounded-l-2xl border-r border-white/10" />

          {/* Subtle accent glow */}
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/8 to-transparent rounded-l-2xl" />

          {/* Content */}
          <div className="relative z-10 flex flex-col h-full">
            <ProfileHeader />
            <ActiveTabSwitch />

            <div className="flex-1 overflow-y-auto p-4 space-y-2">
              {activeTab === "chats" ? <ChatsList /> : <ContactList />}
            </div>
          </div>
        </div>

        {/* RIGHT SIDE - Clean main chat area */}
        <div className="flex-1 flex flex-col relative">
          {/* Simple glassmorphism background */}
          <div className="absolute inset-0 bg-slate-900/30 backdrop-blur-lg rounded-r-2xl" />

          {/* Minimal accent */}
          <div className="absolute inset-0 bg-gradient-to-bl from-cyan-500/5 to-transparent rounded-r-2xl" />

          {/* Content area */}
          <div className="relative z-10 flex flex-col h-full">
            {selectedUser ? <ChatContainer /> : <NoConversationPlaceholder />}
          </div>
        </div>
      </BorderAnimatedContainer>
    </div>
  );
}

export default ChatPage;

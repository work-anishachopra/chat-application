import { useChatStore } from "../store/useChatStore";

function ActiveTabSwitch() {
  const { activeTab, setActiveTab } = useChatStore();

  return (
    <div className="relative p-4 m-2">
      {/* Glassmorphism container */}
      <div className="relative bg-slate-800/30 backdrop-blur-md rounded-xl border border-white/10 p-1">
        {/* Active tab background slider */}
        <div
          className={`absolute top-1 bottom-1 w-1/2 bg-gradient-to-r from-purple-500/30 to-pink-500/30 backdrop-blur-sm rounded-lg border border-purple-400/30 transition-transform duration-300 ease-out ${
            activeTab === "contacts" ? "translate-x-full" : "translate-x-0"
          }`}
        />

        {/* Tab buttons */}
        <div className="relative flex">
          <button
            onClick={() => setActiveTab("chats")}
            className={`flex-1 px-6 py-3 rounded-lg font-medium transition-all duration-300 text-sm ${
              activeTab === "chats"
                ? "text-white shadow-lg"
                : "text-slate-400 hover:text-slate-300"
            }`}
          >
            Chats
          </button>

          <button
            onClick={() => setActiveTab("contacts")}
            className={`flex-1 px-6 py-3 rounded-lg font-medium transition-all duration-300 text-sm ${
              activeTab === "contacts"
                ? "text-white shadow-lg"
                : "text-slate-400 hover:text-slate-300"
            }`}
          >
            Contacts
          </button>
        </div>
      </div>
    </div>
  );
}

export default ActiveTabSwitch;

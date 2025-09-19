import { useState, useRef } from "react";
import { LogOutIcon, VolumeOffIcon, Volume2Icon } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";

const mouseClickSound = new Audio("/sounds/mouse-click.mp3");

function ProfileHeader() {
  const { logout, authUser, updateProfile } = useAuthStore();
  const { isSoundEnabled, toggleSound } = useChatStore();
  const [selectedImg, setSelectedImg] = useState(null);

  const fileInputRef = useRef(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = async () => {
      const base64Image = reader.result;
      setSelectedImg(base64Image);
      await updateProfile({ profilePic: base64Image });
    };
  };

  return (
    <div className="p-6 border-b border-white/10 bg-slate-800/20 backdrop-blur-sm relative">
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-transparent" />

      <div className="flex items-center justify-between relative z-10">
        <div className="flex items-center gap-3">
          {/* AVATAR */}
          <div className="relative">
            <button
              className="w-14 h-14 rounded-full overflow-hidden relative group border-2 border-white/20 hover:border-purple-400/50 transition-all duration-200"
              onClick={() => fileInputRef.current.click()}
            >
              <img
                src={selectedImg || authUser.profilePic || "/avatar.png"}
                alt="User image"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-200">
                <span className="text-white text-xs font-medium">Change</span>
              </div>
            </button>

            {/* Online status indicator */}
            <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-emerald-400 rounded-full border-2 border-slate-800 shadow-lg shadow-emerald-400/50" />

            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={handleImageUpload}
              className="hidden"
            />
          </div>

          {/* USERNAME & ONLINE TEXT */}
          <div>
            <h3 className="text-white font-medium text-base max-w-[180px] truncate">
              {authUser.fullName}
            </h3>
            <p className="text-emerald-400 text-xs font-medium">Online</p>
          </div>
        </div>

        {/* BUTTONS */}
        <div className="flex gap-2 items-center">
          {/* SOUND TOGGLE BTN */}
          <button
            className="p-2 rounded-lg bg-slate-800/50 backdrop-blur-sm border border-white/10 text-slate-400 hover:text-white hover:border-purple-400/30 hover:bg-slate-700/50 transition-all duration-200"
            onClick={() => {
              // play click sound before toggling
              mouseClickSound.currentTime = 0; // reset to start
              mouseClickSound
                .play()
                .catch((error) => console.log("Audio play failed:", error));
              toggleSound();
            }}
          >
            {isSoundEnabled ? (
              <Volume2Icon className="w-5 h-5" />
            ) : (
              <VolumeOffIcon className="w-5 h-5" />
            )}
          </button>

          {/* LOGOUT BTN */}
          <button
            className="p-2 rounded-lg bg-slate-800/50 backdrop-blur-sm border border-white/10 text-slate-400 hover:text-white hover:border-red-400/30 hover:bg-red-500/10 transition-all duration-200"
            onClick={logout}
          >
            <LogOutIcon className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProfileHeader;

import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import BorderAnimatedContainer from "../components/BorderAnimatedContainer";
import {
  MessageCircleIcon,
  MailIcon,
  LoaderIcon,
  LockIcon,
} from "lucide-react";
import { Link } from "react-router";
import toast from "react-hot-toast";

function LoginPage() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const { login, isLoggingIn } = useAuthStore();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Trim values to avoid empty spaces
    const email = formData.email.trim();
    const password = formData.password.trim();

    if (!email || !password) {
      toast.error("Please enter both email and password");
      return;
    }

    // Call login with sanitized values
    login({ email, password });
  };

  return (
    <div className="w-full flex items-center justify-center p-4 bg-slate-900">
      <div className="relative w-full max-w-6xl md:h-[800px] h-[650px]">
        <BorderAnimatedContainer>
          <div className="w-full flex flex-col md:flex-row relative">
            {/* FORM COLUMN - LEFT SIDE */}
            <div className="md:w-1/2 relative flex items-center justify-center p-8 md:border-r border-white/10">
              {/* Subtle glassmorphism background */}
              <div className="absolute inset-0 bg-slate-800/20 backdrop-blur-sm rounded-l-2xl" />

              {/* Purple accent glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-transparent rounded-l-2xl" />

              {/* Content */}
              <div className="relative z-10 w-full max-w-md">
                {/* HEADING TEXT */}
                <div className="text-center mb-8">
                  <div className="relative inline-block mb-4">
                    <MessageCircleIcon className="w-12 h-12 mx-auto text-purple-400" />
                    <div className="absolute inset-0 bg-purple-500/20 blur-xl rounded-full" />
                  </div>
                  <h2 className="text-2xl font-bold text-white mb-2">
                    Welcome Back
                  </h2>
                  <p className="text-slate-300">Login to access your account</p>
                </div>

                {/* FORM */}
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* EMAIL INPUT */}
                  <div>
                    <label className="auth-input-label">Email</label>
                    <div className="relative">
                      <MailIcon className="auth-input-icon text-purple-400 z-20" />
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        className="input bg-slate-800/50 backdrop-blur-sm border border-white/20 text-white placeholder-slate-400 focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20"
                        placeholder="anishachopra@gmail.com"
                      />
                    </div>
                  </div>

                  {/* PASSWORD INPUT */}
                  <div>
                    <label className="auth-input-label">Password</label>
                    <div className="relative">
                      <LockIcon className="auth-input-icon text-purple-400 z-20" />
                      <input
                        type="password"
                        value={formData.password}
                        onChange={(e) =>
                          setFormData({ ...formData, password: e.target.value })
                        }
                        className="input bg-slate-800/50 backdrop-blur-sm border border-white/20 text-white placeholder-slate-400 focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20"
                        placeholder="Enter your password"
                      />
                    </div>
                  </div>

                  {/* SUBMIT BUTTON */}
                  <button
                    className="auth-btn w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-medium py-3 px-6 rounded-lg transition-all duration-200 shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 disabled:opacity-50 disabled:cursor-not-allowed"
                    type="submit"
                    disabled={isLoggingIn}
                  >
                    {isLoggingIn ? (
                      <LoaderIcon className="w-5 h-5 animate-spin mx-auto z-20" />
                    ) : (
                      "Sign In"
                    )}
                  </button>
                </form>

                <div className="mt-6 text-center">
                  <Link
                    to="/signup"
                    className="auth-link !text-slate-300 hover:text-purple-400 transition-colors duration-200 underline decoration-purple-400/50 hover:decoration-purple-400"
                  >
                    Don't have an account? Sign Up
                  </Link>
                </div>
              </div>
            </div>

            {/* FORM ILLUSTRATION - RIGHT SIDE */}
            <div className="hidden md:w-1/2 md:flex items-center justify-center p-6 relative">
              {/* Subtle glassmorphism background */}
              <div className="absolute inset-0 bg-slate-900/20 backdrop-blur-sm rounded-r-2xl" />

              {/* Cyan accent glow */}
              <div className="absolute inset-0 bg-gradient-to-bl from-cyan-500/8 to-transparent rounded-r-2xl" />

              {/* Content */}
              <div className="relative z-10">
                <div className="relative">
                  <img
                    src="/login.png"
                    alt="People using mobile devices"
                    className="w-full h-auto object-contain drop-shadow-2xl"
                  />
                  {/* Subtle glow behind image */}
                  <div className="absolute inset-0 bg-cyan-500/10 blur-3xl -z-10" />
                </div>

                <div className="mt-6 text-center">
                  <h3 className="text-xl font-medium text-purple-400 mb-4">
                    Connect anytime, anywhere
                  </h3>

                  <div className="flex justify-center gap-3">
                    <span className="auth-badge bg-slate-800/40 backdrop-blur-sm !text-purple-300 border border-purple-400/30 px-3 py-1 rounded-full text-sm">
                      Free
                    </span>
                    <span className="auth-badge bg-slate-800/40 backdrop-blur-sm !text-cyan-300 border border-cyan-400/30 px-3 py-1 rounded-full text-sm">
                      Easy Setup
                    </span>
                    <span className="auth-badge bg-slate-800/40 backdrop-blur-sm !text-pink-300 border border-pink-400/30 px-3 py-1 rounded-full text-sm">
                      Private
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </BorderAnimatedContainer>
      </div>
    </div>
  );
}

export default LoginPage;

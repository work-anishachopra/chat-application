import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import BorderAnimatedContainer from "../components/BorderAnimatedContainer";
import {
  MessageCircleIcon,
  LockIcon,
  MailIcon,
  UserIcon,
  LoaderIcon,
} from "lucide-react";
import { Link } from "react-router";

function SignUpPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });
  const { signup, isSigningUp } = useAuthStore();

  const handleSubmit = (e) => {
    e.preventDefault();

    const fullName = formData.fullName?.trim();
    const email = formData.email?.trim();
    const password = formData.password?.trim();

    if (!fullName || !email || !password) {
      toast.error("Please fill in all fields");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    signup({ fullName, email, password });
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

              {/* Pink accent glow for signup variant */}
              <div className="absolute inset-0 bg-gradient-to-br from-pink-500/10 to-transparent rounded-l-2xl" />

              {/* Content */}
              <div className="relative z-10 w-full max-w-md">
                {/* HEADING TEXT */}
                <div className="text-center mb-8">
                  <div className="relative inline-block mb-4">
                    <MessageCircleIcon className="w-12 h-12 mx-auto text-pink-400" />
                    <div className="absolute inset-0 bg-pink-500/20 blur-xl rounded-full" />
                  </div>
                  <h2 className="text-2xl font-bold text-white mb-2">
                    Create Account
                  </h2>
                  <p className="text-slate-300">Sign up for a new account</p>
                </div>

                {/* FORM */}
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* FULL NAME */}
                  <div>
                    <label className="auth-input-label">Full Name</label>
                    <div className="relative">
                      <UserIcon className="auth-input-icon text-pink-400 z-20" />
                      <input
                        type="text"
                        value={formData.fullName}
                        onChange={(e) =>
                          setFormData({ ...formData, fullName: e.target.value })
                        }
                        className="input bg-slate-800/50 backdrop-blur-sm border border-white/20 text-white placeholder-slate-400 focus:border-pink-400 focus:ring-2 focus:ring-pink-400/20"
                        placeholder="Anisha Chopra"
                      />
                    </div>
                  </div>

                  {/* EMAIL INPUT */}
                  <div>
                    <label className="auth-input-label">Email</label>
                    <div className="relative">
                      <MailIcon className="auth-input-icon text-pink-400 z-20" />
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        className="input bg-slate-800/50 backdrop-blur-sm border border-white/20 text-white placeholder-slate-400 focus:border-pink-400 focus:ring-2 focus:ring-pink-400/20"
                        placeholder="anisha@gmail.com"
                      />
                    </div>
                  </div>

                  {/* PASSWORD INPUT */}
                  <div>
                    <label className="auth-input-label">Password</label>
                    <div className="relative">
                      <LockIcon className="auth-input-icon text-pink-400 z-20" />
                      <input
                        type="password"
                        value={formData.password}
                        onChange={(e) =>
                          setFormData({ ...formData, password: e.target.value })
                        }
                        className="input bg-slate-800/50 backdrop-blur-sm border border-white/20 text-white placeholder-slate-400 focus:border-pink-400 focus:ring-2 focus:ring-pink-400/20"
                        placeholder="Enter your password"
                      />
                    </div>
                  </div>

                  {/* SUBMIT BUTTON */}
                  <button
                    className="auth-btn w-full bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white font-medium py-3 px-6 rounded-lg transition-all duration-200 shadow-lg shadow-pink-500/25 hover:shadow-pink-500/40 disabled:opacity-50 disabled:cursor-not-allowed"
                    type="submit"
                    disabled={isSigningUp}
                  >
                    {isSigningUp ? (
                      <LoaderIcon className="w-5 h-5 animate-spin mx-auto z-20" />
                    ) : (
                      "Create Account"
                    )}
                  </button>
                </form>

                <div className="mt-6 text-center">
                  <Link
                    to="/login"
                    className="auth-link !text-slate-300 hover:text-pink-400 transition-colors duration-200 underline decoration-pink-400/50 hover:decoration-pink-400"
                  >
                    Already have an account? Login
                  </Link>
                </div>
              </div>
            </div>

            {/* FORM ILLUSTRATION - RIGHT SIDE */}
            <div className="hidden md:w-1/2 md:flex items-center justify-center p-6 relative">
              {/* Subtle glassmorphism background */}
              <div className="absolute inset-0 bg-slate-900/20 backdrop-blur-sm rounded-r-2xl" />

              {/* Purple accent glow for signup variant */}
              <div className="absolute inset-0 bg-gradient-to-bl from-purple-500/8 to-transparent rounded-r-2xl" />

              {/* Content */}
              <div className="relative z-10">
                <div className="relative">
                  <img
                    src="/signup.png"
                    alt="People using mobile devices"
                    className="w-full h-auto object-contain drop-shadow-2xl"
                  />
                  {/* Subtle glow behind image */}
                  <div className="absolute inset-0 bg-purple-500/10 blur-3xl -z-10" />
                </div>

                <div className="mt-6 text-center">
                  <h3 className="text-xl font-medium text-pink-400 mb-4">
                    Start Your Journey Today
                  </h3>

                  <div className="flex justify-center gap-3">
                    <span className="auth-badge bg-slate-800/40 backdrop-blur-sm !text-pink-400 border !border-pink-400/30 px-3 py-1 rounded-full text-sm">
                      Free
                    </span>
                    <span className="auth-badge bg-slate-800/40 backdrop-blur-sm !text-purple-400 border border-purple-400/30 px-3 py-1 rounded-full text-sm">
                      Easy Setup
                    </span>
                    <span className="auth-badge bg-slate-800/40 backdrop-blur-sm text-cyan-400 border border-cyan-400/30 px-3 py-1 rounded-full text-sm">
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

export default SignUpPage;

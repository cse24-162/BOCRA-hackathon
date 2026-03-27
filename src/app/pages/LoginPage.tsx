import { useState } from "react";
import heroBg from '../assets/heroBg.png';

export function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    console.log("Login attempt:", { email, password });

    // TODO: connect to backend
  };

  return (
    <div className="min-h-screen flex">

      {/* LEFT SIDE — BRANDING */}
      <div
        className="hidden lg:flex w-1/2 relative items-center justify-center text-white"
        style={{
          backgroundImage: `url(${heroBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-[#003A5C]/80 via-[#0077B3]/70 to-[#0095DA]/60" />

        <div className="relative z-10 max-w-md text-center px-6">
          <h1 className="text-4xl font-bold mb-4">
            Welcome Back
          </h1>
          <p className="text-blue-100">
            Access BOCRA services, track submissions, and manage your interactions securely.
          </p>
        </div>
      </div>

      {/* RIGHT SIDE — FORM */}
      <div className="flex w-full lg:w-1/2 items-center justify-center bg-white px-6 py-12">
        <div className="w-full max-w-md">

          {/* LOGO / TITLE */}
          <div className="mb-8 text-center">
            <div className="flex justify-center gap-1 mb-3">
              <div className="w-2 h-2 rounded-full bg-[#0095DA]" />
              <div className="w-2 h-2 rounded-full bg-[#00A651]" />
              <div className="w-2 h-2 rounded-full bg-[#E6007E]" />
              <div className="w-2 h-2 rounded-full bg-[#FDB913]" />
            </div>

            <h2 className="text-2xl font-bold text-gray-900">
              Sign In to BOCRA
            </h2>
            <p className="text-gray-500 text-sm mt-1">
              Enter your details to continue
            </p>
          </div>

          {/* FORM */}
          <form onSubmit={handleLogin} className="space-y-5">

            {/* EMAIL */}
            <div>
              <label className="text-sm font-medium text-gray-700">
                Email Address
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 w-full px-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#0095DA]"
                placeholder="you@example.com"
              />
            </div>

            {/* PASSWORD */}
            <div>
              <label className="text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 w-full px-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#0095DA]"
                placeholder="••••••••"
              />
            </div>

            {/* OPTIONS */}
            <div className="flex justify-between items-center text-sm">
              <label className="flex items-center gap-2 text-gray-600">
                <input type="checkbox" />
                Remember me
              </label>

              <a href="/forgot-password" className="text-[#0095DA] hover:underline">
                Forgot password?
              </a>
            </div>

            {/* BUTTON */}
            <button
              type="submit"
              className="w-full bg-[#0095DA] hover:bg-[#0077B3] text-white py-2.5 rounded-xl font-medium transition"
            >
              Sign In
            </button>

          </form>

          {/* SIGN UP */}
          <p className="text-center text-sm text-gray-600 mt-6">
            Don’t have an account?{" "}
            <a href="/register" className="text-[#0095DA] font-medium hover:underline">
              Create one
            </a>
          </p>

        </div>
      </div>
    </div>
  );
}
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleLogin = () => {
    if (email && password) {
      localStorage.setItem("isLoggedIn", "true");
      router.push("/");
    } else {
      alert("Please enter both email and password");
    }
  };

  return (
    <div className="min-h-screen bg-black relative">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-800/20 via-blue-800/10 to-black pointer-events-none" />

      {/* Alexa Logo */}
      <div className="absolute top-4 left-4 p-2 z-10">
        <img
          src="/alexa-logo.svg"
          alt="Alexa Club Logo"
          className="h-12 w-auto sm:h-10 xs:h-8 mobile:h-6"
        />
      </div>

      <div className="flex flex-col min-h-screen items-center justify-center px-4 relative z-10">
        {/* Page Heading */}
        <h1 className="text-5xl sm:text-4xl xs:text-3xl font-extrabold text-white mb-12 mt-4 text-center">
          Login to ADS Dashboard
        </h1>

        {/* Login Box */}
        <div className="relative bg-white/10 backdrop-blur-xl p-8 rounded-2xl shadow-2xl w-full max-w-md border border-white/20 overflow-hidden transition-all duration-300 hover:shadow-[0_0_20px_rgba(59,130,246,0.3)]">
          {/* Glow effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-50 pointer-events-none" />
          
          <div className="space-y-6">
            {/* Email Input */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-200 mb-2">
                Email
              </label>
              <input
                id="email"
                type="text"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200 hover:border-blue-400/50"
                required
                aria-required="true"
                aria-label="Email"
              />
            </div>

            {/* Password Input */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-200 mb-2">
                Password
              </label>
              <input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200 hover:border-blue-400/50"
                required
                aria-required="true"
                aria-label="Password"
              />
            </div>

            {/* Sign In Button */}
            <button
              onClick={handleLogin}
              className="w-full bg-blue-600 text-white p-3 rounded-lg font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-transparent transition-all duration-200 hover:scale-105 active:scale-95"
              aria-label="Sign in"
            >
              Sign In
            </button>

            {/* Forgot Password */}
            <div className="text-center mt-2">
              <a
                href="#"
                className="text-sm text-blue-400 hover:text-blue-500 transition-colors"
                aria-label="Forgot your password"
              >
                Forgot your password?
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile specific scaling for logo */}
      <style jsx>{`
        @media (max-width: 480px) {
          .absolute.top-4.left-4 img {
            height: 32px; /* smaller logo on mobile */
          }
        }
      `}</style>
    </div>
  );
}

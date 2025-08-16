"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../lib/supabase-client";
import { toast } from "react-hot-toast";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [role, setRole] = useState("other");

  const handleAuth = async () => {
    const redirectUrl =
  process.env.NODE_ENV === "production"
    ? process.env.NEXT_PUBLIC_SUPABASE_REDIRECT_URL_PROD
    : process.env.NEXT_PUBLIC_SUPABASE_REDIRECT_URL_DEV;
    if (isSignUp) {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo:redirectUrl
        }
      });

      if (error) {
        console.error(error.message);
        toast.error("Sign Up failed. Try again");
        return;
      }

      toast.success("Signup successful! Please check your email to confirm.");
      setEmail("");
      setPassword("");
      setIsSignUp(false);
      return;
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) {
      toast.error("Sign In failed. Try again");
      return;
    }

    const user = data.user;

    const { data: existingUser, error: existingError } = await supabase
      .from("users")
      .select("role")
      .eq("id", user.id)
      .single();

    if (existingError && existingError.code !== "PGRST116") {
      console.error(existingError.message);
      return;
    }

    if (!existingUser) {
      const { error: insertError } = await supabase.from("users").insert({
        id: user.id,
        email: user.email,
        role: "public"
      });
      if (insertError) {
        console.error(insertError.message);
        return;
      }
    }
    const { data: { session } } = await supabase.auth.getSession();

    if (!session?.user?.id) {
      throw new Error('No authenticated user found');
    }

    const userId = session.user.id; 

    const { data: userData, error: userError } = await supabase
      .from('users')
      .select('role')
      .eq('id', userId)
      .single();

    if (userError || !userData) {
      throw new Error(userError?.message || 'User role not found');
    }

    const role = userData.role;
    console.log("Fetched role:", role); 
    toast.success("Signed in successfully");

    router.push("/");
  };

  return (
    <div className="min-h-screen bg-black relative">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-800/20 via-blue-800/10 to-black pointer-events-none" />

      <div className="absolute top-4 left-4 p-2 z-10">
        <img
          src="/alexa-logo.svg"
          alt="Alexa Club Logo"
          className="h-12 w-auto sm:h-10 xs:h-8 mobile:h-6"
        />
      </div>

      <div className="flex flex-col min-h-screen items-center justify-center px-4 relative z-10">
        <h1 className="text-5xl sm:text-4xl xs:text-3xl font-extrabold text-white mb-12 mt-4 text-center">
          {isSignUp ? "Sign Up for ADS Dashboard" : "Sign In to ADS Dashboard"}
        </h1>

        <div className="relative bg-white/10 backdrop-blur-xl p-8 rounded-2xl shadow-2xl w-full max-w-md border border-white/20 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-50 pointer-events-none" />

          <div className="space-y-6">
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
                className="w-full p-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                required
              />
            </div>

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
                className="w-full p-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                required
              />
            </div>

            <button
              onClick={handleAuth}
              className="w-full bg-blue-600 text-white p-3 rounded-lg font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 transition-all duration-200"
            >
              {isSignUp ? "Sign Up" : "Sign In"}
            </button>

            <div className="text-center mt-2">
              {isSignUp ? (
                <p className="text-sm text-gray-300">
                  Already have an account?{" "}
                  <button
                    onClick={() => setIsSignUp(false)}
                    className="text-purple-400 hover:text-purple-500 underline"
                  >
                    Sign In
                  </button>
                </p>
              ) : (
                <p className="text-sm text-gray-300">
                  Don’t have an account?{" "}
                  <button
                    onClick={() => setIsSignUp(true)}
                    className="text-purple-400 hover:text-purple-500 underline"
                  >
                    Sign Up
                  </button>
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 480px) {
          .absolute.top-4.left-4 img {
            height: 32px;
          }
        }
      `}</style>
    </div>
  );
}

"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import IndividualRegistrationTable from "../../components/IndividualRegistrationTable";
import { IndividualRegistration } from "../../types/types";

export default function TechnicalPage() {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    router.push("/login");
  };

  // You can add static/mock registrations here if needed
  const registrations: IndividualRegistration[] = [];

  return (
    <div className="min-h-screen bg-black relative">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-800/20 via-blue-800/10 to-black z-0 pointer-events-none" />

      <div className="relative z-10 p-8">
        {/* Alexa Logo + Back Link */}
        <div className="absolute top-4 left-4 p-2 z-12 flex flex-col items-start gap-2">
          <Link href="/">
            <img
              src="/alexa-logo.svg"
              alt="Alexa Club Logo"
              className="h-12 w-auto sm:h-10 xs:h-8 mobile:h-6 hover:opacity-80 transition-opacity cursor-pointer"
            />
          </Link>
          <Link
            href="/recruitments25"
            className="inline-flex items-center text-purple-300 hover:text-purple-200 text-sm transition-colors"
          >
            ← Back to all domains
          </Link>
        </div>

        {/* Logout Button */}
        <div className="absolute top-4 right-4 z-12">
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg shadow-md transition-colors"
          >
            Logout
          </button>
        </div>

        {/* Main Content */}
        <div className="container mx-auto pt-24">
          <div className="bg-white/10 backdrop-blur-md rounded-xl shadow-lg overflow-hidden max-w-6xl mx-auto border border-white/20">
            <div className="bg-gradient-to-r from-pink-900 to-purple-900 p-6 text-white border-b border-purple-700">
              <h1 className="text-3xl font-bold">Creatives Domain</h1>
              <div className="flex flex-wrap gap-4 mt-2">
                <span>👥 {registrations.length} Registrations</span>
              </div>
            </div>

            <div className="p-6">
              <h2 className="text-2xl font-bold text-white mb-4">
                Participant Registrations
              </h2>

              <div className="border border-white/20 rounded-lg overflow-hidden bg-gray-900/50 backdrop-blur-sm">
                <IndividualRegistrationTable registrations={registrations} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Logo scaling */}
      <style jsx>{`
        @media (max-width: 480px) {
          div.absolute.top-4.left-4 img {
            height: 32px;
          }
          div.absolute.top-4.right-4 button {
            padding: 0.5rem;
            font-size: 0.8rem;
          }
        }
      `}</style>
    </div>
  );
}

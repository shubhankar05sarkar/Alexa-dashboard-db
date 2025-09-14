"use client";

import Link from "next/link";
import IndividualRegistrationTable from "../../components/IndividualRegistrationTable";
import { IndividualRegistration } from "../../types/types";
import { useState, useEffect } from "react";

type ApiParticipant = {
  _id?: string;
  name: string;
  registrationNumber: string;
  srmMailId: string;
  phoneNumber: string;
  registeredAt: string;
};

export default function VlogitPage() {
  const [registrations, setRegistrations] = useState<IndividualRegistration[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [yearFilter, setYearFilter] = useState<string | null>(null);
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const [showMobileFilter, setShowMobileFilter] = useState(false);

  useEffect(() => {
    const fetchRegistrations = async () => {
      try {
        const res = await fetch(
          "https://alexaverse-reg-be.onrender.com/api/vlogit/participants",
          {
            method: "GET",
            headers: {
              "x-event-password": "alexaprod2526",
            },
          }
        );

        if (!res.ok) throw new Error(`GET ${res.status} ${res.statusText}`);
        const result: { success: boolean; data: ApiParticipant[] } = await res.json();

        if (result.success && Array.isArray(result.data)) {
                  const formatted: IndividualRegistration[] = result.data.map(
                    (p: ApiParticipant, idx: number) => ({
                      id: p._id || String(idx),
                      name: p.name,
                      registerNumber: p.registrationNumber,
                      email: p.srmMailId,
                      phone: p.phoneNumber,
                      registeredAt: new Date(p.registeredAt).toLocaleString("en-IN", {
                        dateStyle: "medium",
                        timeStyle: "short",
                      }),
            })
          );
          setRegistrations(formatted);
        } else {
          console.error("Unexpected response shape:", result);
        }
      } catch (e: unknown) {
        if (e instanceof Error) {
          console.error("Error fetching participants:", e.message);
        } else {
          console.error("Unexpected error:", e);
        }
      }
    };

    fetchRegistrations();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    window.location.href = "/";
  };

  const getYearOfStudy = (registerNumber: string): number => {
    const batchYear = parseInt(registerNumber.substring(2, 4));
    const currentYear = 2025;
    return currentYear - 2000 - batchYear + 1;
  };

  const filteredRegistrations = registrations.filter((participant) => {
    const searchLower = searchTerm.toLowerCase();
    const matchesSearch =
      participant.name.toLowerCase().includes(searchLower) ||
      participant.registerNumber.toLowerCase().includes(searchLower) ||
      participant.email.toLowerCase().includes(searchLower) ||
      participant.phone.toLowerCase().includes(searchLower) ||
      participant.registeredAt.toLowerCase().includes(searchLower);

    const matchesYear = yearFilter
      ? getYearOfStudy(participant.registerNumber).toString() === yearFilter
      : true;

    return matchesSearch && matchesYear;
  });

  return (
    <div className="min-h-screen bg-black relative">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-800/20 via-blue-800/10 to-black z-0 pointer-events-none" />

      <div className="relative z-10 p-8">
        {/* Alexa Logo */}
        <div className="absolute top-4 left-4 p-2 z-12">
          <Link href="/">
            <img
              src="/alexa-logo.svg"
              alt="Alexa Club Logo"
              className="h-12 w-auto sm:h-10 xs:h-8 mobile:h-6 hover:opacity-80 transition-opacity cursor-pointer"
            />
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

        <div className="container mx-auto pt-16">
          <Link
            href="/alexaverse-v2"
            className="inline-flex items-center text-purple-300 hover:text-purple-200 mb-6 transition-colors"
          >
            ← Back to all events
          </Link>

          <div className="bg-white/10 backdrop-blur-md rounded-xl shadow-lg overflow-hidden max-w-6xl mx-auto border border-white/20">
            <div className="bg-gradient-to-r from-purple-900 to-pink-900 p-6 text-white border-b border-purple-700">
              <h1 className="text-3xl font-bold">Vlogit</h1>
              <div className="flex flex-wrap gap-4 mt-2">
                <span>📅 Sep 02-04, 2025</span>
                <span>📍 Mini Hall 2</span>
                <span>👥 {filteredRegistrations.length} Participants</span>
              </div>
            </div>

            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-white">
                  Participant Registrations
                </h2>

                {/* Desktop Inputs */}
                <div className="hidden md:flex gap-4">
                  <div className="relative">
                    <select
                      value={yearFilter || ""}
                      onChange={(e) => setYearFilter(e.target.value || null)}
                      className="bg-gray-800/50 border border-purple-500/30 rounded-lg py-2 px-4 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent appearance-none pr-8"
                    >
                      <option value="">All Years</option>
                      <option value="1">1st Year</option>
                      <option value="2">2nd Year</option>
                      <option value="3">3rd Year</option>
                      <option value="4">4th Year</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                      <svg
                        className="h-5 w-5 text-purple-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </div>
                  </div>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search participants..."
                      className="bg-gray-800/50 border border-purple-500/30 rounded-lg py-2 px-4 pl-10 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <svg
                      className="absolute left-3 top-2.5 h-5 w-5 text-purple-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                  </div>
                </div>

                {/* Mobile Icon Buttons */}
                <div className="flex md:hidden gap-2">
                  <button
                    onClick={() => setShowMobileSearch(!showMobileSearch)}
                    className="p-2 bg-gray-800/50 rounded-lg text-white hover:bg-gray-700"
                    aria-label="Search"
                  >
                    <svg
                      className="h-5 w-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                  </button>
                  <button
                    onClick={() => setShowMobileFilter(!showMobileFilter)}
                    className="p-2 bg-gray-800/50 rounded-lg text-white hover:bg-gray-700"
                    aria-label="Filter"
                  >
                    <svg
                      className="h-5 w-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2l-7 8v5l-2 1v-6L3 6V4z"
                      />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Conditionally show mobile search/filter */}
              {showMobileSearch && (
                <div className="mb-4">
                  <input
                    type="text"
                    placeholder="Search participants..."
                    className="w-full bg-gray-800/50 border border-purple-500/30 rounded-lg py-2 px-4 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              )}
              {showMobileFilter && (
                <div className="mb-4">
                  <select
                    value={yearFilter || ""}
                    onChange={(e) => setYearFilter(e.target.value || null)}
                    className="w-full bg-gray-800/50 border border-purple-500/30 rounded-lg py-2 px-4 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  >
                    <option value="">All Years</option>
                    <option value="1">1st Year</option>
                    <option value="2">2nd Year</option>
                    <option value="3">3rd Year</option>
                    <option value="4">4th Year</option>
                  </select>
                </div>
              )}

              <div className="border border-white/20 rounded-lg overflow-hidden bg-gray-900/50 backdrop-blur-sm">
                <IndividualRegistrationTable registrations={filteredRegistrations} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Logo Scaling */}
      <style jsx>{`
        @media (max-width: 480px) {
          div.absolute.top-4.left-4 img {
            height: 32px;
          }
        }
      `}</style>
    </div>
  );
}

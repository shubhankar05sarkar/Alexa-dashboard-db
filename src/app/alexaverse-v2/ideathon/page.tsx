"use client";

import Link from 'next/link';
// import TeamRegistrationTable from '../../components/TeamRegistrationTable';
// import { TeamRegistration } from '../../types/types';
// import { useState, useEffect } from 'react';
// Define API response types
/*
interface TeamMemberApi {
  _id?: string;
  name: string;
  registrationNumber: string;
  srmMailId: string;
  phoneNumber: string;
}

interface TeamApi {
  _id?: string;
  teamName: string;
  registeredAt: string;
  teamMembers: TeamMemberApi[];
}
*/

export default function IdeathonPage() {
  // const [registrations, setRegistrations] = useState<TeamRegistration[]>([]);
  // const [searchTerm, setSearchTerm] = useState('');
  // const [yearFilter, setYearFilter] = useState<string | null>(null);
  // const [showMobileSearch, setShowMobileSearch] = useState(false);
  // const [showMobileFilter, setShowMobileFilter] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    window.location.href = "/";
  };

  /*
  // Removed backend fetch logic
  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const res = await fetch("https://alexaverse-reg-be.onrender.com/api/ideathon/participants", {
          method: "GET",
          headers: {
            "x-event-password": "alexaprod2526"
          }
        });

        if (!res.ok) throw new Error(`GET ${res.status} ${res.statusText}`);
        const result = await res.json();

        if (result.success && Array.isArray(result.data)) {
          const formatted: TeamRegistration[] = result.data.map((team: TeamApi, idx: number) => ({
            teamId: team._id || String(idx),
            teamName: team.teamName,
            registeredAt: new Date(team.registeredAt).toLocaleString("en-IN", {
              dateStyle: "medium",
              timeStyle: "short",
            }),
            members: team.teamMembers.map((m: TeamMemberApi, midx: number) => ({
              id: m._id || `${team._id}-${midx}`,
              name: m.name,
              registerNumber: m.registrationNumber,
              email: m.srmMailId,
              phone: m.phoneNumber,
            })),
          }));
          setRegistrations(formatted);
        } else {
          console.error("Unexpected response shape:", result);
        }
      } catch (err) {
        console.error("Error fetching teams:", err);
      }
    };

    fetchTeams();
  }, []);
  */

  /*
  const getYearOfStudy = (registerNumber: string): number => {
    const batchYear = parseInt(registerNumber.substring(2, 4));
    const currentYear = 2025;
    return currentYear - 2000 - batchYear + 1;
  };

  const filteredRegistrations = registrations.filter(team => {
    const teamLead = team.members[0];
    const teamLeadYear = getYearOfStudy(teamLead.registerNumber);

    const searchLower = searchTerm.toLowerCase();
    const matchesSearch = 
      team.teamName.toLowerCase().includes(searchLower) ||
      team.registeredAt.toLowerCase().includes(searchLower) ||
      team.members.some(member => 
        member.name.toLowerCase().includes(searchLower) ||
        member.registerNumber.toLowerCase().includes(searchLower) ||
        member.email.toLowerCase().includes(searchLower) ||
        member.phone.includes(searchLower)
      );

    const matchesYear = yearFilter 
      ? teamLeadYear.toString() === yearFilter
      : true;

    return matchesSearch && matchesYear;
  });
  */

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
          <Link href="/alexaverse-v2" className="inline-flex items-center text-purple-300 hover:text-purple-200 mb-6 transition-colors">
            ← Back to all events
          </Link>
          
          <div className="bg-white/10 backdrop-blur-md rounded-xl shadow-lg overflow-hidden max-w-6xl mx-auto border border-white/20">
            <div className="bg-gradient-to-r from-blue-900 to-green-900 p-6 text-white border-b border-blue-600/50">
              <h1 className="text-3xl font-bold">Ideathon</h1>
              <div className="flex flex-wrap gap-4 mt-2">
                <span>📅 Sep 03, 2025</span>
                <span>📍 Mini Hall 2</span>
                {/*<span>👥 {filteredRegistrations.length} Teams Registered</span>*/}
              </div>
            </div>

            {/* 
            // Removed filters, search, and table display
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-white">Team Registrations</h2>
                <div className="hidden md:flex gap-4">
                  ...filters and search inputs...
                </div>
                <div className="flex md:hidden gap-2">
                  ...mobile search/filter buttons...
                </div>
              </div>
              {showMobileSearch && (...)}
              {showMobileFilter && (...)}
              <div className="border border-white/20 rounded-lg overflow-hidden bg-gray-900/50 backdrop-blur-sm">
                <TeamRegistrationTable registrations={filteredRegistrations} />
              </div>
            </div>
            */}
          </div>

          <a 
            href="https://docs.google.com/spreadsheets/d/1zGRCYjNFFfWU3eXfd0-R45ejWw8yyyJHANFp9BXK4os/edit?usp=sharing" 
            target="_blank" 
            rel="noopener noreferrer"
          >
            <button className="px-6 py-6.5 text-3xl bg-gradient-to-r from-blue-900 to-green-900 text-white font-bold rounded-xl shadow-md hover:scale-110 hover:shadow-lg transition-all duration-200 absolute left-1/2 top-[120%] transform -translate-x-1/2">
              View Google sheet
            </button>
          </a>
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

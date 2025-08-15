"use client";

import Link from 'next/link';
import TeamRegistrationTable from '../../components/TeamRegistrationTable';
import { TeamRegistration } from '../../types/types';
import { useState } from 'react';

const registrations: TeamRegistration[] = [
  {
    teamId: 'team1',
    teamName: 'The Innovators',
    registeredAt: 'Aug 14, 2025 10:30 AM',
    members: [
      { id: 'm1', name: 'Rahul Sharma (Team Lead)', registerNumber: 'RA2311003010001', email: 'rs1234@srmist.edu.in', phone: '9876543210' },
      { id: 'm2', name: 'Priya Patel', registerNumber: 'RA2411003010002', email: 'pp1234@srmist.edu.in', phone: '8765432109' },
      { id: 'm3', name: 'Amit Singh', registerNumber: 'RA2511003010003', email: 'as1234@srmist.edu.in', phone: '7654321098' },
      { id: 'm4', name: 'Neha Gupta', registerNumber: 'RA2311003010004', email: 'ng1234@srmist.edu.in', phone: '6543210987' }
    ]
  },
  {
    teamId: 'team2',
    teamName: 'Tech Pioneers',
    registeredAt: 'Aug 14, 2025 11:45 AM',
    members: [
      { id: 'm5', name: 'Sanjay Verma (Team Lead)', registerNumber: 'RA2411003010005', email: 'sv1234@srmist.edu.in', phone: '9876543211' },
      { id: 'm6', name: 'Ananya Reddy', registerNumber: 'RA2511003010006', email: 'ar1234@srmist.edu.in', phone: '8765432110' },
      { id: 'm7', name: 'Vikram Joshi', registerNumber: 'RA2311003010007', email: 'vj1234@srmist.edu.in', phone: '7654321099' },
      { id: 'm8', name: 'Divya Nair', registerNumber: 'RA2411003010008', email: 'dn1234@srmist.edu.in', phone: '6543210988' }
    ]
  }
];

export default function IdeathonPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [yearFilter, setYearFilter] = useState<string | null>(null);
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const [showMobileFilter, setShowMobileFilter] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    window.location.href = "/";
  };

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
                <span>👥 {filteredRegistrations.length} Teams Registered</span>
              </div>
            </div>
            
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-white">Team Registrations</h2>

                {/* Desktop Inputs */}
                <div className="hidden md:flex gap-4">
                  <div className="relative">
                    <select
                      value={yearFilter || ''}
                      onChange={(e) => setYearFilter(e.target.value || null)}
                      className="bg-gray-800/50 border border-blue-500/30 rounded-lg py-2 px-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none pr-8"
                    >
                      <option value="">All Years</option>
                      <option value="1">1st Year Teams</option>
                      <option value="2">2nd Year Teams</option>
                      <option value="3">3rd Year Teams</option>
                      <option value="4">4th Year Teams</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                      <svg className="h-5 w-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search teams or members..."
                      className="bg-gray-800/50 border border-blue-500/30 rounded-lg py-2 px-4 pl-10 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <svg
                      className="absolute left-3 top-2.5 h-5 w-5 text-blue-400"
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
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </button>
                  <button
                    onClick={() => setShowMobileFilter(!showMobileFilter)}
                    className="p-2 bg-gray-800/50 rounded-lg text-white hover:bg-gray-700"
                    aria-label="Filter"
                  >
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2l-7 8v5l-2 1v-6L3 6V4z" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Conditionally show mobile search/filter */}
              {showMobileSearch && (
                <div className="mb-4">
                  <input
                    type="text"
                    placeholder="Search teams or members..."
                    className="w-full bg-gray-800/50 border border-blue-500/30 rounded-lg py-2 px-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              )}
              {showMobileFilter && (
                <div className="mb-4">
                  <select
                    value={yearFilter || ''}
                    onChange={(e) => setYearFilter(e.target.value || null)}
                    className="w-full bg-gray-800/50 border border-blue-500/30 rounded-lg py-2 px-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">All Years</option>
                    <option value="1">1st Year Teams</option>
                    <option value="2">2nd Year Teams</option>
                    <option value="3">3rd Year Teams</option>
                    <option value="4">4th Year Teams</option>
                  </select>
                </div>
              )}

              <div className="border border-white/20 rounded-lg overflow-hidden bg-gray-900/50 backdrop-blur-sm">
                <TeamRegistrationTable registrations={filteredRegistrations} />
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

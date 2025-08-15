import { TeamRegistration } from '../types/types';

export default function TeamRegistrationTable({ registrations }: { registrations: TeamRegistration[] }) {
  return (
    <div className="overflow-x-auto">
      {/* Desktop Table */}
      <table className="min-w-full divide-y divide-gray-700 hidden md:table">
        <thead className="bg-gray-800">
          <tr>
            <th className="px-6 py-3 text-left text-sm font-medium text-purple-300 uppercase tracking-wider">Team Name</th>
            <th className="px-6 py-3 text-left text-sm font-medium text-purple-300 uppercase tracking-wider">Members</th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Registered At</th>
          </tr>
        </thead>
        <tbody className="bg-gray-900/50 divide-y divide-gray-700">
          {registrations.map((team) => (
            <tr key={team.teamId} className="hover:bg-gray-800/30 transition-colors">
              <td className="px-6 py-4 whitespace-nowrap font-semibold text-white">{team.teamName}</td>
              <td className="px-6 py-4">
                <div className="space-y-4">
                  {team.members.map((member) => (
                    <div key={member.id} className="border-l-4 border-purple-500/50 pl-3 py-2">
                      <p className="font-bold text-white text-lg">{member.name}</p>
                      {/* Use flex-col for all screen sizes */}
                      <div className="flex flex-col gap-1 mt-2">
                        <p className="text-gray-300"><span className="font-semibold text-purple-200">Reg No:</span> {member.registerNumber}</p>
                        <p className="text-gray-300"><span className="font-semibold text-purple-200">Email:</span> {member.email}</p>
                        <p className="text-gray-300"><span className="font-semibold text-purple-200">Phone:</span> {member.phone}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{team.registeredAt}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Mobile Cards */}
      <div className="flex flex-col gap-4 md:hidden">
        {registrations.map((team) => (
          <div key={team.teamId} className="bg-gray-900/50 border border-gray-700 rounded-lg p-4">
            <p className="font-bold text-lg text-white mb-2">Team: {team.teamName}</p>
            <p className="text-gray-400 mb-2"><span className="font-semibold text-purple-200">Registered At:</span> {team.registeredAt}</p>
            <div className="space-y-3">
              {team.members.map((member) => (
                <div key={member.id} className="bg-gray-800/70 rounded-lg p-3">
                  <p className="font-bold text-white">{member.name}</p>
                  <p className="text-gray-300"><span className="font-semibold text-purple-200">Reg No:</span> {member.registerNumber}</p>
                  <p className="text-gray-300"><span className="font-semibold text-purple-200">Email:</span> {member.email}</p>
                  <p className="text-gray-300"><span className="font-semibold text-purple-200">Phone:</span> {member.phone}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

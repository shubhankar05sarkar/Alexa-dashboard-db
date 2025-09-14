import { IndividualRegistrationWithRound } from "../types/types";

export default function IndividualRegistrationTableWithRound({
  registrations,
}: {
  registrations: IndividualRegistrationWithRound[];
}) {
  return (
    <div className="overflow-x-auto">
      {/* Desktop Table */}
      <table className="min-w-full divide-y divide-gray-700 hidden md:table">
        <thead className="bg-gray-800">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-purple-300 uppercase tracking-wider">
              Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-purple-300 uppercase tracking-wider">
              Reg No
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-purple-300 uppercase tracking-wider">
              Email
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-purple-300 uppercase tracking-wider">
              Phone
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Registered At
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Round
            </th>
          </tr>
        </thead>
        <tbody className="bg-gray-900/50 divide-y divide-gray-700">
          {registrations.map((reg) => (
            <tr
              key={reg.id}
              className="hover:bg-gray-800/50 transition-colors"
            >
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">
                {reg.name}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                {reg.registerNumber}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                {reg.email}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                {reg.phone}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {reg.registeredAt}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                {reg.round}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Mobile Cards */}
      <div className="flex flex-col gap-4 md:hidden">
        {registrations.map((reg) => (
          <div
            key={reg.id}
            className="bg-gray-900/50 border border-gray-700 rounded-lg p-4"
          >
            <p className="font-bold text-white text-lg mb-1">{reg.name}</p>
            <p className="text-gray-300">
              <span className="font-semibold text-purple-200">Reg No:</span>{" "}
              {reg.registerNumber}
            </p>
            <p className="text-gray-300">
              <span className="font-semibold text-purple-200">Email:</span>{" "}
              {reg.email}
            </p>
            <p className="text-gray-300">
              <span className="font-semibold text-purple-200">Phone:</span>{" "}
              {reg.phone}
            </p>
            <p className="text-gray-400">
              <span className="font-semibold text-purple-200">Registered At:</span>{" "}
              {reg.registeredAt}
            </p>
            <p className="text-gray-300">
              <span className="font-semibold text-purple-200">Round:</span>{" "}
              {reg.round}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

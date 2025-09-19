export type TeamMember = {
  id: string;
  name: string;
  registerNumber: string;
  email: string;
  phone: string;
};

export type TeamRegistration = {
  teamId: string;
  teamName: string;
  members: TeamMember[];
  registeredAt: string;
};

export type IndividualRegistration = {
  id: string;
  name: string;
  registerNumber: string;
  email: string;
  phone: string;
  registeredAt: string;
};

export type IndividualRegistrationWithRound = IndividualRegistration & {
  round: number;
};

export type Event = {
  id: string;
  name: string;
  description: string;
  date: string;
  location: string;
  isTeamEvent: boolean;
};

// ---------------- RBAC ----------------

export type UserRole = "lead&core" | "executive";

export type RolePermissions = {
  canBulkUpdate: boolean;
  canExport: boolean;
  canView: boolean;
  canFilter: boolean;
  canSearch: boolean;
};

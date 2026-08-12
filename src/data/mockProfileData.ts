export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: string;
  avatarUrl?: string;
  joinedDate: string;
  department?: string;
}

export const mockProfileData: UserProfile = {
  id: "usr-459",
  name: "Goutham Gagan",
  email: "g.gagan@regionos.gov",
  role: "Regional Administrator",
  joinedDate: "2024-03-15",
  department: "Central Operations & Governance",
};

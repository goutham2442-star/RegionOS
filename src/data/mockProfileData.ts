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
  name: "Guruprasath P",
  email: "guruprasath.p@regionos.demo",
  role: "Regional Director",
  joinedDate: "October 14, 2018",
  department: "Executive Leadership",
};

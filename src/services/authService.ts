import { mockProfileData } from "../data/mockProfileData";
import type { UserProfile } from "../data/mockProfileData";

export const authService = {
  getCurrentUser: async (): Promise<UserProfile> => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(mockProfileData), 200);
    });
  },
  
  login: async (email: string, password: string): Promise<UserProfile> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (email && password) {
          resolve(mockProfileData);
        } else {
          reject(new Error("Invalid credentials"));
        }
      }, 300);
    });
  },

  register: async (name: string, email: string, role: string): Promise<UserProfile> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          id: `usr-${Math.floor(Math.random() * 1000)}`,
          name,
          email,
          role,
          joinedDate: new Date().toISOString().split("T")[0],
        });
      }, 300);
    });
  }
};

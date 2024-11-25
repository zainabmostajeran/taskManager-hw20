import pb from "./pocketbase";
import { User } from "../types";

const authService = {
  login: async (email: string, password: string): Promise<User> => {
    try {
      const authData = await pb
        .collection("users")
        .authWithPassword(email, password);
      return authData.record as User;
    } catch (error) {
      throw new Error("Invalid email or password");
    }
  },

  logout: async (): Promise<void> => {
    pb.authStore.clear();
  },

  initializeAuth: async (): Promise<User | null> => {
    if (pb.authStore.isValid) {
      return pb.authStore.model as User;
    }
    return null;
  },
};

export default authService;

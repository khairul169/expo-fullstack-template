import { createStore, useStore } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import trpc from "~/lib/trpc";

type AuthStore = {
  isLoggedIn: boolean;
  sessionId?: string | null;
};

export const authStore = createStore(
  persist<AuthStore>(
    () => ({
      isLoggedIn: false,
      sessionId: null,
    }),
    {
      name: "auth",
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);

export const useAuth = () => {
  return useStore(authStore);
};

export const setLoggedIn = (sessionId?: string | null) => {
  authStore.setState({ isLoggedIn: true, sessionId });
};

export const logout = () => {
  authStore.setState({ isLoggedIn: false, sessionId: null });
};

export const useLogout = () => {
  const logoutMutation = trpc.auth.logout.useMutation({
    onSuccess: logout,
  });
  return logoutMutation;
};

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { demoAuth } from "../demoData/service";
import { fetchCurrentUser, login, register, type LoginPayload, type RegisterPayload } from "../services/authService";
import { useAuthStore } from "../stores/authStore";
import { useConfigStore } from "../stores/configStore";
import type { AuthUser } from "../types";

const CURRENT_USER_QUERY_KEY = ["auth", "currentUser"];

export const useCurrentUser = () => {
  const useDemoData = useConfigStore((state) => state.useDemoData);
  return useQuery({
    queryKey: CURRENT_USER_QUERY_KEY,
    queryFn: async (): Promise<AuthUser> => {
      if (useDemoData) {
        return demoAuth.getCurrentUser();
      }
      return fetchCurrentUser();
    },
    staleTime: 1000 * 60 * 5
  });
};

export const useLoginMutation = () => {
  const useDemoData = useConfigStore((state) => state.useDemoData);
  const setAuth = useAuthStore((state) => state.setAuth);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: LoginPayload) => {
      if (useDemoData) {
        const response = await demoAuth.login(payload.email, payload.password);
        const user = response.user!;
        setAuth(user, response.access_token);
        await queryClient.invalidateQueries({ queryKey: CURRENT_USER_QUERY_KEY });
        return { token: response.access_token, user };
      }

      const response = await login(payload);
      let user = response.user;
      if (!user) {
        user = await fetchCurrentUser();
      }
      setAuth(user, response.access_token);
      await queryClient.invalidateQueries({ queryKey: CURRENT_USER_QUERY_KEY });
      return { token: response.access_token, user };
    }
  });
};

export const useRegisterMutation = () => {
  const useDemoData = useConfigStore((state) => state.useDemoData);
  const setAuth = useAuthStore((state) => state.setAuth);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: RegisterPayload) => {
      if (useDemoData) {
        const response = await demoAuth.register(payload.email, payload.role);
        const user = await demoAuth.getCurrentUser();
        if (user) {
          setAuth(user, response.access_token ?? "demo-token");
        }
        await queryClient.invalidateQueries({ queryKey: CURRENT_USER_QUERY_KEY });
        return response;
      }

      const response = await register(payload);
      if (response.access_token) {
        const user = await fetchCurrentUser();
        setAuth(user, response.access_token);
        await queryClient.invalidateQueries({ queryKey: CURRENT_USER_QUERY_KEY });
      }
      return response;
    }
  });
};

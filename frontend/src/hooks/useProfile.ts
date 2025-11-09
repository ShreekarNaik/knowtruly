import { useQuery } from "@tanstack/react-query";
import { demoProfiles } from "../demoData/service";
import { getProfile, listProfiles } from "../services/profileService";
import { useAuthStore } from "../stores/authStore";
import { useConfigStore } from "../stores/configStore";
import type { Profile } from "../types";

export const useProfile = (profileId?: string) => {
  const useDemoData = useConfigStore((state) => state.useDemoData);
  const fallbackProfileId = useAuthStore((state) => state.user?.profileId);
  const idToLoad = profileId ?? fallbackProfileId ?? (useDemoData ? "demo-profile" : undefined);

  return useQuery({
    queryKey: ["profile", idToLoad, useDemoData],
    queryFn: async (): Promise<Profile> => {
      if (useDemoData) {
        return demoProfiles.getProfile(idToLoad ?? "demo-profile");
      }
      if (!idToLoad) {
        throw new Error("Profile ID not available");
      }
      return getProfile(idToLoad);
    },
    enabled: Boolean(idToLoad) || useDemoData
  });
};

export const useProfilesList = () => {
  const useDemoData = useConfigStore((state) => state.useDemoData);

  return useQuery({
    queryKey: ["profiles", useDemoData],
    queryFn: async (): Promise<Profile[]> => {
      if (useDemoData) {
        return demoProfiles.listProfiles();
      }
      return listProfiles();
    }
  });
};

import type { Profile } from "../types";
import { apiClient } from "./api";

export const getProfile = async (profileId: string) => {
  const { data } = await apiClient.get<Profile>(`/profiles/${profileId}`);
  return data;
};

export const updateProfile = async (profileId: string, payload: Partial<Profile>) => {
  const { data } = await apiClient.patch<{ profile_id: string; version: number; updated_fields: string[] }>(
    `/profiles/${profileId}`,
    payload
  );
  return data;
};

export const listProfiles = async () => {
  const { data } = await apiClient.get<{ profiles: Profile[] }>("/profiles");
  return data.profiles;
};

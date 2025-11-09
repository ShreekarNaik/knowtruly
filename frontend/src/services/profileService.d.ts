import type { Profile } from "../types";
export declare const getProfile: (profileId: string) => Promise<Profile>;
export declare const updateProfile: (profileId: string, payload: Partial<Profile>) => Promise<{
    profile_id: string;
    version: number;
    updated_fields: string[];
}>;
export declare const listProfiles: () => Promise<Profile[]>;

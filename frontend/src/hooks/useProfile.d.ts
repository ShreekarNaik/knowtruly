import type { Profile } from "../types";
export declare const useProfile: (profileId?: string) => import("@tanstack/react-query").UseQueryResult<Profile, Error>;
export declare const useProfilesList: () => import("@tanstack/react-query").UseQueryResult<Profile[], Error>;

import type { TemplateDetail } from "../types";
export declare const useTemplates: () => import("@tanstack/react-query").UseQueryResult<TemplateDetail[], Error>;
export declare const useTemplateDetail: (templateId?: string) => import("@tanstack/react-query").UseQueryResult<TemplateDetail | undefined, Error>;

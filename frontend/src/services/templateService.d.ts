import type { TemplateDetail, TemplatePreview } from "../types";
export declare const listTemplates: () => Promise<TemplatePreview[]>;
export declare const getTemplateDetail: (templateId: string) => Promise<TemplateDetail>;

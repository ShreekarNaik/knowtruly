import type { TemplateDetail, TemplatePreview } from "../types";
import { apiClient } from "./api";

export const listTemplates = async () => {
  const { data } = await apiClient.get<{ templates: TemplatePreview[] }>("/templates");
  return data.templates;
};

export const getTemplateDetail = async (templateId: string) => {
  const { data } = await apiClient.get<TemplateDetail>(`/templates/${templateId}`);
  return data;
};

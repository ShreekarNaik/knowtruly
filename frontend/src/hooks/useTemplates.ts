import { useQuery } from "@tanstack/react-query";
import { demoTemplatesApi } from "../demoData/service";
import { getTemplateDetail, listTemplates } from "../services/templateService";
import { useConfigStore } from "../stores/configStore";
import type { TemplateDetail } from "../types";

export const useTemplates = () => {
  const useDemoData = useConfigStore((state) => state.useDemoData);

  return useQuery({
    queryKey: ["templates", useDemoData],
    queryFn: async (): Promise<TemplateDetail[]> => {
      if (useDemoData) {
        return demoTemplatesApi.listTemplates();
      }
      return listTemplates();
    }
  });
};

export const useTemplateDetail = (templateId?: string) => {
  const useDemoData = useConfigStore((state) => state.useDemoData);

  return useQuery({
    queryKey: ["template", templateId, useDemoData],
    queryFn: async (): Promise<TemplateDetail | undefined> => {
      if (useDemoData) {
        return demoTemplatesApi.getTemplateDetail(templateId ?? "tmpl-modern");
      }
      if (!templateId) {
        throw new Error("Template ID is required");
      }
      return getTemplateDetail(templateId);
    },
    enabled: Boolean(templateId) || useDemoData
  });
};

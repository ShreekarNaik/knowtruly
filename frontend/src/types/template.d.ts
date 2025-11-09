export type LayoutType = "single_column" | "two_column" | "modern" | "academic";
export interface TemplatePreview {
    templateId: string;
    name: string;
    layoutType: LayoutType;
    previewUrl?: string;
    typstFile: string;
    description?: string;
}
export interface TemplateDetail extends TemplatePreview {
    layoutBlocks?: string[];
    fieldMappings?: Record<string, unknown>;
    pageConstraints?: Record<string, unknown>;
    styleMetadata?: Record<string, unknown>;
}

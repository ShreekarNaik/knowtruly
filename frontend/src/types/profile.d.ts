export interface ContactHandles {
    email?: string;
    phone?: string;
    linkedin?: string;
    github?: string;
}
export interface EducationEntry {
    id: string;
    institution: string;
    degree: string;
    fieldOfStudy: string;
    startDate?: string;
    endDate?: string;
    gpa?: number;
    achievements?: string[];
}
export interface PositionEntry {
    id: string;
    title: string;
    company: string;
    startDate?: string;
    endDate?: string;
    description?: string;
    skillsUsed?: string[];
}
export type SkillProficiency = "beginner" | "intermediate" | "advanced" | "expert";
export interface SkillEntry {
    id: string;
    name: string;
    proficiency: SkillProficiency;
    evidenceIds?: string[];
    verified?: boolean;
}
export interface ProjectEntry {
    id: string;
    title: string;
    roleDescription?: string;
    artifacts?: string[];
    startDate?: string;
    endDate?: string;
    technologies?: string[];
    metrics?: Record<string, string | number>;
}
export interface Profile {
    id: string;
    ownerId: string;
    version: number;
    canonicalName: string;
    headline?: string;
    summary?: string;
    contactHandles: ContactHandles;
    education: EducationEntry[];
    positions: PositionEntry[];
    skills: SkillEntry[];
    projects: ProjectEntry[];
    verifiableClaims: string[];
    embeddingId?: string;
    createdAt: string;
    updatedAt: string;
}

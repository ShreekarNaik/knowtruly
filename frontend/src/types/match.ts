export interface MatchSkill {
  skill: string;
  confidence: number;
}

export interface MatchEvidence {
  type: "project" | "position" | "education";
  id: string;
  relevance: number;
}

export interface MatchExplanation {
  topMatchingSkills: MatchSkill[];
  topEvidence: MatchEvidence[];
  gaps: string[];
}

export interface MatchResult {
  candidateId: string;
  roleId: string;
  score: number;
  explanation: MatchExplanation;
  matchedAt: string;
}

export interface MatchQuery {
  roleDescriptor: {
    title: string;
    description: string;
    requiredSkills: string[];
    preferredSkills?: string[];
    constraints?: Record<string, unknown>;
  };
  filters?: Record<string, unknown>;
  topK?: number;
}

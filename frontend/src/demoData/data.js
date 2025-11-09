var nowIso = new Date().toISOString();
export var demoProfile = {
    id: "demo-profile",
    ownerId: "demo-user",
    version: 3,
    canonicalName: "sophia-carter",
    headline: "AI Product Engineer · KnowTruly.me",
    summary: "Engineer focused on trustworthy talent intelligence. I build matching engines, resume automation, and signature pipelines that help candidates tell their stories with evidence.",
    contactHandles: {
        email: "sophia@knowtruly.me",
        phone: "+1-555-0199",
        linkedin: "https://linkedin.com/in/sophiacarter",
        github: "https://github.com/sophiacarter"
    },
    education: [
        {
            id: "edu-1",
            institution: "Stanford University",
            degree: "M.S. Computer Science",
            fieldOfStudy: "Artificial Intelligence",
            startDate: "2020-09-01",
            endDate: "2022-06-01",
            gpa: 3.9,
            achievements: ["Graduate Research Fellowship", "Published paper on explainable AI"]
        },
        {
            id: "edu-2",
            institution: "University of Washington",
            degree: "B.S. Human Centered Design & Engineering",
            fieldOfStudy: "Human Computer Interaction",
            startDate: "2016-09-01",
            endDate: "2020-06-01",
            gpa: 3.8,
            achievements: ["Dean's List (6x)", "HCDE Capstone Award"]
        }
    ],
    positions: [
        {
            id: "pos-1",
            title: "Founding Engineer",
            company: "KnowTruly.me",
            startDate: "2023-03-01",
            description: "Designed the semantic matchmaker service, Gemini-based resume generation flows, and signature verification pipeline.",
            skillsUsed: ["FastAPI", "PostgreSQL", "React", "Gemini API", "Qdrant"]
        },
        {
            id: "pos-2",
            title: "Product Engineer",
            company: "TalentCraft AI",
            startDate: "2021-05-01",
            endDate: "2023-02-28",
            description: "Built interviewer analytics dashboards and optimized resume scoring accuracy by 23% using hybrid embeddings.",
            skillsUsed: ["Python", "Next.js", "TensorFlow", "GCP"]
        }
    ],
    skills: [
        {
            id: "skill-1",
            name: "FastAPI",
            proficiency: "expert",
            verified: true
        },
        {
            id: "skill-2",
            name: "React",
            proficiency: "expert",
            verified: true
        },
        {
            id: "skill-3",
            name: "Gemini API",
            proficiency: "advanced",
            verified: true
        },
        {
            id: "skill-4",
            name: "Vector Databases",
            proficiency: "advanced",
            verified: false
        }
    ],
    projects: [
        {
            id: "proj-1",
            title: "Semantic Matchmaker",
            roleDescription: "Lead engineer, architected hybrid search combining embeddings and rule filters.",
            artifacts: ["https://github.com/knowtruly/matchmaker"],
            startDate: "2023-04-01",
            technologies: ["FastAPI", "Qdrant", "PostgreSQL", "Gemini"],
            metrics: { "Precision@10": "0.82", "Latency_p95": "450ms" }
        },
        {
            id: "proj-2",
            title: "Resume Generation Engine",
            roleDescription: "Implemented Typst orchestration and Gemini rephrase loops.",
            artifacts: ["https://github.com/knowtruly/resume-engine"],
            startDate: "2023-06-01",
            technologies: ["Typst", "Docker", "Python", "Gemini"],
            metrics: { "Generation_time": "8.2s" }
        }
    ],
    verifiableClaims: ["claim-1", "claim-2"],
    embeddingId: "embed-demo",
    createdAt: "2023-03-01T09:00:00.000Z",
    updatedAt: nowIso
};
export var demoResumes = [
    {
        id: "resume-1",
        name: "Senior Software Engineer · AI Platforms",
        targetRole: "Senior Software Engineer",
        updatedAt: "2024-09-02T18:30:00.000Z",
        progress: 85,
        templateId: "tmpl-modern"
    },
    {
        id: "resume-2",
        name: "Product Engineer · Talent Intelligence",
        targetRole: "Product Engineer",
        updatedAt: "2024-08-15T12:15:00.000Z",
        progress: 72,
        templateId: "tmpl-classic"
    },
    {
        id: "resume-3",
        name: "AI Research Engineer",
        targetRole: "AI Research Engineer",
        updatedAt: "2024-07-21T09:45:00.000Z",
        progress: 58,
        templateId: "tmpl-academic"
    }
];
export var demoResumeDetails = {
    "resume-1": {
        resumeId: "resume-1",
        profileSnapshotId: "snapshot-1001",
        downloadUrl: "/demo/resumes/resume-1.pdf",
        format: "pdf",
        createdAt: "2024-09-02T18:30:00.000Z",
        generationMetadata: {
            rephrasedSections: ["summary", "projects"],
            templateUsed: "tmpl-modern",
            generatedAt: "2024-09-02T18:30:00.000Z"
        }
    },
    "resume-2": {
        resumeId: "resume-2",
        profileSnapshotId: "snapshot-1002",
        downloadUrl: "/demo/resumes/resume-2.pdf",
        format: "pdf",
        createdAt: "2024-08-15T12:15:00.000Z",
        generationMetadata: {
            rephrasedSections: ["summary"],
            templateUsed: "tmpl-classic",
            generatedAt: "2024-08-15T12:15:00.000Z"
        }
    },
    "resume-3": {
        resumeId: "resume-3",
        profileSnapshotId: "snapshot-1003",
        downloadUrl: "/demo/resumes/resume-3.pdf",
        format: "pdf",
        createdAt: "2024-07-21T09:45:00.000Z",
        generationMetadata: {
            rephrasedSections: ["summary", "experience"],
            templateUsed: "tmpl-academic",
            generatedAt: "2024-07-21T09:45:00.000Z"
        }
    }
};
export var demoTemplates = [
    {
        templateId: "tmpl-modern",
        name: "Modern Tech",
        layoutType: "two_column",
        description: "Two column layout optimized for software engineering roles.",
        previewUrl: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=600&q=80",
        typstFile: "modern_tech.typ",
        fieldMappings: {
            sections: ["header", "summary", "experience", "skills", "projects", "education"]
        },
        pageConstraints: {
            max_pages: 2,
            max_chars_per_section: {
                summary: 500,
                projects: 220
            }
        }
    },
    {
        templateId: "tmpl-classic",
        name: "Classic Professional",
        layoutType: "single_column",
        description: "Conservative single column layout for product and program roles.",
        previewUrl: "https://images.unsplash.com/photo-1454165205744-3b78555e5572?auto=format&fit=crop&w=600&q=80",
        typstFile: "classic.typ",
        fieldMappings: {
            sections: ["header", "summary", "experience", "skills", "education", "projects"]
        }
    },
    {
        templateId: "tmpl-academic",
        name: "Academic CV",
        layoutType: "modern",
        description: "Academic focused layout highlighting publications and research.",
        previewUrl: "https://images.unsplash.com/photo-1526243741027-444d633d7365?auto=format&fit=crop&w=600&q=80",
        typstFile: "academic.typ",
        fieldMappings: {
            sections: ["header", "summary", "research", "projects", "skills", "education"]
        }
    }
];
export var demoMatchResults = [
    {
        candidateId: "demo-profile",
        roleId: "role-frontend-lead",
        score: 0.91,
        explanation: {
            topMatchingSkills: [
                { skill: "React", confidence: 0.94 },
                { skill: "FastAPI", confidence: 0.9 },
                { skill: "Gemini API", confidence: 0.88 }
            ],
            topEvidence: [
                { type: "project", id: "proj-1", relevance: 0.92 },
                { type: "position", id: "pos-1", relevance: 0.88 }
            ],
            gaps: ["Production experience with AWS SageMaker"]
        },
        matchedAt: "2024-09-10T10:00:00.000Z"
    },
    {
        candidateId: "candidate-23",
        roleId: "role-frontend-lead",
        score: 0.83,
        explanation: {
            topMatchingSkills: [
                { skill: "TypeScript", confidence: 0.89 },
                { skill: "GraphQL", confidence: 0.82 }
            ],
            topEvidence: [{ type: "project", id: "proj-a9", relevance: 0.8 }],
            gaps: ["Experience leading hiring loops"]
        },
        matchedAt: "2024-09-10T10:00:00.000Z"
    },
    {
        candidateId: "candidate-11",
        roleId: "role-frontend-lead",
        score: 0.79,
        explanation: {
            topMatchingSkills: [
                { skill: "Design Systems", confidence: 0.85 },
                { skill: "Accessibility", confidence: 0.82 }
            ],
            topEvidence: [{ type: "project", id: "proj-b3", relevance: 0.78 }],
            gaps: ["Experience mentoring senior engineers"]
        },
        matchedAt: "2024-09-10T10:00:00.000Z"
    }
];
export var demoClaims = [
    {
        claimId: "claim-1",
        issuerId: "issuer-knowtruly",
        issuerName: "KnowTruly Credentialing",
        subjectProfileId: "demo-profile",
        claimType: "employment",
        claimPayload: {
            company: "KnowTruly.me",
            title: "Founding Engineer",
            start_date: "2023-03-01",
            verification_url: "https://knowtruly.me/signatures/claim-1"
        },
        signature: "demo-signature-1",
        signatureAlgorithm: "RSA-SHA256",
        issuedAt: "2024-04-02T17:00:00.000Z",
        expiresAt: "2025-04-02T17:00:00.000Z",
        status: "active"
    },
    {
        claimId: "claim-2",
        issuerId: "issuer-stanford",
        issuerName: "Stanford University",
        subjectProfileId: "demo-profile",
        claimType: "degree",
        claimPayload: {
            institution: "Stanford University",
            degree: "M.S. Computer Science",
            graduation_year: 2022
        },
        signature: "demo-signature-2",
        signatureAlgorithm: "Ed25519",
        issuedAt: "2022-06-15T00:00:00.000Z",
        expiresAt: "2027-06-15T00:00:00.000Z",
        status: "active"
    }
];
export var demoAuditLog = {
    entityId: "demo-profile",
    logs: [
        {
            action: "resume_generated",
            actorId: "demo-user",
            actorName: "Sophia Carter",
            timestamp: "2024-09-02T18:30:00.000Z",
            metadata: {
                resume_id: "resume-1",
                template: "tmpl-modern"
            }
        },
        {
            action: "profile_updated",
            actorId: "demo-user",
            actorName: "Sophia Carter",
            timestamp: "2024-08-15T12:12:00.000Z",
            metadata: {
                sections: ["projects", "summary"]
            }
        },
        {
            action: "role_matched",
            actorId: "system",
            actorName: "KnowTruly Matchmaker",
            timestamp: "2024-07-22T09:55:00.000Z",
            metadata: {
                role_id: "role-frontend-lead",
                score: 0.91
            }
        }
    ]
};
export var demoRecruiterCandidates = [
    {
        candidateId: "demo-profile",
        name: "Sophia Carter",
        headline: "Founding Engineer · KnowTruly.me",
        matchScore: 0.91,
        previewOnly: false
    },
    {
        candidateId: "candidate-23",
        name: "Avery Johnson",
        headline: "Senior Software Engineer · MatchFlow",
        matchScore: 0.87,
        previewOnly: true
    },
    {
        candidateId: "candidate-11",
        name: "Jordan Smith",
        headline: "Frontend Architect · Nova Labs",
        matchScore: 0.82,
        previewOnly: true
    }
];

# KnowTruly.me — Startup Constitution

## Purpose

Provide a single reference document describing product intent, high-level software architecture, core workflows, security and verification model, operational rules, and governance for KnowTruly.me. The document is a bird’s-eye guide for engineers, product managers, designers, and operators to align decisions, create goals, and implement features consistently.

---

## Mission

Enable continuous, verifiable, semantic representation of student skills and accomplishments, and provide recruiters a privacy-aware semantic match and verification platform that replaces static resumes with living, auditable knowledge graphs.

---

## Core principles

1. **Semantic-first**: Represent people and artifacts as structured semantic profiles (digital twins) rather than flat documents. All matching and generation use semantic representations and embeddings.
2. **Live and auditable**: Profiles evolve; changes are tracked, versioned, and optionally verifiable with cryptographic signatures.
3. **Privacy-by-design**: Default minimal data sharing; explicit consent and fine-grained modes for recruiter access (resume-locked vs dynamic profile). Encrypt sensitive fields at rest and in transit.
4. **Composability**: Modular services with clear contracts: Profile Store, Template Engine, LLM Orchestration, Semantic Matchmaker, Signature Service, Documentation Generator, Recruiter Portal.
5. **Deterministic UX for reproducibility**: Resume generation should be repeatable given the same inputs and system model versions.
6. **Developer ergonomics**: Clear APIs, test fixtures, and sandbox environments to validate feature changes and match quality.

---

## High-level product overview

- **Users:** Students, Recruiters, Universities/Placement Cells, Employers, Third-party verifiers.
- **Primary value:** Students maintain contextual, role-specific resumes generated from a living profile; recruiters discover and verify candidates using semantic scoring and cryptographic claims.
- **Key differentiators:** Continuous profile sync; crypto-verifiable claims; an embedding-backed semantic matchmaker; auto-documentation of projects; template ecosystem coupled with AI rephrasing.

---

## Key features (concise intent + acceptance criteria)

1. **Resume template ecosystem**

   - Intent: Provide curated templates that map profile fields to visual blocks and content constraints. Templates define layout, content density, and fallback rules.
   - Acceptance: Template selection + profile input produces a visually valid resume without overflows across supported page sizes.

2. **AI rephrasing for compact layout**

   - Intent: Condense text to fit template constraints while preserving meaning and verifiability. Rephrasing must avoid hallucinations and preserve claims that can be verified.
   - Acceptance: Generated text remains faithful to the profile; key claim tokens are preserved or linked to source claims. Automated test compares semantic similarity and claim-presence.

3. **Verifiable signatures using cryptography**

   - Intent: Allow issuers (universities, employers, placement cells) to sign claims or entire snapshots so recipients can validate provenance.
   - Acceptance: Signatures use standard asymmetric keys (e.g., RSA/ECDSA or modern preferred scheme). Verification endpoint returns boolean and signed metadata. Signed snapshots are immutable and referenceable by ID.

4. **Auto project documentation**

   - Intent: Generate structured project readmes from profile inputs (goal, contributions, technologies, outcomes, artifacts, links) and bind them to the profile and project IDs.
   - Acceptance: For any project entry, documentation generator produces a human-readable summary, a technical artifact list, and linkage to verifiable evidence where available.

5. **Backend semantic matchmaker using embeddings**

   - Intent: Score candidate-to-role fit using dense vector representations and structured constraints. Provide explainability signals (top matching fields and example evidence).
   - Acceptance: Match endpoint returns score, top contributing features, and top-k evidence items. System supports incremental re-ranking with structured filters.

---

## System architecture (bird’s-eye)

Components and their responsibilities:

1. **Profile Service / Knowledge Store**

   - Stores semantic profiles (digital twins) as a knowledge graph or document store with normalized entities for skills, projects, roles, timelines.
   - Exposes versioned read/write APIs and change-streams for downstream sync.

2. **Embedding Service**

   - Computes and stores embeddings for profile fields, project artifacts, job descriptions, and templates. Supports vector indexing for nearest-neighbor retrieval.

3. **Matchmaker Engine**

   - Accepts role descriptors (structured + text) and returns ranked candidates using hybrid scoring (vector similarity + rule filters). Exposes explainability metadata.

4. **Template Engine**

   - Maps profile data into layout blocks, applies AI rephrasing where required, and renders output (PDF, DOCX, HTML). Integrates layout constraint solver for compactness.

5. **LLM Orchestration Layer**

   - Manages prompts, model versions, deterministic seeds, safety checks, and hallucination filters. Responsible for rephrasing, conversational profile updates, and documentation generation.

6. **Signature Service**

   - Manages issuer key pairs, signature issuance and verification logs, and signature anchoring to snapshots (immutable IDs). Keeps an audit trail.

7. **Recruiter Portal**

   - Frontend and API layer for recruiters to query, filter, request relevance assessments, and fetch either resume-locked snapshots or dynamic profiles subject to consent.

8. **Audit & Compliance Service**

   - Record access logs, consent records, verification attempts, and data deletion requests. Support GDPR/other compliance processes.

9. **Sync & Notifications**

   - Handles profile sync from multiple sources (student inputs, university feeds, GitHub, portfolios) and notifies users about profile changes, verification requests, and recruiter interactions.

10. **Monitoring & Observability**

- Track performance, match quality metrics, LLM cost, ranking drift, signature failures, and key business KPIs.

---

## Data model (abstract)

- **Profile (digital twin)**

  - id, owner_id, versions[], canonical_name, contact_handles, education[], positions[], skills[{name, proficiency, evidence_ids}], projects[{id, title, role_description, artifacts, start_date, end_date, metrics}], badges[], verifiable_claims[]

- **Verifiable claim**

  - claim_id, issuer_id, subject_profile_id, claim_payload, signature_meta, issued_at, status

- **Template**

  - template_id, layout_blocks[], field_mappings, page_constraints, style_metadata

- **Role descriptor**

  - role_id, title, description, required_skills[], preferred_skills[], constraints{location, availability, degree}

- **Embedding index**

  - entity_id -> vector, metadata

---

## Core workflows (condensed)

1. **Student onboarding & profile maintenance**

   - Student signs up -> creates profile or imports data -> system generates initial embedding and semantic normalization -> student can converse with the platform to add or edit entries -> changes create a new version.

2. **Resume generation (role-specific)**

   - Student selects a template and a target role -> Template Engine requests top-k profile fields and supporting evidence -> LLM Orchestration consolidates and rephrases text to fit layout constraints -> output rendered and versioned. Option to sign snapshot.

3. **Project auto-documentation**

   - When a project entry is added/updated or linked to a repository, Documentation Generator creates a standardized README and artifact manifest; links become evidence items with checksums and URLs.

4. **Verification & signing**

   - Issuer requests to sign a claim or snapshot via Signature Service -> signature recorded with issuer metadata and timestamp -> signed object is stored as immutable snapshot with signature pointer.

5. **Recruiter discovery & assessment**

   - Recruiter issues a search or uploads a JD -> Matchmaker returns ranked candidates with explainability -> recruiter requests relevance assessment or deeper verification -> student consent flow (if dynamic profile requested) -> auditor logs consent and access.

6. **Lifecycle: edits and audit**

   - Profile edits produce new versions and are linked with previous snapshots. Verifiable signed snapshots remain immutable and can be referenced in applications.

---

## API and integration surface (high level)

- **Auth/Identity**: OAuth2 + short-lived session tokens; issuer PKI for signing actions.
- **Profile API**: GET /profiles/{id}?version=, POST /profiles, PATCH /profiles/{id}
- **Resume API**: POST /resumes/generate {profile_id, template_id, role_descriptor, options} -> returns resume_id, render links.
- **Match API**: POST /match {role_descriptor, filters, top_k} -> returns [{candidate_id, score, explanation}]
- **Signature API**: POST /sign {issuer_token, snapshot_id, claim} -> returns signature_token. GET /verify/{signature_token}
- **Embeddings API**: POST /embed {text, metadata} -> returns vector_id
- **Audit API**: GET /audit/{entity_id}

Implementation note: Keep APIs idempotent and versioned; design for feature flags and graceful deprecation.

---

## Security and privacy

- **Data encryption**: TLS in transit, AES-256 at rest. Per-tenant or per-profile encryption keys where required.
- **Signature keys**: Hardware-backed key management recommended for issuer keys. Rotate keys with clear revocation lists.
- **Access control**: RBAC for internal services; consent-based access for recruiter views. Support field-level redaction.
- **Data minimization**: Default recruiter queries should return minimal preview. Recruiter must request expanded access; student consent required for dynamic profiles.
- **Auditability**: Immutable logs for signature issuance and verification requests; tamper-evident storage for snapshots.
- **LLM safety**: Sanitize inputs, filter PII before model calls, maintain prompt templates under version control, and record model decisions for reproducibility.

---

## Operational rules

- **Versioning**: All public APIs and templates must carry semantic version numbers. Resume templates changes must include migration rules for existing snapshots.
- **Backups**: Nightly backups and weekly full snapshots; test restore quarterly.
- **SLA**: Define availability targets for core services (e.g., Profile Store 99.9% monthly), and SLOs for match latency and resume generation latency.
- **Incident response**: Playbooks for signature compromise, data exfiltration, and critical model regressions.

---

## Governance, roles, and responsibilities

- **Product**: Maintains roadmap, acceptance criteria for features, user-facing templates, and match quality targets.
- **Engineering**: Owns services and APIs, test coverage, CI/CD, rollout, and observability.
- **Data & ML**: Embedding model selection, retraining cadence, bias monitoring, and match explainability.
- **Security & Compliance**: Key management, audits, privacy, and external compliance certifications.
- **Customer Success / Partnerships**: University onboarding, issuer key provisioning, support for verifiers.
- **Design / UX**: Template design, accessibility, and interaction flows for consent.

Decision authority: Major architecture and security decisions require cross-functional sign-off (Engineering Lead, Data Lead, Product Lead, Security Lead).

---

## Metrics and KPIs (initial)

- Student retention and active profiles
- Resume generation success rate and average generation latency
- Match conversion: recruiter contact -> interview ratio
- Signature issuance rate and verification success rate
- Match quality drift and NDCG-like ranking metrics on labeled evaluation sets
- LLM cost per generated resume and per documentation artifact

---

## Roadmap alignment and prioritization principles

Prioritize features that increase trust and match quality: verifiable claims and matchmaker accuracy first, then templates and AI rephrasing for UX. Use impact/effort scoring and maintain a small set of strategic bets each quarter. Keep a separate backlog for compliance and hardening tasks.

---

## Implementation guidance (principles, not steps)

- Build each major feature as a service behind a stable API and a mocked contract for parallel development.
- Ship small, testable data products: embedding pipelines + offline evaluation before exposing real-time match endpoints.
- Enforce contract tests between Template Engine, LLM Orchestration, and Profile Store.
- Use deterministic model prompts and seeds for repeatability; log seeds for audits.
- Provide a sandbox issuer environment for signature testing and key rotation simulation.

---

## Onboarding and documentation

- Maintain a single source of truth docs: architecture.md, api.md, templates.md, signing.md, onboarding-playbook.md.
- Provide developer quickstart and playground for embeddings and match queries.
- Maintain a changelog for template revisions and model deployments.

---

## Change control and versioning

- All schema changes require migration plans and a deprecation window.
- Signed snapshots must remain verifiable even if templates or APIs evolve; maintain compatibility layers for verification.

---

## Appendix: Glossary (short)

- **Digital twin**: canonical semantic representation of a student.
- **Snapshot**: immutable export of a profile/ resume at a point in time.
- **Verifiable claim**: signed assertion issued by a trusted party.
- **Resume-locked**: frozen snapshot exported as a resume.
- **Dynamic profile**: live, evolving profile view accessible with consent.

---

## Next steps (for the team)

- Approve this constitution as the canonical alignment doc.
- Run a 2-week spike: embed pipeline + offline match evaluation.
- Define the first template set and the signature key provisioning flow for 2 pilot universities.

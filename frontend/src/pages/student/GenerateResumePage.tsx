import { FormEvent, useMemo, useState } from "react";
import { useGenerateResumeMutation } from "../../hooks/useResumes";
import { useTemplates } from "../../hooks/useTemplates";
import { useAuthStore } from "../../stores/authStore";

const defaultRoleDescriptor = {
  title: "Senior Software Engineer",
  description: "Lead high-impact AI resume features across the KnowTruly stack.",
  requiredSkills: "FastAPI, React, Gemini API"
};

export const GenerateResumePage = () => {
  const { data: templates } = useTemplates();
  const profileId = useAuthStore((state) => state.user?.profileId ?? "demo-profile");
  const [selectedTemplate, setSelectedTemplate] = useState<string>("tmpl-modern");
  const [roleTitle, setRoleTitle] = useState(defaultRoleDescriptor.title);
  const [roleDescription, setRoleDescription] = useState(defaultRoleDescriptor.description);
  const [requiredSkills, setRequiredSkills] = useState(defaultRoleDescriptor.requiredSkills);
  const [aiRephrase, setAiRephrase] = useState(true);
  const [maxPages, setMaxPages] = useState(2);
  const [format, setFormat] = useState<"pdf" | "docx" | "html">("pdf");
  const generateResume = useGenerateResumeMutation(profileId);
  const templateOptions = useMemo(() => templates ?? [], [templates]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await generateResume.mutateAsync({
      profile_id: profileId,
      template_id: selectedTemplate,
      role_descriptor: {
        title: roleTitle,
        description: roleDescription,
        required_skills: requiredSkills.split(",").map((skill) => skill.trim())
      },
      options: {
        ai_rephrase: aiRephrase,
        max_pages: maxPages,
        format
      }
    });
  };

  return (
    <section className="space-y-6">
      <header>
        <h1 className="text-2xl font-semibold text-slate-100">Generate Resume</h1>
        <p className="mt-2 text-sm text-slate-400">
          The backend Typst service compiles the resume and stores a snapshot. In demo mode you&apos;ll receive a mock
          response.
        </p>
      </header>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid gap-6 md:grid-cols-2">
          <label className="flex flex-col gap-2 text-sm text-slate-200">
            Template
            <select
              value={selectedTemplate}
              onChange={(event) => setSelectedTemplate(event.target.value)}
              className="rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100 focus:border-sky-500 focus:outline-none"
            >
              {templateOptions.map((template) => (
                <option key={template.templateId} value={template.templateId}>
                  {template.name}
                </option>
              ))}
            </select>
          </label>
          <label className="flex flex-col gap-2 text-sm text-slate-200">
            Output format
            <select
              value={format}
              onChange={(event) => setFormat(event.target.value as typeof format)}
              className="rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100 focus:border-sky-500 focus:outline-none"
            >
              <option value="pdf">PDF</option>
              <option value="docx">DOCX</option>
              <option value="html">HTML</option>
            </select>
          </label>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <label className="flex flex-col gap-2 text-sm text-slate-200">
            Role title
            <input
              value={roleTitle}
              onChange={(event) => setRoleTitle(event.target.value)}
              className="rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100 focus:border-sky-500 focus:outline-none"
            />
          </label>
          <label className="flex flex-col gap-2 text-sm text-slate-200">
            Max pages
            <input
              type="number"
              min={1}
              max={4}
              value={maxPages}
              onChange={(event) => setMaxPages(Number.parseInt(event.target.value, 10))}
              className="rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100 focus:border-sky-500 focus:outline-none"
            />
          </label>
        </div>

        <label className="flex flex-col gap-2 text-sm text-slate-200">
          Role description
          <textarea
            value={roleDescription}
            onChange={(event) => setRoleDescription(event.target.value)}
            rows={4}
            className="rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100 focus:border-sky-500 focus:outline-none"
          />
        </label>

        <label className="flex flex-col gap-2 text-sm text-slate-200">
          Required skills (comma separated)
          <input
            value={requiredSkills}
            onChange={(event) => setRequiredSkills(event.target.value)}
            className="rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100 focus:border-sky-500 focus:outline-none"
          />
        </label>

        <label className="flex items-center gap-3 text-sm text-slate-200">
          <input
            type="checkbox"
            checked={aiRephrase}
            onChange={(event) => setAiRephrase(event.target.checked)}
            className="h-4 w-4 rounded border border-slate-700 bg-slate-900 text-sky-500 focus:ring-sky-500"
          />
          Use Gemini AI to rephrase key sections
        </label>

        <button
          type="submit"
          disabled={generateResume.isPending}
          className="flex items-center gap-2 rounded-lg bg-sky-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-sky-500 disabled:opacity-50"
        >
          <span className="material-icons-sharp text-base">play_arrow</span>
          {generateResume.isPending ? "Generating..." : "Generate Resume"}
        </button>

        {generateResume.isSuccess && (
          <div className="rounded-2xl border border-emerald-500/40 bg-emerald-500/10 p-4 text-sm text-emerald-200">
            Resume generated with template{" "}
            <span className="font-semibold">{generateResume.data.generation_metadata.templateUsed}</span>. Download URL:{" "}
            <code className="text-emerald-100">{generateResume.data.download_url}</code>
          </div>
        )}
      </form>
    </section>
  );
};

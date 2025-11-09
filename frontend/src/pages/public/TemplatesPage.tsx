import { useTemplates } from "../../hooks/useTemplates";

export const TemplatesPage = () => {
  const { data: templates, isLoading } = useTemplates();

  return (
    <main className="mx-auto w-full max-w-6xl px-6 py-12 md:px-10">
      <header className="mb-8 space-y-2">
        <h1 className="text-3xl font-semibold text-slate-100">Typst Resume Templates</h1>
        <p className="text-sm text-slate-400">
          All templates compile through the backend Typst service. Flip demo mode on to preview sample metadata when the API
          is offline.
        </p>
      </header>
      {isLoading && <p className="text-sm text-slate-400">Loading templates...</p>}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {templates?.map((template) => (
          <article key={template.templateId} className="rounded-2xl border border-slate-800 bg-[#0f141c] p-5 shadow-md">
            {template.previewUrl && (
              <img
                src={template.previewUrl}
                alt={`${template.name} preview`}
                className="mb-4 h-40 w-full rounded-xl object-cover object-center"
              />
            )}
            <h2 className="text-lg font-semibold text-slate-100">{template.name}</h2>
            <p className="mt-1 text-xs uppercase tracking-[0.2em] text-slate-500">{template.layoutType}</p>
            {template.description && <p className="mt-3 text-sm text-slate-300">{template.description}</p>}
            {template.pageConstraints && (
              <div className="mt-4 rounded-xl border border-slate-800 bg-slate-900/40 p-3 text-xs text-slate-400">
                <p className="font-semibold uppercase tracking-[0.3em] text-slate-500">Constraints</p>
                <pre className="mt-1 whitespace-pre-wrap text-slate-300">
                  {JSON.stringify(template.pageConstraints, null, 2)}
                </pre>
              </div>
            )}
          </article>
        ))}
      </div>
    </main>
  );
};

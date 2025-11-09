import { useTemplates } from "../../hooks/useTemplates";

export const AdminTemplatesPage = () => {
  const { data: templates } = useTemplates();

  return (
    <section className="space-y-6">
      <header>
        <h1 className="text-2xl font-semibold text-slate-100">Template Management</h1>
        <p className="mt-2 text-sm text-slate-400">
          Manage Typst templates that feed resume generation. Ensure render time stays under 10 seconds.
        </p>
      </header>

      <div className="grid gap-4 md:grid-cols-2">
        {templates?.map((template) => (
          <article key={template.templateId} className="rounded-2xl border border-slate-800 bg-[#0f141c] p-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-slate-100">{template.name}</h2>
              <span className="text-xs uppercase tracking-[0.2em] text-slate-500">{template.layoutType}</span>
            </div>
            <p className="mt-3 text-sm text-slate-300">{template.description}</p>
            <p className="mt-4 text-xs text-slate-500">Typst file: {template.typstFile}</p>
          </article>
        ))}
        {!templates?.length && <p className="text-sm text-slate-500">No templates configured.</p>}
      </div>
    </section>
  );
};

import { Plus, Presentation, Trash2 } from "lucide-react";
import { layoutOptions } from "../constants";
import { Slide } from "../types";

interface EditorProps {
  slides: Slide[];
  activeSlide: Slide;
  activeSlideIndex: number;
  onAddSlide: () => void;
  onDeleteSlide: (id: string) => void;
  onSelectSlide: (id: string) => void;
  onUpdateSlide: (id: string, updates: Partial<Slide>) => void;
  onPresent: () => void;
}

const layoutPreviewClasses: Record<Slide["layout"], string> = {
  title: "items-center justify-center",
  centered: "items-center justify-center",
  "image-left": "items-center justify-start",
  "image-right": "items-center justify-end",
};

const Editor = ({
  slides,
  activeSlide,
  activeSlideIndex,
  onAddSlide,
  onDeleteSlide,
  onSelectSlide,
  onUpdateSlide,
  onPresent,
}: EditorProps) => {
  return (
    <div className="flex min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950">
      <aside className="flex w-72 flex-col border-r border-slate-800/70 bg-slate-950/80 p-6 backdrop-blur">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-indigo-200/80">Diapositivas</h2>
          <button
            onClick={onAddSlide}
            className="inline-flex items-center gap-1 rounded-full bg-indigo-500 px-3 py-1 text-xs font-semibold text-white shadow-lg shadow-indigo-500/30 transition hover:bg-indigo-400"
          >
            <Plus size={14} />
            Nueva
          </button>
        </div>
        <div className="flex flex-1 flex-col gap-3 overflow-y-auto pr-1">
          {slides.map((slide, index) => {
            const isActive = slide.id === activeSlide.id;
            return (
              <button
                key={slide.id}
                onClick={() => onSelectSlide(slide.id)}
                className={`group rounded-2xl border px-4 py-3 text-left transition ${
                  isActive
                    ? "border-indigo-400/80 bg-indigo-500/10 shadow-lg shadow-indigo-500/20"
                    : "border-slate-800/70 bg-slate-900/60 hover:border-indigo-500/40 hover:bg-slate-900"
                }`}
              >
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span>#{index + 1}</span>
                  {slides.length > 1 && (
                    <span className="opacity-0 transition group-hover:opacity-100">Seleccionar</span>
                  )}
                </div>
                <div className="mt-2 text-sm font-semibold text-slate-100">{slide.title}</div>
                <p className="mt-1 max-h-8 overflow-hidden text-xs text-slate-400">{slide.content}</p>
              </button>
            );
          })}
        </div>
        <button
          onClick={() => onDeleteSlide(activeSlide.id)}
          className="mt-6 inline-flex items-center justify-center gap-2 rounded-xl border border-rose-500/40 bg-rose-500/10 px-4 py-2 text-sm font-semibold text-rose-200 transition hover:bg-rose-500/20"
        >
          <Trash2 size={16} />
          Eliminar diapositiva
        </button>
      </aside>

      <main className="flex flex-1 flex-col">
        <header className="flex items-center justify-between border-b border-slate-800/80 px-10 py-6">
          <div>
            <h1 className="text-2xl font-semibold text-white">PresentaWeb</h1>
            <p className="text-sm text-slate-400">Editor de presentaciones con estilo profesional.</p>
          </div>
          <button
            onClick={onPresent}
            className="inline-flex items-center gap-2 rounded-full bg-indigo-500 px-6 py-3 text-sm font-semibold text-white shadow-soft transition hover:bg-indigo-400"
          >
            <Presentation size={18} />
            Presentar
          </button>
        </header>

        <div className="grid flex-1 gap-8 px-10 py-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)]">
          <section className="flex flex-col gap-6">
            <div className="rounded-3xl border border-slate-800/70 bg-slate-950/60 p-6 shadow-soft">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Vista previa</p>
                  <h2 className="text-lg font-semibold text-slate-100">Diapositiva {activeSlideIndex + 1}</h2>
                </div>
                <span className="rounded-full bg-slate-800/80 px-3 py-1 text-xs text-slate-300">
                  {layoutOptions.find((option) => option.value === activeSlide.layout)?.label}
                </span>
              </div>
              <div className="mt-6 overflow-hidden rounded-2xl border border-slate-800 bg-slate-950">
                <div
                  className={`flex h-64 flex-col gap-4 bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 p-6 text-center ${
                    layoutPreviewClasses[activeSlide.layout]
                  }`}
                >
                  {activeSlide.imageUrl && activeSlide.layout !== "title" && (
                    <div className="h-24 w-32 rounded-xl border border-slate-800 bg-slate-800/40">
                      <img
                        src={activeSlide.imageUrl}
                        alt="Vista previa"
                        className="h-full w-full rounded-xl object-cover"
                      />
                    </div>
                  )}
                  <div className="max-w-md">
                    <h3 className="text-2xl font-semibold text-white">{activeSlide.title}</h3>
                    <p className="mt-2 text-sm text-slate-300">{activeSlide.content}</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="flex flex-col gap-6">
            <div className="rounded-3xl border border-slate-800/70 bg-slate-950/70 p-6 shadow-soft">
              <h3 className="text-lg font-semibold text-slate-100">Contenido</h3>
              <div className="mt-4 flex flex-col gap-4">
                <label className="text-sm font-medium text-slate-300">
                  Título
                  <input
                    value={activeSlide.title}
                    onChange={(event) => onUpdateSlide(activeSlide.id, { title: event.target.value })}
                    className="mt-2 w-full rounded-xl border border-slate-800 bg-slate-900/70 px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:border-indigo-400 focus:outline-none"
                    placeholder="Título de la diapositiva"
                  />
                </label>
                <label className="text-sm font-medium text-slate-300">
                  Contenido
                  <textarea
                    value={activeSlide.content}
                    onChange={(event) => onUpdateSlide(activeSlide.id, { content: event.target.value })}
                    className="mt-2 min-h-[140px] w-full rounded-xl border border-slate-800 bg-slate-900/70 px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:border-indigo-400 focus:outline-none"
                    placeholder="Describe tu mensaje principal"
                  />
                </label>
              </div>
            </div>

            <div className="rounded-3xl border border-slate-800/70 bg-slate-950/70 p-6 shadow-soft">
              <h3 className="text-lg font-semibold text-slate-100">Diseño</h3>
              <div className="mt-4 grid gap-3">
                {layoutOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => onUpdateSlide(activeSlide.id, { layout: option.value })}
                    className={`rounded-2xl border px-4 py-3 text-left transition ${
                      activeSlide.layout === option.value
                        ? "border-indigo-400/80 bg-indigo-500/10"
                        : "border-slate-800/70 bg-slate-900/50 hover:border-indigo-500/40"
                    }`}
                  >
                    <div className="text-sm font-semibold text-slate-100">{option.label}</div>
                    <div className="text-xs text-slate-400">{option.description}</div>
                  </button>
                ))}
              </div>
              <label className="mt-4 block text-sm font-medium text-slate-300">
                URL de imagen
                <input
                  value={activeSlide.imageUrl ?? ""}
                  onChange={(event) => onUpdateSlide(activeSlide.id, { imageUrl: event.target.value })}
                  className="mt-2 w-full rounded-xl border border-slate-800 bg-slate-900/70 px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:border-indigo-400 focus:outline-none"
                  placeholder="https://..."
                />
              </label>
            </div>

            <div className="rounded-3xl border border-slate-800/70 bg-slate-950/70 p-6 shadow-soft">
              <h3 className="text-lg font-semibold text-slate-100">Notas del orador</h3>
              <textarea
                value={activeSlide.speakerNotes}
                onChange={(event) => onUpdateSlide(activeSlide.id, { speakerNotes: event.target.value })}
                className="mt-3 min-h-[120px] w-full rounded-xl border border-slate-800 bg-slate-900/70 px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:border-indigo-400 focus:outline-none"
                placeholder="Ideas clave, tiempos y recordatorios."
              />
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default Editor;

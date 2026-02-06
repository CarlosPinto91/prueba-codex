import { ChevronLeft, ChevronRight, Globe, LogOut } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import WebBrowser from "./WebBrowser";
import { Slide } from "../types";

interface PresenterProps {
  slides: Slide[];
  activeSlide: Slide;
  activeSlideIndex: number;
  onNavigate: (direction: "prev" | "next") => void;
  onExit: () => void;
  onSelectSlide: (id: string) => void;
}

const Presenter = ({ slides, activeSlide, activeSlideIndex, onNavigate, onExit, onSelectSlide }: PresenterProps) => {
  const [controlsVisible, setControlsVisible] = useState(true);
  const [showBrowser, setShowBrowser] = useState(false);

  useEffect(() => {
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") {
        onNavigate("next");
      }
      if (event.key === "ArrowLeft") {
        onNavigate("prev");
      }
      if (event.key === "Escape") {
        onExit();
      }
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onNavigate, onExit]);

  useEffect(() => {
    let timeout: number | undefined;
    const handleMove = () => {
      setControlsVisible(true);
      if (timeout) {
        window.clearTimeout(timeout);
      }
      timeout = window.setTimeout(() => setControlsVisible(false), 2500);
    };
    window.addEventListener("mousemove", handleMove);
    handleMove();

    return () => {
      window.removeEventListener("mousemove", handleMove);
      if (timeout) {
        window.clearTimeout(timeout);
      }
    };
  }, []);

  const slideNumber = useMemo(() => activeSlideIndex + 1, [activeSlideIndex]);

  const renderSlideContent = () => {
    const hasImage = Boolean(activeSlide.imageUrl);

    switch (activeSlide.layout) {
      case "title":
        return (
          <div className="flex h-full flex-col items-center justify-center text-center">
            <h1 className="text-5xl font-semibold text-white md:text-6xl">{activeSlide.title}</h1>
            <p className="mt-6 max-w-2xl text-lg text-slate-300 md:text-xl">{activeSlide.content}</p>
          </div>
        );
      case "centered":
        return (
          <div className="flex h-full flex-col items-center justify-center text-center">
            <h2 className="text-4xl font-semibold text-white md:text-5xl">{activeSlide.title}</h2>
            <p className="mt-6 max-w-3xl text-lg text-slate-300 md:text-xl">{activeSlide.content}</p>
          </div>
        );
      case "image-left":
      case "image-right":
        return (
          <div className={`flex h-full flex-col gap-10 md:flex-row ${
            activeSlide.layout === "image-right" ? "md:flex-row-reverse" : ""
          }`}>
            <div className="flex flex-1 items-center justify-center">
              {hasImage ? (
                <img
                  src={activeSlide.imageUrl}
                  alt="Imagen de la diapositiva"
                  className="h-80 w-full rounded-3xl object-cover shadow-soft"
                />
              ) : (
                <div className="flex h-80 w-full items-center justify-center rounded-3xl border border-dashed border-slate-700 bg-slate-900/40 text-slate-500">
                  Imagen opcional
                </div>
              )}
            </div>
            <div className="flex flex-1 flex-col justify-center">
              <h2 className="text-4xl font-semibold text-white md:text-5xl">{activeSlide.title}</h2>
              <p className="mt-6 text-lg text-slate-300 md:text-xl">{activeSlide.content}</p>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-black">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(99,102,241,0.18),transparent_55%)]" />

      <div className="relative z-10 w-full max-w-6xl px-6 py-16">
        <div className="min-h-[70vh] rounded-[2.5rem] border border-slate-800/70 bg-slate-950/90 p-12 shadow-soft">
          {renderSlideContent()}
        </div>
      </div>

      {showBrowser && (
        <div className="absolute inset-0 z-40 flex items-center justify-center bg-black/40 p-6">
          <WebBrowser onClose={() => setShowBrowser(false)} />
        </div>
      )}

      <div
        className={`fixed bottom-8 left-1/2 z-[100] flex -translate-x-1/2 items-center gap-4 rounded-full border border-slate-800/80 bg-slate-950/80 px-6 py-3 shadow-soft backdrop-blur transition-opacity ${
          controlsVisible ? "opacity-100" : "opacity-0"
        }`}
      >
        <button
          onClick={() => onNavigate("prev")}
          className="rounded-full border border-slate-700/70 bg-slate-900/80 p-2 text-slate-200 transition hover:border-indigo-400 hover:text-white"
        >
          <ChevronLeft />
        </button>
        <span className="text-sm text-slate-300">
          {slideNumber} / {slides.length}
        </span>
        <button
          onClick={() => onNavigate("next")}
          className="rounded-full border border-slate-700/70 bg-slate-900/80 p-2 text-slate-200 transition hover:border-indigo-400 hover:text-white"
        >
          <ChevronRight />
        </button>
        <div className="h-8 w-px bg-slate-800" />
        <button
          onClick={() => setShowBrowser((prev) => !prev)}
          className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition ${
            showBrowser
              ? "border-indigo-400/80 bg-indigo-500/20 text-indigo-100"
              : "border-slate-700/70 bg-slate-900/80 text-slate-200 hover:border-indigo-400"
          }`}
        >
          <Globe size={16} />
          Navegador
        </button>
        <button
          onClick={onExit}
          className="inline-flex items-center gap-2 rounded-full border border-rose-400/50 bg-rose-500/10 px-4 py-2 text-sm font-semibold text-rose-100 transition hover:bg-rose-500/20"
        >
          <LogOut size={16} />
          Salir
        </button>
      </div>

      <div className="absolute right-6 top-6 z-10 rounded-full bg-slate-900/80 px-4 py-2 text-xs text-slate-300">
        {activeSlide.title}
      </div>

      <div className="absolute left-6 top-6 z-10 flex gap-2">
        {slides.map((slide) => (
          <button
            key={slide.id}
            onClick={() => onSelectSlide(slide.id)}
            className={`h-2 w-6 rounded-full transition ${
              slide.id === activeSlide.id ? "bg-indigo-400" : "bg-slate-700 hover:bg-slate-500"
            }`}
            aria-label={`Ir a ${slide.title}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Presenter;

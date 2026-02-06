import { useMemo, useState } from "react";
import Editor from "./Editor";
import Presenter from "./Presenter";
import { starterSlides } from "../constants";
import { AppMode, Slide } from "../types";

const createEmptySlide = (index: number): Slide => ({
  id: `slide-${Date.now()}-${index}`,
  title: "Nueva diapositiva",
  content: "Escribe aquí el contenido principal.",
  imageUrl: "",
  layout: "title",
  speakerNotes: "",
});

const App = () => {
  const [mode, setMode] = useState<AppMode>("editor");
  const [slides, setSlides] = useState<Slide[]>(starterSlides);
  const [activeSlideId, setActiveSlideId] = useState<string>(starterSlides[0]?.id ?? "");

  const activeSlideIndex = useMemo(
    () => slides.findIndex((slide) => slide.id === activeSlideId),
    [slides, activeSlideId]
  );

  const activeSlide = slides[activeSlideIndex] ?? slides[0];

  const addSlide = () => {
    setSlides((prev) => {
      const next = [...prev, createEmptySlide(prev.length + 1)];
      setActiveSlideId(next[next.length - 1].id);
      return next;
    });
  };

  const deleteSlide = (id: string) => {
    setSlides((prev) => {
      if (prev.length === 1) {
        return prev;
      }
      const next = prev.filter((slide) => slide.id !== id);
      if (id === activeSlideId) {
        const currentIndex = prev.findIndex((slide) => slide.id === id);
        const nextIndex = Math.max(0, currentIndex - 1);
        setActiveSlideId(next[nextIndex].id);
      }
      return next;
    });
  };

  const updateSlide = (id: string, updates: Partial<Slide>) => {
    setSlides((prev) => prev.map((slide) => (slide.id === id ? { ...slide, ...updates } : slide)));
  };

  const goToSlide = (direction: "prev" | "next") => {
    setActiveSlideId((prevId) => {
      const index = slides.findIndex((slide) => slide.id === prevId);
      if (index === -1) {
        return slides[0]?.id ?? prevId;
      }
      const nextIndex = direction === "next" ? Math.min(slides.length - 1, index + 1) : Math.max(0, index - 1);
      return slides[nextIndex].id;
    });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      {mode === "editor" ? (
        <Editor
          slides={slides}
          activeSlide={activeSlide}
          activeSlideIndex={activeSlideIndex}
          onAddSlide={addSlide}
          onDeleteSlide={deleteSlide}
          onSelectSlide={setActiveSlideId}
          onUpdateSlide={updateSlide}
          onPresent={() => setMode("presenter")}
        />
      ) : (
        <Presenter
          slides={slides}
          activeSlide={activeSlide}
          activeSlideIndex={activeSlideIndex}
          onNavigate={goToSlide}
          onExit={() => setMode("editor")}
          onSelectSlide={setActiveSlideId}
        />
      )}
    </div>
  );
};

export default App;

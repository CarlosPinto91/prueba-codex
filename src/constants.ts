import { Slide, SlideLayout } from "./types";

export const layoutOptions: { value: SlideLayout; label: string; description: string }[] = [
  { value: "title", label: "Solo Título", description: "Gran titular con subtítulo" },
  { value: "centered", label: "Texto Centrado", description: "Título + cuerpo centrado" },
  { value: "image-left", label: "Imagen Izquierda + Texto", description: "Imagen lateral izquierda" },
  { value: "image-right", label: "Imagen Derecha + Texto", description: "Imagen lateral derecha" },
];

export const starterSlides: Slide[] = [
  {
    id: "slide-1",
    title: "Curso Codex en Salud Pública (4h)",
    content: "Aprende Codex creando un proyecto real de predicción de brotes con datos simulados.",
    imageUrl: "https://images.unsplash.com/photo-1579165466741-7f35e4755660?auto=format&fit=crop&w=1000&q=80",
    layout: "image-right",
    speakerNotes: "Presentar objetivo, formato hands-on y entregables.",
  },
  {
    id: "slide-2",
    title: "Módulos prácticos",
    content:
      "Setup, simulación de datos, features, modelo baseline, dashboard, skill propia, automatizaciones y GitHub Actions.",
    imageUrl: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1000&q=80",
    layout: "image-left",
    speakerNotes: "Explicar que cada módulo tiene ejercicio guiado y reto.",
  },
  {
    id: "slide-3",
    title: "Proyecto guía",
    content:
      "Sistema de alerta temprana por región: predice casos, muestra semáforo epidemiológico y automatiza validaciones en CI.",
    imageUrl: "https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&w=1000&q=80",
    layout: "image-right",
    speakerNotes: "Resaltar enfoque de punta a punta y trabajo multiagente.",
  },
  {
    id: "slide-4",
    title: "Atajos y flujo de trabajo",
    content: "Usa /plan, /edit, /run, /review, /commit y /pr para acelerar ciclos de desarrollo con calidad.",
    layout: "centered",
    speakerNotes: "Demostrar secuencia recomendada al iniciar y cerrar cada módulo.",
  },
];

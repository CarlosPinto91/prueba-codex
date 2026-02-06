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
    title: "Bienvenidos a PresentaWeb",
    content: "Crea presentaciones claras, modernas y listas para compartir.",
    imageUrl: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80",
    layout: "image-right",
    speakerNotes: "Abrir con energía y explicar el objetivo de la herramienta.",
  },
  {
    id: "slide-2",
    title: "Mensaje central",
    content: "Diseña tu narrativa con un enfoque visual y tipografía elegante.",
    imageUrl: "https://images.unsplash.com/photo-1487611459768-bd414656ea10?auto=format&fit=crop&w=800&q=80",
    layout: "image-left",
    speakerNotes: "Destacar que se puede editar todo en tiempo real.",
  },
  {
    id: "slide-3",
    title: "Siguiente paso",
    content: "Activa el modo presentador y comparte tu historia.",
    layout: "centered",
    speakerNotes: "Invitar a usar el botón Presentar.",
  },
];

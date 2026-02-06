export type SlideLayout = "title" | "centered" | "image-left" | "image-right";

export interface Slide {
  id: string;
  title: string;
  content: string;
  imageUrl?: string;
  layout: SlideLayout;
  speakerNotes: string;
}

export type AppMode = "editor" | "presenter";

export type FloatingNavigationView = "about" | "closed" | "menu" | "theme";

export function isOpen(view: FloatingNavigationView) {
  return view !== "closed";
}

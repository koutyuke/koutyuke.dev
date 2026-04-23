export type FloatingNavigationPanel = "about" | "closed" | "menu" | "theme";

export type FloatingNavigationAction = "about" | "close" | "theme" | "toggle";

export function getBackPanel(panel: FloatingNavigationPanel): FloatingNavigationPanel {
  if (panel === "about" || panel === "theme") {
    return "menu";
  }

  if (panel === "menu") {
    return "closed";
  }

  return "menu";
}

export function getNextPanel(
  panel: FloatingNavigationPanel,
  action: FloatingNavigationAction,
): FloatingNavigationPanel {
  switch (action) {
    case "about":
      return "about";
    case "close":
      return "closed";
    case "theme":
      return "theme";
    case "toggle":
      return panel === "closed" ? "menu" : "closed";
  }
}

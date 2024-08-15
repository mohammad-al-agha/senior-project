import { ThemeType } from "../core/types/themeTypes";

export const useBackgroundIcon = (type: string, theme: ThemeType) => {
  if (type === "Net") {
    return theme === ThemeType.dark
      ? "course-net-background--dark"
      : "course-net-background";
  }
  if (type === "Code") {
    return theme === ThemeType.dark
      ? "course-code-background--dark"
      : "course-code-background";
  }
  if (type === "Design") {
    return theme === ThemeType.dark
      ? "course-design-background--dark"
      : "course-design-background";
  }
  if (type === "Security") {
    return theme === ThemeType.dark
      ? "course-security-background--dark"
      : "course-security-background";
  }
  if (type === "Data") {
    return theme === ThemeType.dark
      ? "course-data-background--dark"
      : "course-data-background";
  }
  if (type === "Stats") {
    return theme === ThemeType.dark
      ? "course-stats-background--dark"
      : "course-stats-background";
  }
  if (type === "Math") {
    return theme === ThemeType.dark
      ? "course-math-background--dark"
      : "course-math-background";
  }
};

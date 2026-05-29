// Toggle theme

const getTheme = window.localStorage && window.localStorage.getItem("theme");
const themeToggle = document.querySelector(".theme-toggle");
const isDark = getTheme === "dark";
const metaThemeColor = document.querySelector("meta[name=theme-color]");
const DARK_THEME_COLOR = "#000000";
const LIGHT_THEME_COLOR = "#F5F5F5";

if (getTheme !== null) {
  document.body.classList.toggle("dark-theme", isDark);
  metaThemeColor && metaThemeColor.setAttribute("content", isDark ? DARK_THEME_COLOR : LIGHT_THEME_COLOR);
}

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-theme");
    window.localStorage &&
      window.localStorage.setItem(
        "theme",
        document.body.classList.contains("dark-theme") ? "dark" : "light",
      );
    metaThemeColor && metaThemeColor.setAttribute(
      "content",
      document.body.classList.contains("dark-theme") ? DARK_THEME_COLOR : LIGHT_THEME_COLOR,
    );
  });
}

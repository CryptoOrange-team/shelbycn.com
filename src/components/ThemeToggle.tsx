"use client";

export function ThemeToggle() {
  function toggle() {
    const h = document.documentElement;
    const isDark = h.classList.contains("dark");
    h.classList.toggle("dark", !isDark);
    h.classList.toggle("light", isDark);
    try { localStorage.setItem("theme", isDark ? "light" : "dark"); } catch (_) { /* noop */ }
  }

  return (
    <button
      aria-label="切换主题"
      onClick={toggle}
      className="p-2 text-[var(--c-text3)] hover:text-[var(--c-text)] rounded transition-colors text-sm"
    >
      <span className="hidden dark:inline">☀</span>
      <span className="hidden light:inline">☾</span>
    </button>
  );
}

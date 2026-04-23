import { useTheme } from "../features/theme/use-theme";
import { cn } from "../lib/cn";

export function App() {
  const { resolvedTheme, setTheme, theme } = useTheme();

  return (
    <main className="min-h-svh bg-slate-1 px-6 py-10 text-slate-12 transition-colors duration-300">
      <section className="mx-auto flex min-h-[calc(100svh-5rem)] max-w-4xl flex-col items-start justify-center gap-8">
        <p className="rounded-full border border-slate-6 bg-slate-2 px-4 py-2 text-sm text-slate-11">
          koutyuke.dev / Vite+ / React
        </p>
        <div className="space-y-5">
          <h1 className="text-balance text-5xl font-semibold tracking-[-0.06em] text-slate-12 sm:text-7xl">
            Hello world.
          </h1>
          <p className="max-w-2xl text-pretty text-lg leading-8 text-slate-11">
            Vite+ を中心に、React、Tailwind CSS、Radix Colors、reset CSS、Oxfmt / Oxlint / Stylelint
            の初期環境を接続した baseline page です。
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <button
            className={cn(
              "rounded-full bg-iris-9 px-5 py-3 text-sm font-medium text-slate-1 transition",
              "hover:bg-iris-10 focus-visible:outline-iris-8",
            )}
            type="button"
            onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
          >
            Toggle theme
          </button>
          <span className="rounded-full border border-slate-6 px-4 py-3 text-sm text-slate-11">
            mode: {theme} / resolved: {resolvedTheme}
          </span>
        </div>
      </section>
    </main>
  );
}

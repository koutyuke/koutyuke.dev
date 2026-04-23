export function FooterSection() {
  return (
    <footer className="border-t border-dashed border-slate-7 bg-slate-1 px-6 py-8">
      <div className="mx-auto flex w-full max-w-160 items-center justify-between gap-4 text-center text-xs text-slate-11 max-[520px]:flex-col">
        <p className="m-0 font-medium">&copy; 2004 koutyuke</p>
        <p className="m-0 font-handwritten">Thanks for visiting!</p>
      </div>
    </footer>
  );
}

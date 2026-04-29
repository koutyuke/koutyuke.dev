import { ChevronDown } from "lucide-react";

import { AsteriskIcon, KoutyukeIcon } from "../../components/icons";
import { SocialLinks } from "../../components/social-links/social-links";

export function HeroSection() {
  return (
    <section
      aria-labelledby="hero-title"
      className="section-grid relative flex min-h-screen items-center justify-center bg-slate-1 px-6 py-32"
      id="top"
    >
      <div className="mx-auto flex w-full max-w-160 flex-col items-start justify-center">
        <p className="mb-3 inline-flex items-center gap-1 font-handwritten text-base text-slate-11">
          <AsteriskIcon className="size-3" />
          Hello, Nice to meet you!
        </p>

        <div className="mb-2 size-18 text-slate-12">
          <KoutyukeIcon className="size-full" />
        </div>

        <h1 className="mb-4 font-handwritten text-5xl leading-none text-slate-12" id="hero-title">
          koutyuke
        </h1>
        <p className="mb-6 font-handwritten text-xl leading-tight text-slate-11">
          Software Engineer
        </p>

        <div className="relative mb-6 max-w-160 text-xl leading-[1.65] font-medium text-slate-11 max-[720px]:text-base max-[720px]:leading-[1.8]">
          <p>
            <span className="marker-underline text-slate-12">日々の記録</span>と、
            <span className="marker-underline marker-underline-yellow text-slate-12">
              作ったもの
            </span>
            と、
            <span className="marker-underline marker-underline-red text-slate-12">考えたこと</span>
            を静かにつづる場所。
          </p>
          <p>
            I build thoughtful web interfaces with clean code and careful attention to detail.
            Currently exploring frontend development with{" "}
            <span className="marker-underline text-slate-12">TypeScript</span>.
          </p>
        </div>

        <SocialLinks className="justify-start" showLabel={false} />
      </div>

      <a
        aria-label="Scroll to about section"
        className="absolute bottom-20 left-1/2 inline-flex -translate-x-1/2 flex-col items-center gap-0.5 font-handwritten text-base leading-none text-slate-11 no-underline"
        href="#about"
      >
        <span>scroll down</span>
        <ChevronDown aria-hidden="true" className="size-4" />
      </a>
    </section>
  );
}

import { ChevronDown } from "lucide-react";

import { BrandIcon } from "../../components/brand-icon/brand-icon";
import { Mark } from "../../components/mark/mark";
import { SocialLinks } from "../../components/social-links/social-links";
import { profile, socialLinks } from "../../content/profile";

export function HeroSection() {
  return (
    <section
      aria-labelledby="hero-title"
      className="section-grid relative flex min-h-[min(832px,100svh)] items-center justify-center bg-slate-1 px-6 pb-28 pt-24"
      id="top"
    >
      <div className="mx-auto flex w-full max-w-160 flex-col items-start justify-center gap-2">
        <p className="m-0 mb-1 inline-flex items-center gap-1 font-handwritten text-base text-slate-11">
          <BrandIcon className="size-3" name="asterisk" />
          {profile.greeting}
        </p>

        <div className="grid size-18 place-items-center overflow-hidden rounded-full text-slate-12">
          <BrandIcon className="size-full" name="koutyuke" />
        </div>

        <h1 className="m-0 font-handwritten text-5xl leading-none text-slate-12" id="hero-title">
          {profile.name}
        </h1>
        <p className="m-0 font-handwritten text-xl leading-tight text-slate-11">{profile.role}</p>

        <div className="relative max-w-160 pb-5 pt-4 text-xl font-medium leading-[1.65] text-slate-11 max-[720px]:text-base max-[720px]:leading-[1.8]">
          <p className="m-0">
            <Mark tone="teal">{profile.heroDescription.japanese[0]}</Mark>と、
            <Mark tone="yellow">{profile.heroDescription.japanese[1]}</Mark>と、
            <Mark tone="red">{profile.heroDescription.japanese[2]}</Mark>を静かにつづる場所。
          </p>
          <p className="m-0 mt-1">
            I build thoughtful web interfaces with clean code and careful attention to detail.
            Currently exploring frontend development with <Mark strong>TypeScript</Mark>.
          </p>
        </div>

        <SocialLinks className="justify-start" links={socialLinks} showLabel={false} />
      </div>

      <a
        aria-label="Scroll to about section"
        className="absolute bottom-23 left-1/2 inline-flex -translate-x-1/2 flex-col items-center font-handwritten text-base leading-none text-slate-11 no-underline"
        href="#about"
      >
        <span>scroll down</span>
        <ChevronDown aria-hidden="true" className="size-4" />
      </a>
    </section>
  );
}

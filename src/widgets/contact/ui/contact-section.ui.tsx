import type { ReactNode } from "react";

import { SectionDivider } from "../../../shared/ui/section-divider";

type ContactSectionUIProps = {
  slots: {
    SocialLinks: ReactNode;
  };
};

export function ContactSectionUI({ slots: { SocialLinks } }: ContactSectionUIProps) {
  return (
    <section
      aria-labelledby="contact-title"
      className="overflow-hidden border-0 border-y border-slate-5/33 bg-slate-2 px-6 py-16 max-[720px]:px-5"
      id="contact"
    >
      <div className="mx-auto flex w-full max-w-160 flex-col items-center gap-18 max-[720px]:gap-12">
        <SectionDivider />

        <div className="flex flex-col items-center gap-6">
          <header className="relative grid gap-1 text-center">
            <p className="m-0 font-handwritten text-xs text-slate-10">Let&apos;s Contact!</p>
            <h2
              className="m-0 font-handwritten text-4xl leading-[1.05] text-slate-12"
              id="contact-title"
            >
              <span className="marker-underline text-slate-12">Say Hello!</span>
            </h2>
          </header>

          <p className="text-center text-xs font-medium text-slate-10">
            気軽にのぞいたり、声をかけたり
          </p>
          {SocialLinks}
        </div>

        <SectionDivider />
      </div>
    </section>
  );
}

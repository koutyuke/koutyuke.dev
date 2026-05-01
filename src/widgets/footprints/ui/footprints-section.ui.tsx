import { SectionDivider } from "../../../shared/ui/section-divider";
import { SectionHeading } from "../../../shared/ui/section-heading";
import type { Footprint } from "../../../entities/footprint";

type FootprintsSectionUIProps = {
  footprints: readonly Footprint[];
};

export function FootprintsSectionUI({ footprints }: FootprintsSectionUIProps) {
  return (
    <section
      aria-labelledby="footprints-title"
      className="section-grid-small bg-slate-1 px-6 py-16 max-[720px]:px-5"
      id="footprints"
    >
      <div className="mx-auto w-full max-w-160">
        <SectionDivider className="mb-18 max-[720px]:mb-12" />
        <SectionHeading eyebrow="わたしの人生の足あと" id="footprints-title" title="Footprints" />

        <ol className="grid list-none p-0">
          {footprints.map((item, index) => (
            <li className="relative min-h-22 pb-6 pl-8" key={`${item.date}-${item.title}-${index}`}>
              <div
                aria-hidden="true"
                className="absolute top-1 left-0 grid size-4 place-items-center rounded-full border-2 border-slate-9"
              >
                <span className="size-1 rounded-full bg-slate-8" />
              </div>
              {index < footprints.length - 1 ? (
                <div
                  aria-hidden="true"
                  className="timeline-line absolute top-6 bottom-0 left-2 w-px -translate-x-1/2"
                />
              ) : null}
              <time className="block font-handwritten text-xl leading-[1.15] text-slate-10">
                {item.date}
              </time>
              <h3 className="mt-1 text-xl leading-[1.35] font-medium text-slate-12">
                {item.title}
              </h3>
              <p className="mt-2 text-base leading-normal font-medium text-slate-11">
                {item.description}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

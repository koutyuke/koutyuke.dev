import { SectionDivider } from "../../components/section-divider/section-divider";
import { SectionHeading } from "../../components/section-heading/section-heading";
import { footprints } from "../../content/footprints";

export function FootprintsSection() {
  return (
    <section
      aria-labelledby="footprints-title"
      className="section-grid bg-slate-1 px-6 py-16 max-[720px]:px-5"
      id="footprints"
    >
      <div className="mx-auto w-full max-w-160">
        <SectionDivider className="mb-18 max-[720px]:mb-12" />
        <SectionHeading eyebrow="わたしの人生の足あと" id="footprints-title" title="Footprints" />

        <ol className="m-0 grid list-none p-0">
          {footprints.map((item, index) => (
            <li className="relative min-h-22 pb-6 pl-8" key={`${item.date}-${item.title}-${index}`}>
              <div
                aria-hidden="true"
                className="absolute left-0 top-[0.38rem] grid size-4 place-items-center rounded-full border-2 border-slate-9"
              >
                <span className="size-1 rounded-full bg-slate-8" />
              </div>
              {index < footprints.length - 1 ? (
                <div
                  aria-hidden="true"
                  className="absolute bottom-0 left-2 top-6 border-l border-dashed border-slate-9"
                />
              ) : null}
              <time className="block font-handwritten text-xl leading-[1.15] text-slate-10">
                {item.date}
              </time>
              <h3 className="m-0 mt-1 text-xl font-medium leading-[1.35] text-slate-12">
                {item.title}
              </h3>
              <p className="m-0 mt-2 text-base font-medium leading-normal text-slate-11">
                {item.description}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

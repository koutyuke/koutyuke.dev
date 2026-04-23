import { Mark } from "../../components/mark/mark";
import { SectionDivider } from "../../components/section-divider/section-divider";
import { SectionHeading } from "../../components/section-heading/section-heading";
import { TagList } from "../../components/tag-list/tag-list";
import { profile, techStacks } from "../../content/profile";

export function AboutSection() {
  return (
    <section
      aria-labelledby="about-title"
      className="section-grid bg-slate-2 px-6 py-16 max-[720px]:px-5"
      id="about"
    >
      <div className="mx-auto w-full max-w-160">
        <SectionDivider className="mb-18 max-[720px]:mb-12" />
        <SectionHeading
          eyebrow="わたしのことを、簡単に"
          id="about-title"
          title="A little about me"
        />

        <div className="grid gap-6 pb-6 text-base font-medium leading-[1.8] text-slate-11">
          {profile.aboutParagraphs.map((paragraph, index) => (
            <p className="m-0" key={paragraph}>
              {index === profile.aboutParagraphs.length - 1 ? (
                <>
                  このサイトでは、個人的な制作物や日々の学び、ちょっとした記録を{" "}
                  <Mark tone="teal" wide>
                    静かに残していく
                  </Mark>
                  つもりです。
                </>
              ) : (
                paragraph
              )}
            </p>
          ))}
        </div>

        <p className="quote-mark relative m-0 mb-6 inline-block font-handwritten text-xl leading-[1.3] text-slate-11">
          {profile.quote}
        </p>

        <div className="grid gap-4">
          <section aria-labelledby="work-with-title">
            <h3
              className="m-0 mb-3 font-handwritten text-2xl leading-[1.1] text-slate-12"
              id="work-with-title"
            >
              Things I work with:
            </h3>
            <TagList className="pb-2" tags={techStacks.primary} />
            <TagList className="pb-2" tags={techStacks.framework} />
          </section>

          <section aria-labelledby="exploring-title">
            <h3
              className="m-0 mb-3 font-handwritten text-2xl leading-[1.1] text-slate-12"
              id="exploring-title"
            >
              Currently exploring:
            </h3>
            <TagList className="pb-2" tags={techStacks.exploring} />
          </section>
        </div>
      </div>
    </section>
  );
}

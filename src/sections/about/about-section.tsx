import { SectionDivider } from "../../components/section-divider/section-divider";
import { SectionHeading } from "../../components/section-heading/section-heading";
import { TagList } from "../../components/tag-list/tag-list";
import { techStacks } from "../../content/profile";

export function AboutSection() {
  return (
    <section
      aria-labelledby="about-title"
      className="border-0 border-y border-slate-5/33 bg-slate-2 px-6 py-16 max-[720px]:px-5"
      id="about"
    >
      <div className="mx-auto w-full max-w-160">
        <SectionDivider className="mb-18 max-[720px]:mb-12" />
        <SectionHeading
          eyebrow="わたしのことを、簡単に"
          id="about-title"
          title="A little about me"
        />

        <div className="grid gap-6 pb-6 text-base leading-[1.8] font-medium text-slate-11">
          <p>何かを作ることが好きな学生です。</p>
          <p>
            Webアプリケーションを中心に趣味や業務で開発を行っています。静かに考え、丁寧に作ることを大切にしています。
          </p>
          <p>
            やわらかく、あたたかみのあるデザインがとても好きです。特に心地よいアニメーションがあるWebサイトは大好きです。
          </p>
          <p>
            コードを書くことと同じくらい、設計について考えることも好きです。シンプルで読みやすく、長く使い続けられるソフトウェアを目指しています。
          </p>
          <p>
            このサイトでは、個人的な制作物や日々の学び、ちょっとした記録を静かに残していくつもりです。
          </p>
        </div>

        <p className="quote-mark relative mb-6 inline-block font-handwritten text-xl leading-[1.3] text-slate-11">
          “Code is poetry, but it should also just work.”
        </p>

        <div className="grid gap-4">
          <section aria-labelledby="work-with-title">
            <h3
              className="mb-3 font-handwritten text-2xl leading-[1.1] text-slate-12"
              id="work-with-title"
            >
              Things I work with:
            </h3>
            <TagList className="pb-2" tags={techStacks.primary} />
          </section>

          <section aria-labelledby="exploring-title">
            <h3
              className="mb-3 font-handwritten text-2xl leading-[1.1] text-slate-12"
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

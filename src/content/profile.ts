export type SocialIcon = "github" | "twitter" | "zenn";

export type SocialLink = {
  href: string;
  icon: SocialIcon;
  label: string;
};

export const profile = {
  greeting: "Hello, Nice to meet you!",
  name: "koutyuke",
  role: "Software Engineer",
  heroDescription: {
    japanese: ["日々の記録", "作ったもの", "考えたこと"],
    english:
      "I build thoughtful web interfaces with clean code and careful attention to detail. Currently exploring frontend development with TypeScript.",
  },
  aboutParagraphs: [
    "何かを作ることが好きな学生です。",
    "Webアプリケーションを中心に趣味や業務で開発を行っています。静かに考え、丁寧に作ることを大切にしています。",
    "やわらかく、あたたかみのあるデザインがとても好きです。特に心地よいアニメーションがあるWebサイトは大好きです。",
    "コードを書くことと同じくらい、設計について考えることも好きです。シンプルで読みやすく、長く使い続けられるソフトウェアを目指しています。",
    "このサイトでは、個人的な制作物や日々の学び、ちょっとした記録を静かに残していくつもりです。",
  ],
  quote: "“Code is poetry, but it should also just work.”",
} as const;

export const socialLinks = [
  { href: "https://github.com/koutyuke", icon: "github", label: "GitHub" },
  { href: "https://x.com/koutyuke0808", icon: "twitter", label: "Twitter" },
  { href: "https://zenn.dev/koutyuke", icon: "zenn", label: "Zenn" },
] as const satisfies readonly SocialLink[];

export const techStacks = {
  primary: ["TypeScript", "JavaScript", "HTML", "CSS", "Python", "SQL"],
  framework: [
    "React",
    "Next.js",
    "React Native",
    "Expo",
    "NestJS",
    "ElysiaJS",
    "Hono",
    "dbt",
    "PyTorch",
  ],
  exploring: ["Rust", "Nix", "AI", "AWS"],
} as const;

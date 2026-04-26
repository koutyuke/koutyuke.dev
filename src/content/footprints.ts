type Month =
  | "Jan"
  | "Feb"
  | "Mar"
  | "Apr"
  | "May"
  | "Jun"
  | "Jul"
  | "Aug"
  | "Sep"
  | "Oct"
  | "Nov"
  | "Dec";

type zero2nine = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

type Year = `20${zero2nine}${zero2nine}`;

export type Footprint = {
  date: `${Month} ${Year}`;
  title: string;
  description: string;
};

export const footprints = [
  {
    date: "Apr 2026",
    title: "ポートフォリオサイトを公開",
    description: "自身のポートフォリオサイトであるkoutyuke.devを公開",
  },
  {
    date: "Aug 2025",
    title: "サイボウズの1weekサマーインターンに参加",
    description: "サイボウズの1weekサマーインターンに参加し、kintoneの開発に携わる",
  },
  {
    date: "Apr 2025",
    title: "茨城高専 専攻科入学",
    description: "専攻科に進学し、高専生の道を続ける",
  },
  {
    date: "Mar 2025",
    title: "茨城高専 本科卒業",
    description: "5年間の高専生活を終え、卒業を迎える",
  },
  {
    date: "Dec 2024",
    title: "SegFormerの研究",
    description: "卒業研究でRoPEを使用したSegFormerの改良に取り組む",
  },
  {
    date: "Nov 2024",
    title: "mona-caを開発",
    description: "生理情報をパートナー間で共有できるアプリmona-caを開発",
  },
  {
    date: "Oct 2024",
    title: "茨香祭FE開発",
    description: "第33回茨香祭のフロントエンド開発に参加",
  },
  {
    date: "Sep 2024",
    title: "C-StyleにJoin",
    description:
      "C-Style株式会社に所属し、フロントエンド、バックエンド、データモデリングなどを担当",
  },
  {
    date: "May 2024",
    title: "Yumemiパスポート取得",
    description: "ゆめみのコーディングテストを受験し、Yumemiパスポートを発行",
  },
  {
    date: "Nov 2023",
    title: "Astvelを開発",
    description:
      "Discordのボイスチャンネルメンバーを一括移動できるアプリAstvelを作成し、技育展に参加",
  },
  {
    date: "Sep 2023",
    title: "shokupassを開発",
    description:
      "PBL実験で食券サービスを受け渡しまで自動化するshokupassを作成し、実験班内で最高票を獲得",
  },
  {
    date: "Aug 2023",
    title: "usaを開発",
    description: "Kloud Hackathon #3でブラウザ上で遊べるUNO likeなゲームusaを作成",
  },
  {
    date: "Aug 2023",
    title: "FORCIAインターン",
    description: "株式会社フォルシアの1weekサマーインターンで検索アプリケーション開発コースに参加",
  },
  {
    date: "May 2023",
    title: "Caffe-Manaで優秀賞",
    description: "Kloud Hackathon #2でカフェイン管理iOSアプリCaffe-Manaを作成し、優秀賞を受賞",
  },
  {
    date: "Dec 2022",
    title: "ゲーム情報Bot開発",
    description: "Splatoonのゲーム内情報を通知するBotを個人開発",
  },
  {
    date: "Oct 2022",
    title: "茨香祭公式サイト開発",
    description: "文化祭である茨香祭の公式ホームページを友人と共同開発",
  },
  {
    date: "Sep 2022",
    title: "技育展でenshitaを開発",
    description:
      "Growthersのメンバーとして技育展に参加し、LT運営支援システムenshitaのフロントエンドを担当",
  },
  {
    date: "Mar 2022",
    title: "GrowthersにJoin",
    description: "高専生による開発コミュニティGrowthersに参加し、公式ブログサイト制作にも参加",
  },
  {
    date: "Aug 2022",
    title: "ROSを使ったロボット制御",
    description: "NHK2022に向けてROSを用いた制御コードを作成し、マルチマイコン化を実現",
  },
  {
    date: "Sep 2021",
    title: "部内Bot開発",
    description: "SlackとDiscord間のメッセージを同期するBotを作成",
  },
  {
    date: "Aug 2021",
    title: "ロボット部での開発",
    description: "ロボット部でNHK2021に向けた制御コードを作成",
  },
  {
    date: "Apr 2020",
    title: "茨城高専 本科入学",
    description: "茨城高専に入学し、高専生の道を始める",
  },
  {
    date: "Aug 2004",
    title: "誕生",
    description: "人生の始まり",
  },
] as const satisfies readonly Footprint[];

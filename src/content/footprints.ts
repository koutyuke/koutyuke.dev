export type Footprint = {
  date: string;
  description: string;
  title: string;
};

export const footprints = [
  { date: "Aug 2004", description: "人生の始まり", title: "誕生" },
  { date: "Aug 2004", description: "人生の始まり", title: "誕生" },
  { date: "Aug 2004", description: "人生の始まり", title: "誕生" },
  { date: "Feb 2024", description: "運命の出会い", title: "Destiny" },
  { date: "Aug 2004", description: "人生の始まり", title: "誕生" },
] as const satisfies readonly Footprint[];

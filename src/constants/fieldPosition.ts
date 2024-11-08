export enum FieldPositionCategory {
  "GOALKEEPER" = "GOALKEEPER",
  "DEFENDER" = "DEFENDER",
  "MIDFIELDER" = "MIDFIELDER",
  "FORWARD" = "FORWARD",
}
export const FieldPositionCategories = [
  FieldPositionCategory.GOALKEEPER,
  FieldPositionCategory.DEFENDER,
  FieldPositionCategory.MIDFIELDER,
  FieldPositionCategory.FORWARD,
];

export const positionsCategories = [
  {
    title: "All",
    key: "all",
    url: "/players",
    icon: undefined,
  },
  {
    title: "Goalkeepers",
    key: FieldPositionCategory.GOALKEEPER,
    url: "/players/goalkeeper",
    icon: null,
  },
  {
    title: "Defenders",
    key: FieldPositionCategory.DEFENDER,
    url: "/players/defender",
    icon: null,
  },
  {
    title: "Midfielders",
    key: FieldPositionCategory.MIDFIELDER,
    url: "/players/midfielder",
    icon: null,
  },
  {
    title: "Forwards",
    key: FieldPositionCategory.FORWARD,
    url: "/players/forward",
    icon: null,
  },
];

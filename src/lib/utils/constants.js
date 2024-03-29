export const RADIAN = Math.PI / 180;

export const COLORS = [
  "#f44336",
  "#9c27b0",
  "#3f51b5",
  "#03a9f4",
  "#009688",
  "#8bc34a",
  "#ffeb3b",
  "#ff9800",
  "#795548",
  "#607d8b",
];

export const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const LAST_12_MONTHS_OPTION = {
  label: "Last 12M",
  value: "last12months",
};

export const SCHEDULE = "Schedule";
export const PROFILE = "Profile";
export const BUDGET = "Budget";
export const TYPES = "Types";

export const MENU_ITEMS = [
  { label: SCHEDULE, active: true },
  { label: PROFILE, active: false, disabled: true },
  { label: BUDGET, active: false, disabled: true },
  { label: TYPES, active: false, disabled: true },
];

export const SCHEDULE_FREQUENCY = [
  { key: "0", value: "Daily", description: "" },
  { key: "1", value: "Weekly", description: "" },
  { key: "2", value: "Monthly", description: "" },
  { key: "3", value: "Yearly", description: "" },
];

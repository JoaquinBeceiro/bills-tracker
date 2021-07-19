import { COLORS } from "./constants";

export const addColors = (types) =>
  types.map((e, idx) => ({ ...e, color: COLORS[idx % COLORS.length] }));

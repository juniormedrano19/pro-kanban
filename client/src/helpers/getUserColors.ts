import { BG_COLORS } from "../utils/constants/bg-colors";
import { TEXT_COLORS } from "../utils/constants/text-colors";
import { getColorIndex } from "./getColorIndex";

const userColorsMap = new Map();
export const getUserColors = (user: string) => {
  const trimmedUser = user?.trim().toLowerCase();
  if (userColorsMap.has(trimmedUser)) {
    return userColorsMap.get(trimmedUser);
  }
  const index = getColorIndex(trimmedUser);
  const userColors = {
    bgColor: BG_COLORS[index],
    textColor: TEXT_COLORS[index],
  };

  userColorsMap.set(trimmedUser, userColors);
  return userColors;
};

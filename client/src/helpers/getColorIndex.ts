import { BG_COLORS } from "../utils/constants/bg-colors";

export const getColorIndex = (str: string) => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash); 
    }
    return Math.abs(hash % BG_COLORS.length); 
  };
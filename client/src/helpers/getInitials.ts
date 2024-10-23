export function getInitials(name: string | null | undefined): string {
  if (!name) return ""; // Check for undefined, null, or empty string
  
  const words = name.trim().split(/\s+/); // Trim and split by spaces
  
  if (words.length === 0) return ""; // Handle empty result after split

  if (words.length === 1) {
    return words[0][0]?.toUpperCase() || ""; // Check if word exists and has at least one character
  }

  return words.slice(0, 2).map(word => word[0]?.toUpperCase() || "").join(""); // Handle first two words
}

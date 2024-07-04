export default function matchesLevel(scLevel, targetLevel) {
  if (targetLevel === "A") {
    return scLevel === targetLevel;
  }

  if (targetLevel === "AA") {
    return ["A", "AA"].includes(scLevel);
  }

  return true;
}

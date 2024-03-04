export default function (numberWithDots) {
  const numberString = numberWithDots
    .split(".")
    .map((numb) => (numb = Number(numb) < 10 ? "0" + numb : numb))
    .join("");
  return Number(numberString);
}

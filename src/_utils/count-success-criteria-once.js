export default function countSuccessCriteriaOnce(accumulator, current) {
  for (let i = 0; i < accumulator.length; i++) {
    if (accumulator[i].sc === current.sc) {
      return accumulator;
    }
  }

  accumulator.push(current);

  return accumulator;
}

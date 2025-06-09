
export function calculateWPM(lastWordIdx, wordsStatuses, startTime) {
  let correctWords = 0;
  const gameMinutes = startTime / 60;

  for (let wordIdx = 0; wordIdx < lastWordIdx; wordIdx++) {
    if (wordsStatuses[wordIdx] !== "word incorrect") {
      correctWords++;
    }
  }

  const wpm = correctWords / gameMinutes;
  return wpm;
}
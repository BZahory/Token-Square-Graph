export function calculateSchedule(schedule, end = 572) {
  let emission = [];

  for (let i = 0; i < end; i++) {
    let beginning = i === 0 ? schedule.start : emission[i - 1][2];
    // TODO: make it 0 based?
    // i >= schedule.weekReductionStart - 1 &&
    // i < schedule.weeklyTerminalEmission - 1
    let newMint =
      i === 0
        ? (schedule.start * (schedule.beginningAnnualInflation / 100)) / 52
        : i + 2 > schedule.weekReductionStart &&
          i + 1 < schedule.weeklyTerminalEmission
        ? emission[i - 1][1] * schedule.emissionReductionMultiplier
        : emission[i - 1][1];

    let endWeek = beginning + newMint;

    emission.push([beginning, newMint, endWeek, i]);
  }
  return emission;
}

export function getEmissionSchedule(allocations, end = 572) {
  return token.allocations.reduce((acc, curr) => {
    acc[curr.category] = calculateSchedule(curr.schedule, end);
    return acc;
  }, {});
}

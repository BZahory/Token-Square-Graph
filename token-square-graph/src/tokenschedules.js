export const canvas = {
  name: "Canvas",
  symbol: "HODL",
  maxSupply: 1000000,
  allocations: [
    {
      category: "Treasury",
      allocation: {
        alloc: 20,
        vesting: 3,
        cliff: 0,
      },
      schedule: {
        start: 9000000,
        beginningAnnualInflation: 84,
        weekReductionStart: 2,
        emissionReductionMultiplier: 0.984,
        weeklyTerminalEmission: 207,
      },
    },
    {
      category: "Seed Investors",
      allocation: {
        alloc: 10,
        vesting: 2,
        cliff: 1,
      },
      schedule: {
        start: 5000000,
        beginningAnnualInflation: 70,
        weekReductionStart: 2,
        emissionReductionMultiplier: 0.98,
        weeklyTerminalEmission: 155,
      },
    },
    {
      category: "Team and Advisors",
      allocation: {
        alloc: 20,
        vesting: 4,
        cliff: 1,
      },
      schedule: {
        start: 8000000,
        beginningAnnualInflation: 85,
        weekReductionStart: 2,
        emissionReductionMultiplier: 0.987,
        weeklyTerminalEmission: 259,
      },
    },
    {
      category: "Community Initiatives",
      allocation: {
        alloc: 20,
        vesting: 5,
        cliff: 0,
      },
      schedule: {
        start: 10000000,
        beginningAnnualInflation: 80,
        weekReductionStart: 2,
        emissionReductionMultiplier: 0.984,
        weeklyTerminalEmission: 311,
      },
    },
    {
      category: "Ecosystem Development",
      allocation: {
        alloc: 30,
        vesting: 3,
        cliff: 0,
      },
      schedule: {
        start: 15000000,
        beginningAnnualInflation: 80,
        weekReductionStart: 2,
        emissionReductionMultiplier: 0.982,
        weeklyTerminalEmission: 207,
      },
    },
  ],
};

export const synthetix = {
  name: "Synthetix",
  symbol: "SNX",
  maxSupply: 10000000000,
  allocations: [
    {
      category: "Cumulative",
      allocation: {
        alloc: 100,
        vesting: 3,
        cliff: 0,
      },
      schedule: {
        start: 100000000,
        beginningAnnualInflation: 75,
        weekReductionStart: 41,
        emissionReductionMultiplier: 0.9875,
        weeklyTerminalEmission: 311,
      },
    },
  ],
};

export const abc = {
  name: "abc token",
  symbol: "ABC",
  maxSupply: 10000000000,
  allocations: [
    {
      category: "Cumulative",
      allocation: {
        alloc: 100,
        vesting: 3,
        cliff: 0,
      },
      schedule: {
        start: 30000000,
        beginningAnnualInflation: 25,
        weekReductionStart: 2,
        emissionReductionMultiplier: 0.9875,
        weeklyTerminalEmission: 232,
      },
    },
  ],
};

export const def = {
  name: "def token",
  symbol: "DEF",
  maxSupply: 10000000000,
  allocations: [
    {
      category: "Cumulative",
      allocation: {
        alloc: 100,
        vesting: 3,
        cliff: 0,
      },
      schedule: {
        start: 25000000,
        beginningAnnualInflation: 26,
        weekReductionStart: 2,
        emissionReductionMultiplier: 0.988,
        weeklyTerminalEmission: 200,
      },
    },
  ],
};

const tokenSchedules = [canvas, synthetix, abc, def];

export default tokenSchedules;

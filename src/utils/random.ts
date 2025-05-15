export function skewedBiasedRandomInteger(
  x: number,
  low: number = 1,
  high: number = 5,
  std: number = 0.7,
  skew: number = 0
): number {
  const values = Array.from({ length: high - low + 1 }, (_, i) => low + i);

  // Compute base probabilities from a Gaussian centered at x
  const baseProbs = values.map(v => Math.exp(-0.5 * Math.pow((v - x) / std, 2)));

  // Apply skew factor
  const skewFactors = values.map(v => Math.max(0, 1 + skew * (v - x) / std));

  // Combine base and skew
  const probabilities = baseProbs.map((p, i) => p * skewFactors[i]);

  // Normalize
  const total = probabilities.reduce((acc, p) => acc + p, 0);
  const normalized = probabilities.map(p => p / total);

  // Sample from distribution
  const rnd = Math.random();
  let cumulative = 0;
  for (let i = 0; i < values.length; i++) {
    cumulative += normalized[i];
    if (rnd < cumulative) return values[i];
  }

  // Fallback (should never hit)
  return values[values.length - 1];
}

export function generateSamples(
  n: number,
  params: {
    x: number;
    low: number;
    high: number;
    std: number;
    skew: number;
  }
): number[] {
  const { x, low, high, std, skew } = params;
  return Array.from({ length: n }, () => 
    skewedBiasedRandomInteger(x, low, high, std, skew)
  );
}

export function calculateFrequencies(samples: number[], low: number, high: number): number[] {
  const frequencies = Array(high - low + 1).fill(0);
  
  samples.forEach(value => {
    if (value >= low && value <= high) {
      frequencies[value - low]++;
    }
  });
  
  return frequencies;
}

export function calculateStatistics(samples: number[]): {
  mean: number;
  mode: number;
  min: number;
  max: number;
  variance: number;
  stdDev: number;
} {
  if (samples.length === 0) {
    return {
      mean: 0,
      mode: 0,
      min: 0,
      max: 0,
      variance: 0,
      stdDev: 0
    };
  }

  // Mean
  const sum = samples.reduce((acc, val) => acc + val, 0);
  const mean = sum / samples.length;
  
  // Mode
  const counts = new Map<number, number>();
  samples.forEach(val => {
    counts.set(val, (counts.get(val) || 0) + 1);
  });
  
  let mode = samples[0];
  let maxCount = 0;
  
  for (const [value, count] of counts.entries()) {
    if (count > maxCount) {
      maxCount = count;
      mode = value;
    }
  }
  
  // Min and Max
  const min = Math.min(...samples);
  const max = Math.max(...samples);
  
  // Variance and Standard Deviation
  const squaredDiffs = samples.map(val => Math.pow(val - mean, 2));
  const variance = squaredDiffs.reduce((acc, val) => acc + val, 0) / samples.length;
  const stdDev = Math.sqrt(variance);
  
  return {
    mean,
    mode,
    min,
    max,
    variance,
    stdDev
  };
}

export function calculateTheoreticalProbabilities(
  x: number,
  low: number,
  high: number,
  std: number,
  skew: number
): number[] {
  const values = Array.from({ length: high - low + 1 }, (_, i) => low + i);

  // Compute base probabilities from a Gaussian centered at x
  const baseProbs = values.map(v => Math.exp(-0.5 * Math.pow((v - x) / std, 2)));

  // Apply skew factor
  const skewFactors = values.map(v => Math.max(0, 1 + skew * (v - x) / std));

  // Combine base and skew
  const probabilities = baseProbs.map((p, i) => p * skewFactors[i]);

  // Normalize
  const total = probabilities.reduce((acc, p) => acc + p, 0);
  return probabilities.map(p => p / total);
}
export function convolution(a: number[], b: number[]): number[] {
  const result: number[] = Array(a.length + b.length - 1)
  for (const [i, a_value] of a.entries()) {
    for (const [j, b_value] of b.entries()) {
      result[i + j] = (result[i + j] ?? 0) + a_value * b_value
    }
  }
  return result
}

export function getCumulativeProbability(probabilities: number[]): number[] {
  const cumulative: number[] = []
  let sum = 0
  for (const p of probabilities.reverse()) {
    sum += p
    cumulative.push(sum)
  }
  return cumulative.reverse()
}

export function getSuccessProbabilityNDice(
  targetNumber: number,
  criticalRange: number,
  numberOfDice: number,
): number[][] {
  if (numberOfDice < 1) {
    throw new Error('Number of dice must be at least 1')
  }

  const singleDieProbabilities = getSuccessProbabilitySingleDie(targetNumber, criticalRange)
  const probabilities: number[][] = [singleDieProbabilities]

  let newProbabilities = singleDieProbabilities
  for (let i = 2; i <= numberOfDice; i++) {
    newProbabilities = convolution(newProbabilities, singleDieProbabilities)
    probabilities.push(newProbabilities)
  }

  return probabilities
}

export function getSuccessProbabilitySingleDie(
  targetNumber: number,
  criticalRange: number,
): number[] {
  return [(20 - targetNumber) / 20, (targetNumber - criticalRange) / 20, criticalRange / 20]
}

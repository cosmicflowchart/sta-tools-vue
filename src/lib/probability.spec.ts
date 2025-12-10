import { describe, expect, it } from 'vitest'

import {
  convolution,
  getCumulativeProbability,
  getSuccessProbabilityNDice,
  getSuccessProbabilitySingleDie,
} from './probability'

describe('convolution', () => {
  it('should return the convolution of two arrays', () => {
    const a = [0.25, 0.5, 0.25]
    const b = [0.25, 0.5, 0.25]
    const c = [0.0625, 0.25, 0.375, 0.25, 0.0625]
    expect(convolution(a, b)).toEqual(c)
  })
})

describe('getCumulativeProbability', () => {
  it('should return the cumulative probability of an array (15, 5)', () => {
    const probabilities = [0.25, 0.5, 0.25]
    const cumulative = [1.0, 0.75, 0.25]
    expect(getCumulativeProbability(probabilities)).toEqual(cumulative)
  })

  it('should return the cumulative probability of an array (13, 1)', () => {
    const probabilities = [0.35, 0.6, 0.05]
    const cumulative = [1.0, 0.65, 0.05]
    expect(getCumulativeProbability(probabilities)).toEqual(cumulative)
  })
})

describe('getSuccessProbabilityNDice', () => {
  it('should throw an error for less than 1 die', () => {
    expect(() => getSuccessProbabilityNDice(15, 5, 0)).toThrow('Number of dice must be at least 1')
  })

  it('should return the success probability for N dice (1 die, 15, 5)', () => {
    const successProbability = getSuccessProbabilityNDice(15, 5, 1)
    expect(successProbability).toEqual([[0.25, 0.5, 0.25]])
  })

  it('should return the success probability for N dice (2 dice, 15, 5)', () => {
    const successProbability = getSuccessProbabilityNDice(15, 5, 2)
    expect(successProbability).toEqual([
      [0.25, 0.5, 0.25],
      [0.0625, 0.25, 0.375, 0.25, 0.0625],
    ])
  })
})

describe('getSuccessProbabilitySingleDie', () => {
  it('should return the success probability for a single die (15, 5)', () => {
    const successProbability = getSuccessProbabilitySingleDie(15, 5)
    expect(successProbability).toEqual([0.25, 0.5, 0.25])
  })

  it('should return the success probability for a single die (13, 1)', () => {
    const successProbability = getSuccessProbabilitySingleDie(13, 1)
    expect(successProbability).toEqual([0.35, 0.6, 0.05])
  })
})

import { describe, it, expect } from 'vitest';
import getDecisionEndsAt from '../../src/helpers/getDecisionEndsAt.js';

describe('getDecisionEndsAt', () => {
  const createdAt = new Date('2024-06-01T10:00:00.000Z');

  it.each([
    ['12h', new Date('2024-06-01T22:00:00.000Z')],
    ['24h', new Date('2024-06-02T10:00:00.000Z')],
    ['48h', new Date('2024-06-03T10:00:00.000Z')],
    ['72h', new Date('2024-06-04T10:00:00.000Z')],
  ])('adds %s to createdAt', (decisionTimer, expected) => {
    expect(getDecisionEndsAt(createdAt, decisionTimer)).toEqual(expected);
  });
});

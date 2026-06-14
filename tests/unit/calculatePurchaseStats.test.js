import { describe, it, expect } from 'vitest';
import calculatePurchaseStats from '../../src/helpers/calculatePurchaseStats.js';

describe('calculatePurchaseStats', () => {
  it('calculates stats using total price (price * quantity)', () => {
    const stats = calculatePurchaseStats({
      price: 100,
      quantity: 2,
      salary: 5000,
      workHoursByWeek: 40,
      expectReturnPercentage: 10,
      investForYear: 5,
    });

    expect(stats.workHoursToPay).toBe(6.93);
    expect(stats.incomePercent).toBe(4);
    expect(stats.investmentIncome).toBe(122.1);
  });

  it('calculates work hours to pay from hourly rate', () => {
    const stats = calculatePurchaseStats({
      price: 1000,
      quantity: 1,
      salary: 10000,
      workHoursByWeek: 40,
      expectReturnPercentage: 7,
      investForYear: 1,
    });

    expect(stats.workHoursToPay).toBe(17.33);
    expect(stats.incomePercent).toBe(10);
    expect(stats.investmentIncome).toBe(70);
  });

  it('returns zero work hours and income percent when salary is zero', () => {
    const stats = calculatePurchaseStats({
      price: 500,
      quantity: 1,
      salary: 0,
      workHoursByWeek: 40,
      expectReturnPercentage: 8,
      investForYear: 3,
    });

    expect(stats.workHoursToPay).toBe(0);
    expect(stats.incomePercent).toBe(0);
    expect(stats.investmentIncome).toBe(129.86);
  });

  it('returns zero work hours when workHoursByWeek is zero', () => {
    const stats = calculatePurchaseStats({
      price: 200,
      quantity: 1,
      salary: 5000,
      workHoursByWeek: 0,
      expectReturnPercentage: 5,
      investForYear: 1,
    });

    expect(stats.workHoursToPay).toBe(0);
    expect(stats.incomePercent).toBe(4);
    expect(stats.investmentIncome).toBe(10);
  });

  it('returns zero investment income when expectReturnPercentage is zero', () => {
    const stats = calculatePurchaseStats({
      price: 300,
      quantity: 2,
      salary: 6000,
      workHoursByWeek: 40,
      expectReturnPercentage: 0,
      investForYear: 10,
    });

    expect(stats.investmentIncome).toBe(0);
  });
});

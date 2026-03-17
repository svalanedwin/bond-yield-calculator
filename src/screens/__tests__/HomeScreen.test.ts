import { BondInput, BondResult } from '../../types/bond';
import {
  calculateCurrentYield,
  calculateTotalInterest,
  calculateYTM,
  getBondStatus,
} from '../../utils/bondCalculations';

describe('HomeScreen - Bond Calculation Integration', () => {
  describe('Calculate Bond Results', () => {
    it('should calculate all metrics for a discount bond', () => {
      const data: BondInput = {
        faceValue: 1000,
        couponRate: 5,
        marketPrice: 950,
        years: 10,
        frequency: 2,
      };

      const currentYield = calculateCurrentYield(
        data.faceValue,
        data.couponRate,
        data.marketPrice
      );

      const ytm = calculateYTM(
        data.faceValue,
        data.couponRate,
        data.marketPrice,
        data.years,
        data.frequency
      );

      const totalInterest = calculateTotalInterest(
        data.faceValue,
        data.couponRate,
        data.years,
        data.frequency
      );

      const status = getBondStatus(data.faceValue, data.marketPrice);

      const results: BondResult = {
        currentYield,
        ytm,
        totalInterest,
        status,
      };

      expect(results.currentYield).toBeCloseTo(0.05263, 4);
      expect(results.ytm).toBeGreaterThan(data.couponRate / 100);
      expect(results.totalInterest).toBeCloseTo(500, 1);
      expect(results.status).toBe('Discount');
    });

    it('should calculate all metrics for a premium bond', () => {
      const data: BondInput = {
        faceValue: 1000,
        couponRate: 8,
        marketPrice: 1050,
        years: 5,
        frequency: 2,
      };

      const currentYield = calculateCurrentYield(
        data.faceValue,
        data.couponRate,
        data.marketPrice
      );

      const ytm = calculateYTM(
        data.faceValue,
        data.couponRate,
        data.marketPrice,
        data.years,
        data.frequency
      );

      const totalInterest = calculateTotalInterest(
        data.faceValue,
        data.couponRate,
        data.years,
        data.frequency
      );

      const status = getBondStatus(data.faceValue, data.marketPrice);

      const results: BondResult = {
        currentYield,
        ytm,
        totalInterest,
        status,
      };

      expect(results.currentYield).toBeCloseTo(0.0762, 4);
      expect(results.ytm).toBeLessThan(data.couponRate / 100);
      expect(results.totalInterest).toBeCloseTo(400, 1);
      expect(results.status).toBe('Premium');
    });

    it('should calculate all metrics for a par bond', () => {
      const data: BondInput = {
        faceValue: 1000,
        couponRate: 6,
        marketPrice: 1000,
        years: 5,
        frequency: 1,
      };

      const currentYield = calculateCurrentYield(
        data.faceValue,
        data.couponRate,
        data.marketPrice
      );

      const ytm = calculateYTM(
        data.faceValue,
        data.couponRate,
        data.marketPrice,
        data.years,
        data.frequency
      );

      const totalInterest = calculateTotalInterest(
        data.faceValue,
        data.couponRate,
        data.years,
        data.frequency
      );

      const status = getBondStatus(data.faceValue, data.marketPrice);

      const results: BondResult = {
        currentYield,
        ytm,
        totalInterest,
        status,
      };

      expect(results.currentYield).toBeCloseTo(0.06, 4);
      expect(results.ytm).toBeCloseTo(data.couponRate / 100, 2);
      expect(results.totalInterest).toBeCloseTo(300, 1);
      expect(results.status).toBe('Par');
    });
  });

  describe('Payment Frequency Impact', () => {
    it('should handle annual frequency correctly', () => {
      const data: BondInput = {
        faceValue: 1000,
        couponRate: 5,
        marketPrice: 950,
        years: 10,
        frequency: 1,
      };

      const ytm = calculateYTM(
        data.faceValue,
        data.couponRate,
        data.marketPrice,
        data.years,
        data.frequency
      );

      expect(ytm).toBeGreaterThan(0);
      expect(ytm).toBeLessThan(1);
    });

    it('should handle semi-annual frequency correctly', () => {
      const data: BondInput = {
        faceValue: 1000,
        couponRate: 5,
        marketPrice: 950,
        years: 10,
        frequency: 2,
      };

      const ytm = calculateYTM(
        data.faceValue,
        data.couponRate,
        data.marketPrice,
        data.years,
        data.frequency
      );

      expect(ytm).toBeGreaterThan(0);
      expect(ytm).toBeLessThan(1);
    });
  });

  describe('Results Type Safety', () => {
    it('should return valid BondResult object', () => {
      const data: BondInput = {
        faceValue: 1000,
        couponRate: 5,
        marketPrice: 950,
        years: 10,
        frequency: 2,
      };

      const currentYield = calculateCurrentYield(
        data.faceValue,
        data.couponRate,
        data.marketPrice
      );

      const ytm = calculateYTM(
        data.faceValue,
        data.couponRate,
        data.marketPrice,
        data.years,
        data.frequency
      );

      const totalInterest = calculateTotalInterest(
        data.faceValue,
        data.couponRate,
        data.years,
        data.frequency
      );

      const status = getBondStatus(data.faceValue, data.marketPrice);

      const results: BondResult = {
        currentYield,
        ytm,
        totalInterest,
        status,
      };

      expect(typeof results.currentYield).toBe('number');
      expect(typeof results.ytm).toBe('number');
      expect(typeof results.totalInterest).toBe('number');
      expect(['Premium', 'Discount', 'Par']).toContain(results.status);
    });

    it('should have all required result fields', () => {
      const data: BondInput = {
        faceValue: 1000,
        couponRate: 5,
        marketPrice: 950,
        years: 10,
        frequency: 2,
      };

      const currentYield = calculateCurrentYield(
        data.faceValue,
        data.couponRate,
        data.marketPrice
      );

      const ytm = calculateYTM(
        data.faceValue,
        data.couponRate,
        data.marketPrice,
        data.years,
        data.frequency
      );

      const totalInterest = calculateTotalInterest(
        data.faceValue,
        data.couponRate,
        data.years,
        data.frequency
      );

      const status = getBondStatus(data.faceValue, data.marketPrice);

      const results: BondResult = {
        currentYield,
        ytm,
        totalInterest,
        status,
      };

      expect(results).toHaveProperty('currentYield');
      expect(results).toHaveProperty('ytm');
      expect(results).toHaveProperty('totalInterest');
      expect(results).toHaveProperty('status');
    });
  });
});

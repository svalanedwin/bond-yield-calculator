import { BondInput, BondResult } from '../../types/bond';

describe('Bond Types', () => {
  describe('BondInput Type', () => {
    it('should create a valid BondInput object', () => {
      const bondInput: BondInput = {
        faceValue: 1000,
        couponRate: 5,
        marketPrice: 950,
        years: 10,
        frequency: 2,
      };

      expect(bondInput.faceValue).toBe(1000);
      expect(bondInput.couponRate).toBe(5);
      expect(bondInput.marketPrice).toBe(950);
      expect(bondInput.years).toBe(10);
      expect(bondInput.frequency).toBe(2);
    });

    it('should have all required BondInput properties', () => {
      const bondInput: BondInput = {
        faceValue: 1000,
        couponRate: 5,
        marketPrice: 950,
        years: 10,
        frequency: 2,
      };

      expect(bondInput).toHaveProperty('faceValue');
      expect(bondInput).toHaveProperty('couponRate');
      expect(bondInput).toHaveProperty('marketPrice');
      expect(bondInput).toHaveProperty('years');
      expect(bondInput).toHaveProperty('frequency');
    });

    it('should handle decimal values', () => {
      const bondInput: BondInput = {
        faceValue: 1000.50,
        couponRate: 5.25,
        marketPrice: 950.75,
        years: 10.5,
        frequency: 2,
      };

      expect(typeof bondInput.faceValue).toBe('number');
      expect(typeof bondInput.couponRate).toBe('number');
      expect(typeof bondInput.marketPrice).toBe('number');
      expect(typeof bondInput.years).toBe('number');
    });

    it('should validate frequency values', () => {
      const annualBond: BondInput = {
        faceValue: 1000,
        couponRate: 5,
        marketPrice: 950,
        years: 10,
        frequency: 1,
      };

      const semiAnnualBond: BondInput = {
        faceValue: 1000,
        couponRate: 5,
        marketPrice: 950,
        years: 10,
        frequency: 2,
      };

      expect([1, 2]).toContain(annualBond.frequency);
      expect([1, 2]).toContain(semiAnnualBond.frequency);
    });
  });

  describe('BondResult Type', () => {
    it('should create a valid BondResult object', () => {
      const bondResult: BondResult = {
        currentYield: 0.05,
        ytm: 0.055,
        totalInterest: 500,
        status: 'Discount',
      };

      expect(bondResult.currentYield).toBe(0.05);
      expect(bondResult.ytm).toBe(0.055);
      expect(bondResult.totalInterest).toBe(500);
      expect(bondResult.status).toBe('Discount');
    });

    it('should have all required BondResult properties', () => {
      const bondResult: BondResult = {
        currentYield: 0.05,
        ytm: 0.055,
        totalInterest: 500,
        status: 'Premium',
      };

      expect(bondResult).toHaveProperty('currentYield');
      expect(bondResult).toHaveProperty('ytm');
      expect(bondResult).toHaveProperty('totalInterest');
      expect(bondResult).toHaveProperty('status');
    });

    it('should validate status values', () => {
      const discountBond: BondResult = {
        currentYield: 0.05,
        ytm: 0.055,
        totalInterest: 500,
        status: 'Discount',
      };

      const premiumBond: BondResult = {
        currentYield: 0.05,
        ytm: 0.045,
        totalInterest: 500,
        status: 'Premium',
      };

      const parBond: BondResult = {
        currentYield: 0.05,
        ytm: 0.05,
        totalInterest: 500,
        status: 'Par',
      };

      const validStatuses = ['Premium', 'Discount', 'Par'];
      expect(validStatuses).toContain(discountBond.status);
      expect(validStatuses).toContain(premiumBond.status);
      expect(validStatuses).toContain(parBond.status);
    });

    it('should handle numeric results', () => {
      const bondResult: BondResult = {
        currentYield: 0.052631578947,
        ytm: 0.055234891,
        totalInterest: 499.99999,
        status: 'Discount',
      };

      expect(typeof bondResult.currentYield).toBe('number');
      expect(typeof bondResult.ytm).toBe('number');
      expect(typeof bondResult.totalInterest).toBe('number');
      expect(bondResult.currentYield).toBeGreaterThan(0);
      expect(bondResult.ytm).toBeGreaterThan(0);
      expect(bondResult.totalInterest).toBeGreaterThan(0);
    });
  });

  describe('Type Constraints', () => {
    it('should maintain numeric precision in BondInput', () => {
      const bondInput: BondInput = {
        faceValue: 1000,
        couponRate: 5.555555,
        marketPrice: 950.123456,
        years: 10.5,
        frequency: 2,
      };

      expect(bondInput.couponRate).toBeCloseTo(5.555555, 6);
      expect(bondInput.marketPrice).toBeCloseTo(950.123456, 6);
    });

    it('should maintain numeric precision in BondResult', () => {
      const bondResult: BondResult = {
        currentYield: 0.0526315789,
        ytm: 0.055234891,
        totalInterest: 499.9999999,
        status: 'Discount',
      };

      expect(bondResult.currentYield).toBeCloseTo(0.0526315789, 9);
      expect(bondResult.ytm).toBeCloseTo(0.055234891, 9);
      expect(bondResult.totalInterest).toBeCloseTo(499.9999999, 7);
    });

    it('should reject invalid status values', () => {
      // This test demonstrates that invalid strings do not match valid status
      const validStatuses: Array<'Premium' | 'Discount' | 'Par'> = ['Premium', 'Discount', 'Par'];
      const invalidStatus = 'Invalid';

      expect(validStatuses).not.toContain(invalidStatus);
    });
  });
});

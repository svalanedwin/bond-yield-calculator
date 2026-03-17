import {
  calculateCurrentYield,
  calculateTotalInterest,
  calculateYTM,
  getBondStatus,
} from '../bondCalculations';

describe('Bond Calculations', () => {
  describe('calculateCurrentYield', () => {
    it('should calculate current yield correctly', () => {
      const result = calculateCurrentYield(1000, 5, 950);
      expect(result).toBeCloseTo(0.05263, 5);
    });

    it('should handle par value', () => {
      const result = calculateCurrentYield(1000, 5, 1000);
      expect(result).toBeCloseTo(0.05, 5);
    });

    it('should calculate yield for premium bond', () => {
      const result = calculateCurrentYield(1000, 5, 1050);
      expect(result).toBeCloseTo(0.04762, 5);
    });

    it('should handle zero coupon rate', () => {
      const result = calculateCurrentYield(1000, 0, 950);
      expect(result).toBe(0);
    });
  });

  describe('calculateTotalInterest', () => {
    it('should calculate total interest correctly', () => {
      const result = calculateTotalInterest(1000, 5, 10, 2);
      expect(result).toBeCloseTo(500, 1);
    });

    it('should calculate for annual frequency', () => {
      const result = calculateTotalInterest(1000, 6, 5, 1);
      expect(result).toBeCloseTo(300, 1);
    });

    it('should calculate for semi-annual frequency', () => {
      const result = calculateTotalInterest(1000, 4, 20, 2);
      expect(result).toBeCloseTo(800, 1);
    });

    it('should handle zero coupon rate', () => {
      const result = calculateTotalInterest(1000, 0, 10, 2);
      expect(result).toBe(0);
    });
  });

  describe('getBondStatus', () => {
    it('should return "Par" when market price equals face value', () => {
      const result = getBondStatus(1000, 1000);
      expect(result).toBe('Par');
    });

    it('should return "Premium" when market price is higher than face value', () => {
      const result = getBondStatus(1000, 1050);
      expect(result).toBe('Premium');
    });

    it('should return "Discount" when market price is lower than face value', () => {
      const result = getBondStatus(1000, 950);
      expect(result).toBe('Discount');
    });

    it('should handle different face values', () => {
      const result1 = getBondStatus(500, 520);
      expect(result1).toBe('Premium');

      const result2 = getBondStatus(2000, 1900);
      expect(result2).toBe('Discount');
    });
  });

  describe('calculateYTM', () => {
    it('should calculate YTM for a standard bond', () => {
      const ytm = calculateYTM(1000, 5, 950, 10, 2);
      // YTM should be higher than coupon rate for discount bonds
      expect(ytm).toBeGreaterThan(0.05);
      expect(ytm).toBeLessThan(0.1);
    });

    it('should return coupon rate for par valued bonds', () => {
      const ytm = calculateYTM(1000, 5, 1000, 10, 2);
      // For par valued bonds, YTM should approximately equal coupon rate
      expect(ytm).toBeCloseTo(0.05, 2);
    });

    it('should calculate YTM lower than coupon for premium bonds', () => {
      const ytm = calculateYTM(1000, 5, 1050, 10, 2);
      // YTM should be lower than coupon rate for premium bonds
      expect(ytm).toBeLessThan(0.05);
      expect(ytm).toBeGreaterThan(0);
    });

    it('should handle different payment frequencies', () => {
      const ytmAnnual = calculateYTM(1000, 5, 950, 10, 1);
      const ytmSemiAnnual = calculateYTM(1000, 5, 950, 10, 2);
      // Both should be positive
      expect(ytmAnnual).toBeGreaterThan(0);
      expect(ytmSemiAnnual).toBeGreaterThan(0);
    });

    it('should converge to a solution', () => {
      const ytm = calculateYTM(1000, 6, 900, 5, 2);
      // YTM should be a reasonable number
      expect(ytm).toBeGreaterThan(0);
      expect(ytm).toBeLessThan(1);
    });
  });

  describe('Edge cases', () => {
    it('should handle very small bond values', () => {
      const yield1 = calculateCurrentYield(10, 2, 9.50);
      expect(yield1).toBeCloseTo(0.02105, 4);

      const status = getBondStatus(10, 9.50);
      expect(status).toBe('Discount');
    });

    it('should handle very large bond values', () => {
      const yield1 = calculateCurrentYield(1000000, 5, 950000);
      expect(yield1).toBeCloseTo(0.05263, 5);

      const status = getBondStatus(1000000, 950000);
      expect(status).toBe('Discount');
    });

    it('should handle very high coupon rates', () => {
      const yield1 = calculateCurrentYield(1000, 10, 1000);
      expect(yield1).toBeCloseTo(0.1, 1);

      const totalInterest = calculateTotalInterest(1000, 10, 1, 1);
      expect(totalInterest).toBeCloseTo(100, 1);
    });
  });
});

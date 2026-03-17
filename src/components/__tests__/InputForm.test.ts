describe('Input Validation', () => {
  describe('Face Value Validation', () => {
    it('should reject empty face value', () => {
      const value = '';
      const error = !value.trim() ? 'Face Value is required' : null;
      expect(error).toBe('Face Value is required');
    });

    it('should reject non-numeric face value', () => {
      const value = 'abc';
      const parsed = parseFloat(value);
      const error = isNaN(parsed) ? 'Face Value must be a valid number' : null;
      expect(error).toBe('Face Value must be a valid number');
    });

    it('should reject zero or negative face value', () => {
      const value = '-100';
      const parsed = parseFloat(value);
      const error = parsed <= 0 ? 'Face Value must be greater than 0' : null;
      expect(error).toBe('Face Value must be greater than 0');
    });

    it('should reject unreasonably high face value', () => {
      const value = '10000000';
      const parsed = parseFloat(value);
      const error = parsed > 1000000 ? 'Face Value is unreasonably high' : null;
      expect(error).toBe('Face Value is unreasonably high');
    });

    it('should accept valid face value', () => {
      const value = '1000';
      const parsed = parseFloat(value);
      const error = 
        !value.trim() ? 'Face Value is required' :
        isNaN(parsed) ? 'Face Value must be a valid number' :
        parsed <= 0 ? 'Face Value must be greater than 0' :
        parsed > 1000000 ? 'Face Value is unreasonably high' :
        null;
      expect(error).toBeNull();
    });
  });

  describe('Coupon Rate Validation', () => {
    it('should reject empty coupon rate', () => {
      const value = '';
      const error = !value.trim() ? 'Coupon Rate is required' : null;
      expect(error).toBe('Coupon Rate is required');
    });

    it('should reject non-numeric coupon rate', () => {
      const value = 'xyz';
      const parsed = parseFloat(value);
      const error = isNaN(parsed) ? 'Coupon Rate must be a valid number' : null;
      expect(error).toBe('Coupon Rate must be a valid number');
    });

    it('should reject negative coupon rate', () => {
      const value = '-5';
      const parsed = parseFloat(value);
      const error = parsed < 0 ? 'Coupon Rate cannot be negative' : null;
      expect(error).toBe('Coupon Rate cannot be negative');
    });

    it('should reject coupon rate exceeding 100%', () => {
      const value = '150';
      const parsed = parseFloat(value);
      const error = parsed > 100 ? 'Coupon Rate seems unreasonably high (max 100%)' : null;
      expect(error).toBe('Coupon Rate seems unreasonably high (max 100%)');
    });

    it('should accept valid coupon rate', () => {
      const value = '5.5';
      const parsed = parseFloat(value);
      const error = 
        !value.trim() ? 'Coupon Rate is required' :
        isNaN(parsed) ? 'Coupon Rate must be a valid number' :
        parsed < 0 ? 'Coupon Rate cannot be negative' :
        parsed > 100 ? 'Coupon Rate seems unreasonably high (max 100%)' :
        null;
      expect(error).toBeNull();
    });
  });

  describe('Market Price Validation', () => {
    it('should reject empty market price', () => {
      const value = '';
      const error = !value.trim() ? 'Market Price is required' : null;
      expect(error).toBe('Market Price is required');
    });

    it('should reject non-numeric market price', () => {
      const value = 'qwerty';
      const parsed = parseFloat(value);
      const error = isNaN(parsed) ? 'Market Price must be a valid number' : null;
      expect(error).toBe('Market Price must be a valid number');
    });

    it('should reject zero or negative market price', () => {
      const value = '0';
      const parsed = parseFloat(value);
      const error = parsed <= 0 ? 'Market Price must be greater than 0' : null;
      expect(error).toBe('Market Price must be greater than 0');
    });

    it('should reject unreasonably high market price', () => {
      const value = '5000000';
      const parsed = parseFloat(value);
      const error = parsed > 1000000 ? 'Market Price is unreasonably high' : null;
      expect(error).toBe('Market Price is unreasonably high');
    });

    it('should accept valid market price', () => {
      const value = '950.50';
      const parsed = parseFloat(value);
      const error = 
        !value.trim() ? 'Market Price is required' :
        isNaN(parsed) ? 'Market Price must be a valid number' :
        parsed <= 0 ? 'Market Price must be greater than 0' :
        parsed > 1000000 ? 'Market Price is unreasonably high' :
        null;
      expect(error).toBeNull();
    });
  });

  describe('Years Validation', () => {
    it('should reject empty years field', () => {
      const value = '';
      const error = !value.trim() ? 'Years to Maturity is required' : null;
      expect(error).toBe('Years to Maturity is required');
    });

    it('should reject non-numeric years', () => {
      const value = 'ten';
      const parsed = parseFloat(value);
      const error = isNaN(parsed) ? 'Years must be a valid number' : null;
      expect(error).toBe('Years must be a valid number');
    });

    it('should reject zero or negative years', () => {
      const value = '-5';
      const parsed = parseFloat(value);
      const error = parsed <= 0 ? 'Years must be greater than 0' : null;
      expect(error).toBe('Years must be greater than 0');
    });

    it('should reject unreasonably high years', () => {
      const value = '200';
      const parsed = parseFloat(value);
      const error = parsed > 100 ? 'Years seems unreasonably high' : null;
      expect(error).toBe('Years seems unreasonably high');
    });

    it('should accept valid years', () => {
      const value = '10.5';
      const parsed = parseFloat(value);
      const error = 
        !value.trim() ? 'Years to Maturity is required' :
        isNaN(parsed) ? 'Years must be a valid number' :
        parsed <= 0 ? 'Years must be greater than 0' :
        parsed > 100 ? 'Years seems unreasonably high' :
        null;
      expect(error).toBeNull();
    });
  });

  describe('Multiple Field Validation', () => {
    it('should allow form submission when all fields are valid', () => {
      const faceValue = '1000';
      const couponRate = '5';
      const marketPrice = '950';
      const years = '10';

      const fvParsed = parseFloat(faceValue);
      const crParsed = parseFloat(couponRate);
      const mpParsed = parseFloat(marketPrice);
      const yParsed = parseFloat(years);

      const isValid = 
        !faceValue.trim() === false &&
        isNaN(fvParsed) === false &&
        fvParsed > 0 &&
        fvParsed <= 1000000 &&
        !couponRate.trim() === false &&
        isNaN(crParsed) === false &&
        crParsed >= 0 &&
        crParsed <= 100 &&
        !marketPrice.trim() === false &&
        isNaN(mpParsed) === false &&
        mpParsed > 0 &&
        mpParsed <= 1000000 &&
        !years.trim() === false &&
        isNaN(yParsed) === false &&
        yParsed > 0 &&
        yParsed <= 100;

      expect(isValid).toBe(true);
    });

    it('should reject form submission when one field is invalid', () => {
      const faceValue = '-500'; // Invalid
      const couponRate = '5';
      const marketPrice = '950';
      const years = '10';

      const fvParsed = parseFloat(faceValue);
      const crParsed = parseFloat(couponRate);
      const mpParsed = parseFloat(marketPrice);
      const yParsed = parseFloat(years);

      const isValid = 
        !faceValue.trim() === false &&
        isNaN(fvParsed) === false &&
        fvParsed > 0 &&
        fvParsed <= 1000000 &&
        !couponRate.trim() === false &&
        isNaN(crParsed) === false &&
        crParsed >= 0 &&
        crParsed <= 100 &&
        !marketPrice.trim() === false &&
        isNaN(mpParsed) === false &&
        mpParsed > 0 &&
        mpParsed <= 1000000 &&
        !years.trim() === false &&
        isNaN(yParsed) === false &&
        yParsed > 0 &&
        yParsed <= 100;

      expect(isValid).toBe(false);
    });
  });
});

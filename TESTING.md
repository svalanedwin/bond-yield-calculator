# Unit Testing Documentation

## Overview
This project includes comprehensive unit tests for the Bond Yield Calculator application. Tests cover utility functions, input validation, and integration scenarios.

## Test Structure

```
src/
├── utils/
│   └── __tests__/
│       └── bondCalculations.test.ts    # Tests for bond calculation functions
├── components/
│   └── __tests__/
│       └── InputForm.test.ts           # Tests for input validation
└── screens/
    └── __tests__/
        └── HomeScreen.test.ts          # Integration tests for calculation results
```

## Setup

### 1. Install Dependencies
```bash
npm install
```

This installs the testing framework and related dependencies:
- **jest**: Testing framework
- **ts-jest**: TypeScript support for Jest
- **@testing-library/react-native**: React Native testing utilities
- **@testing-library/jest-native**: Jest matchers for React Native

### 2. Configuration Files
- **jest.config.js**: Jest configuration with TypeScript support
- **jest.setup.js**: Setup file for testing library extensions

## Running Tests

### Run All Tests
```bash
npm test
```

### Run Tests in Watch Mode
```bash
npm run test:watch
```

Continues watching for file changes and re-runs tests automatically. Useful during development.

### Generate Coverage Report
```bash
npm run test:coverage
```

Generates a coverage report showing how much of your code is tested.

## Test Files

### 1. Bond Calculations Tests (`bondCalculations.test.ts`)

Tests for all bond calculation functions:

- **calculateCurrentYield**: Tests current yield calculations for discount, par, and premium bonds
- **calculateTotalInterest**: Tests total interest calculations with different payment frequencies
- **getBondStatus**: Tests bond status categorization (Premium/Discount/Par)
- **calculateYTM**: Tests yield to maturity calculations using Newton-Raphson method

**Key Test Cases:**
- Standard bond calculations
- Par valued bonds
- Premium bonds (negative YTM adjustment)
- Discount bonds (positive YTM adjustment)
- Different payment frequencies (annual, semi-annual)
- Edge cases (very small/large values)
- Zero coupon rates

### 2. Input Validation Tests (`InputForm.test.ts`)

Tests for comprehensive input validation:

**Face Value Validation:**
- Required field check
- Numeric validation
- Range validation (0 < value ≤ 1,000,000)

**Coupon Rate Validation:**
- Required field check
- Numeric validation
- Non-negative validation
- Maximum percentage check (≤ 100%)

**Market Price Validation:**
- Required field check
- Numeric validation
- Range validation (0 < value ≤ 1,000,000)

**Years Validation:**
- Required field check
- Numeric validation
- Range validation (0 < value ≤ 100)

**Multiple Field Validation:**
- All fields valid scenario
- One or more fields invalid scenarios

### 3. HomeScreen Integration Tests (`HomeScreen.test.ts`)

Integration tests for the complete calculation workflow:

- **Discount Bond Calculation**: Full calculation for bonds below par value
- **Premium Bond Calculation**: Full calculation for bonds above par value
- **Par Bond Calculation**: Full calculation for bonds at par value
- **Payment Frequency Impact**: Tests with annual and semi-annual frequencies
- **Results Type Safety**: Validates BondResult object structure
- **Required Fields Check**: Ensures all result fields are present and properly typed

## Test Coverage

The testing suite aims to cover:

- ✅ All utility functions in `bondCalculations.ts`
- ✅ Input validation logic in `InputForm.tsx`
- ✅ Integration scenarios in `HomeScreen.tsx`
- ✅ Edge cases and boundary conditions
- ✅ Type safety and return value validation

### Target Coverage Goals
- **Statements**: 80%+
- **Branches**: 75%+
- **Functions**: 85%+
- **Lines**: 80%+

## Example Test Run

```bash
$ npm test

PASS  src/utils/__tests__/bondCalculations.test.ts
  Bond Calculations
    calculateCurrentYield
      ✓ should calculate current yield correctly (5ms)
      ✓ should handle par value (1ms)
      ✓ should calculate yield for premium bond (1ms)
      ...
    calculateYTM
      ✓ should calculate YTM for a standard bond (45ms)
      ✓ should return coupon rate for par valued bonds (28ms)
      ...

PASS  src/components/__tests__/InputForm.test.ts
  Input Validation
    Face Value Validation
      ✓ should reject empty face value (2ms)
      ✓ should reject non-numeric face value (1ms)
      ✓ should accept valid face value (1ms)
      ...

PASS  src/screens/__tests__/HomeScreen.test.ts
  HomeScreen - Bond Calculation Integration
    Calculate Bond Results
      ✓ should calculate all metrics for a discount bond (52ms)
      ✓ should calculate all metrics for a premium bond (48ms)
      ...

Test Suites: 3 passed, 3 total
Tests:       45 passed, 45 total
```

## Adding New Tests

To add new tests:

1. Create a `.test.ts` or `.spec.ts` file in the `__tests__` directory
2. Follow the existing test structure and naming conventions
3. Use descriptive test names (e.g., "should calculate YTM correctly")
4. Test both success and failure cases
5. Include edge cases and boundary conditions

Example:
```typescript
describe('New Feature', () => {
  it('should do something', () => {
    // Arrange
    const input = 'test';
    
    // Act
    const result = myFunction(input);
    
    // Assert
    expect(result).toBe('expected');
  });
});
```

## Continuous Integration

These tests can be run in CI/CD pipelines:

```bash
# In your CI configuration
npm ci          # Clean install
npm run test    # Run all tests
npm run test:coverage  # Generate coverage report
```

## Troubleshooting

### Tests Not Found
Ensure test files are in the correct location with `.test.ts` or `.spec.ts` extension.

### TypeScript Errors
Verify that `tsconfig.json` is properly configured and all types are imported correctly.

### Module Resolution Issues
Check that import paths match the actual file structure in the project.

## Resources

- [Jest Documentation](https://jestjs.io/)
- [Testing Library](https://testing-library.com/)
- [React Native Testing](https://reactnative.dev/docs/testing-overview)

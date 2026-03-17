# Bond Yield Calculator App

A professional React Native bond yield analysis application built with TypeScript, featuring comprehensive bond calculations, real-time validation, and a banking-grade UI.

## 🎯 Overview

The Bond Yield Calculator is a mobile application designed for investors, financial analysts, and traders to quickly analyze bond investments. It calculates critical bond metrics including Current Yield, Yield to Maturity (YTM), and generates detailed cash flow schedules with professional banking application styling.

## ✨ Features

- **Bond Analysis Calculations**
  - Current Yield calculation based on coupon and market price
  - Yield to Maturity (YTM) using Newton-Raphson method (~1000 iterations for accuracy)
  - Total Interest Earned calculation
  - Bond Status classification (Premium, Discount, Par)

- **Comprehensive Input Validation**
  - Real-time validation for all bond parameters
  - User-friendly error messages with visual indicators (⚠️, ❌)
  - Contextual examples in error messages
  - Support for multiple payment frequencies (Annual, Semi-annual)

- **Professional Cash Flow Schedule**
  - Detailed 5-column cash flow display:
    - Period number
    - Payment date
    - Coupon payment amount
    - Cumulative interest earned
    - Remaining principal balance
  - Totals row with financial summaries
  - Alternating row colors for improved readability
  - Banking application-grade styling

- **Robust Testing**
  - 60+ comprehensive unit tests
  - Full TypeScript type safety
  - Jest + ts-jest testing framework
  - @testing-library/react-native for component testing

- **Mobile-Optimized UI**
  - Safe area handling with React Native SafeAreaProvider
  - Responsive design for various screen sizes
  - Color-coded bond status indicators
  - Auto-scroll to results after calculation
  - Professional card-based layout

## 🚀 Installation

### Prerequisites

- Node.js 14+ and npm
- Expo CLI (optional, for running on device)
- React Native development environment

### Setup

1. **Clone or navigate to the project**

   ```bash
   cd bond-yield-app
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Verify installation**
   ```bash
   npm test
   ```

## � Demo Videos

### iOS Demo

📹 [Watch iOS Demo Video](https://drive.google.com/file/d/1ahNGPkgSZ9rK3EQySiNdNyobf9e1Od0a/view?usp=sharing)

### Android Demo

📹 [Watch Android Demo Video](https://drive.google.com/file/d/1MbBNO6Kr7fNAt6y6LgPrrUSnhKprb0w1/view?usp=sharing)

## �📖 Usage

### Running the Application

**Development with Expo:**

```bash
npm start
```

Then press:

- `i` for iOS simulator
- `a` for Android emulator
- `w` for web preview

**Running Tests:**

```bash
npm test
```

**Type Checking:**

```bash
npx tsc --noEmit
```

### How to Use the App

1. **Enter Bond Parameters:**
   - Face Value: Bond's par value (e.g., 1000)
   - Coupon Rate: Annual interest rate (e.g., 5)
   - Market Price: Current bond price (e.g., 950)
   - Years to Maturity: Time until bond matures (e.g., 10)
   - Payment Frequency: Annual or Semi-annual

2. **Submit the Form:**
   - Press "Calculate" button
   - App validates all inputs in real-time
   - Invalid inputs display contextual error messages

3. **Review Results:**
   - Bond Status (Premium/Discount/Par)
   - Current Yield percentage
   - Yield to Maturity (YTM) percentage
   - Total Interest Earned amount
   - Detailed Cash Flow Schedule with totals

## 📁 Project Structure

```
bond-yield-app/
├── src/
│   ├── components/
│   │   └── InputForm.tsx              # Bond input form with validation
│   ├── screens/
│   │   └── HomeScreen.tsx             # Main results display screen
│   ├── types/
│   │   └── bond.ts                    # TypeScript type definitions
│   └── utils/
│       └── bondCalculations.ts        # Bond calculation functions
├── __tests__/                          # Test files
│   ├── components/
│   │   └── InputForm.test.ts
│   ├── screens/
│   │   └── HomeScreen.test.ts
│   ├── types/
│   │   └── bond.test.ts
│   └── utils/
│       └── bondCalculations.test.ts
├── jest.config.js                     # Jest configuration
├── jest.setup.js                      # Jest setup file
├── tsconfig.json                      # TypeScript configuration
├── App.tsx                            # Root app component
├── index.ts                           # Entry point
├── app.json                           # Expo configuration
├── package.json                       # Dependencies and scripts
└── README.md                          # This file
```

## 🔧 Technologies & Dependencies

### Core

- **React Native 0.83.2** - Cross-platform mobile framework
- **TypeScript 5.9.2** - Static typing for JavaScript
- **Expo 55.0.7** - React Native development platform

### UI & Styling

- **react-native-safe-area-context** - Safe area utilities for notches/cutouts
- **React Native StyleSheet** - Component styling

### Testing

- **Jest 29.7.0** - JavaScript testing framework
- **ts-jest 29.1.1** - TypeScript support for Jest
- **@testing-library/react-native** - React Native component testing

### Development

- **@react-native-async-storage/async-storage** - Local storage
- **expo-status-bar** - Status bar utilities

## 📊 Bond Calculations Explained

### Current Yield

```
Current Yield = (Annual Coupon Payment / Market Price) × 100%
```

### Yield to Maturity (YTM)

Uses Newton-Raphson numerical method to solve for the discount rate that equates bond price to present value of cash flows.

### Total Interest Earned

```
Total Interest = (Total Coupon Payments) + (Face Value - Market Price)
```

### Bond Status

- **Par**: Market Price = Face Value
- **Premium**: Market Price > Face Value
- **Discount**: Market Price < Face Value

## 🧪 Testing

The project includes 60+ comprehensive tests covering:

### Unit Tests

- Bond calculation functions
- Validation logic
- Type definitions
- Date formatting

### Integration Tests

- Component interaction flows
- Form submission and validation
- Results display with calculations

### Test Patterns

- Snapshot testing for UI components
- Mock testing for external dependencies
- Edge case and error scenario coverage

**Test Results:**

```
Test Suites: 4 passed, 4 total
Tests:       60 passed, 60 total
Time:        ~1.4s
```

## 🎨 UI/UX Features

### Input Form

- Clean, intuitive field layout
- Real-time validation with helpful error messages
- Visual indicators for valid/invalid fields
- Example values in error messages
- Clear button for resetting form

### Results Display

- Color-coded bond status (Green=Par, Orange=Premium, Red=Discount)
- Card-based layout for each metric
- Professional typography and spacing
- Auto-scroll to results after calculation

### Cash Flow Table

- Banking application-grade styling
- Dark blue header with white text
- Professional color scheme (#1a3a52)
- Alternating row backgrounds for readability
- Right-aligned currency values
- Totals row with financial summaries
- Responsive column sizing for mobile

## 🔍 Input Validation

All inputs are validated with clear, contextual error messages:

| Field        | Validation                | Error Message                                      |
| ------------ | ------------------------- | -------------------------------------------------- |
| Face Value   | Required, positive number | "Enter the bond's par value (e.g., 1000)"          |
| Coupon Rate  | Required, 0-100           | "Enter annual coupon rate as percentage (e.g., 5)" |
| Market Price | Required, positive number | "Enter current market price (e.g., 950)"           |
| Years        | Required, 0.25-100        | "Years must be between 0.25 and 100"               |
| Frequency    | Required                  | "Select payment frequency"                         |

## 🚦 Error Handling

The app handles edge cases including:

- Negative or missing values
- Invalid number formats
- Extreme input ranges
- Zero market price
- Invalid payment frequencies

## 📱 Platform Support

- **iOS** 13+
- **Android** 6.0+
- **Web** (via Expo Web)

## 🔐 Type Safety

The project uses comprehensive TypeScript types:

```typescript
// Bond input parameters
type BondInput = {
  faceValue: number;
  couponRate: number;
  marketPrice: number;
  years: number;
  frequency: PaymentFrequency;
};

// Calculation results
type BondResult = {
  currentYield: number;
  ytm: number;
  totalInterest: number;
  status: "Premium" | "Discount" | "Par";
  faceValue?: number;
  cashFlows?: CashFlow[];
};

// Cash flow details
type CashFlow = {
  period: number;
  paymentDate: string;
  couponPayment: number;
  cumulativeInterest: number;
  remainingPrincipal: number;
};
```

## 📈 Performance Considerations

- **YTM Calculation**: Uses Newton-Raphson method with ~1000 iterations for accuracy
- **Memory Optimization**: Efficient cash flow generation for long-term bonds
- **UI Rendering**: Optimized flat list rendering for large cash flow schedules
- **Validation**: Real-time validation without blocking UI

## 🔮 Future Enhancements

- [ ] Bond price calculator (inverse calculation)
- [ ] Historical data integration
- [ ] Portfolio comparison tools
- [ ] Export to PDF/CSV functionality
- [ ] Multiple bond comparison
- [ ] Dark mode support
- [ ] Biometric authentication
- [ ] Cloud storage for saved bonds
- [ ] Advanced analytics and charts
- [ ] Real-time market data integration

## 🐛 Known Limitations

- YTM calculation may converge slowly for unusual bond parameters
- Cash flow table optimized for bonds up to 50 years
- Date formatting based on device locale
- Mobile-optimized for vertical orientation

## 📝 Code Examples

### Calculate Bond Metrics

```typescript
import {
  calculateCurrentYield,
  calculateYTM,
  calculateTotalInterest,
  getBondStatus,
  calculateCashFlows,
} from "./utils/bondCalculations";

const currentYield = calculateCurrentYield(1000, 5, 950);
// Returns: 0.0526 (5.26%)

const ytm = calculateYTM(1000, 5, 950, 10, 1);
// Returns: YTM percentage

const totalInterest = calculateTotalInterest(1000, 5, 10, 1);
// Returns: Total interest earned

const status = getBondStatus(1000, 950);
// Returns: "Discount"

const cashFlows = calculateCashFlows(1000, 5, 10, 1);
// Returns: Array of CashFlow objects
```

### Validate Bond Input

```typescript
import InputForm from './components/InputForm';

const handleCalculate = (bondData: BondInput) => {
  // Form validation happens automatically
  // Only valid data reaches this handler
  console.log('Valid bond data:', bondData);
};

// Use InputForm component with validation
<InputForm onCalculate={handleCalculate} />
```

## 📞 Support & Contributions

For issues, questions, or contributions, please refer to the project repository.

## 📄 License

This project is available for educational and commercial use.

## 🙏 Acknowledgments

Built with React Native, Expo, and TypeScript for accurate bond yield analysis.

---

**Last Updated**: March 2026
**Version**: 1.0.0
**Status**: Production Ready ✅

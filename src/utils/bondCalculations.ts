import { CashFlow } from "../types/bond";
export const calculateCurrentYield = (
  faceValue: number,
  couponRate: number,
  marketPrice: number
) => ((faceValue * couponRate) / 100) / marketPrice;

export const calculateTotalInterest = (
  faceValue: number,
  couponRate: number,
  years: number,
  frequency: number
) => ((faceValue * couponRate) / 100 / frequency) * years * frequency;

export const getBondStatus = (faceValue: number, marketPrice: number) => {
  if (marketPrice > faceValue) return "Premium";
  if (marketPrice < faceValue) return "Discount";
  return "Par";
};

export const calculateYTM = (
  faceValue: number,
  couponRate: number,
  marketPrice: number,
  years: number,
  frequency: number
): number => {
  const annualCoupon = (faceValue * couponRate) / 100;
  const couponPayment = annualCoupon / frequency;
  const periods = years * frequency;
  
  let ytm = couponRate / 100;
  
  for (let i = 0; i < 1000; i++) {
    const yieldPerPeriod = ytm / frequency;
    
    let bondPrice = 0;
    for (let t = 1; t <= periods; t++) {
      bondPrice += couponPayment / Math.pow(1 + yieldPerPeriod, t);
    }
    bondPrice += faceValue / Math.pow(1 + yieldPerPeriod, periods);
    
    let derivative = 0;
    for (let t = 1; t <= periods; t++) {
      derivative -= (t * couponPayment) / (frequency * Math.pow(1 + yieldPerPeriod, t + 1));
    }
    derivative -= (periods * faceValue) / (frequency * Math.pow(1 + yieldPerPeriod, periods + 1));
    
    const ytmChange = (bondPrice - marketPrice) / derivative;
    ytm -= ytmChange;
    
    if (Math.abs(ytmChange) < 1e-6) break;
  }
  
  return ytm;
};
export const calculateCashFlows = (
  faceValue: number,
  couponRate: number,
  years: number,
  frequency: number
): CashFlow[] => {
  const annualCoupon = (faceValue * couponRate) / 100;
  const couponPayment = annualCoupon / frequency;
  const cashFlows: CashFlow[] = [];
  let cumulativeInterest = 0;
  let remainingPrincipal = faceValue;

  for (let i = 1; i <= years * frequency; i++) {
    const paymentDate = new Date();
    paymentDate.setMonth(paymentDate.getMonth() + (12 / frequency) * i);
    cumulativeInterest += couponPayment;

    cashFlows.push({
      period: i,
      paymentDate: paymentDate.toLocaleDateString(),
      couponPayment,
      cumulativeInterest,
      remainingPrincipal,
    });
  }

  return cashFlows;
};
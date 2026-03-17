export type BondInput = {
  faceValue: number;
  couponRate: number;
  marketPrice: number;
  years: number;
  frequency: PaymentFrequency; // 1 = annual, 2 = semi-annual
};
export enum PaymentFrequency {
  Annual = 1,
  SemiAnnual = 2,
}

export type BondResult = {
  currentYield: number;
  ytm: number;
  totalInterest: number;
  status: "Premium" | "Discount" | "Par";
  faceValue?: number;
  cashFlows?: CashFlow[];
};

export type CashFlow = {
  period: number;
  paymentDate: string;
  couponPayment: number;
  cumulativeInterest: number;
  remainingPrincipal: number;
};
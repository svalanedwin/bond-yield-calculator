import React, { useState, useRef } from "react";
import { View, StyleSheet, ScrollView, Text } from "react-native";
import { BondInput, BondResult } from "../types/bond";
import InputForm from "../components/InputForm";
import {
  calculateCurrentYield,
  calculateTotalInterest,
  calculateYTM,
  getBondStatus,
  calculateCashFlows,
} from "../utils/bondCalculations";

export default function HomeScreen() {
  const [results, setResults] = useState<BondResult | null>(null);
  const scrollViewRef = useRef<ScrollView>(null);
  const resultsRef = useRef<View>(null);

  const handleCalculate = (data: BondInput) => {
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
    const cashFlows = calculateCashFlows(data.faceValue, data.couponRate, data.years, data.frequency);

    setResults({
      currentYield,
      ytm,
      totalInterest,
      status,
      faceValue: data.faceValue,
      cashFlows,
    });

    // Scroll to the results section after state updates
    setTimeout(() => {
      resultsRef.current?.measureLayout(
        scrollViewRef.current as any,
        (x: number, y: number) => {
          scrollViewRef.current?.scrollTo({ y, animated: true });
        },
        () => {
          // Fallback: scroll to a reasonable position
          scrollViewRef.current?.scrollTo({ y: 500, animated: true });
        }
      );
    }, 100);
  };

  return (
    <ScrollView ref={scrollViewRef} style={styles.container}>
      <InputForm onCalculate={handleCalculate} />

      {results && (
        <View ref={resultsRef} style={styles.resultsContainer}>
          <Text style={styles.resultsTitle}>Bond Analysis Results</Text>

          <View style={styles.resultCard}>
            <Text style={styles.resultLabel}>Bond Status</Text>
            <Text style={[styles.resultValue, getStatusColor(results.status)]}>
              {results.status}
            </Text>
          </View>

          <View style={styles.resultCard}>
            <Text style={styles.resultLabel}>Current Yield</Text>
            <Text style={styles.resultValue}>
              {(results.currentYield * 100).toFixed(2)}%
            </Text>
          </View>

          <View style={styles.resultCard}>
            <Text style={styles.resultLabel}>Yield to Maturity (YTM)</Text>
            <Text style={styles.resultValue}>
              {(results.ytm * 100).toFixed(2)}%
            </Text>
          </View>

          <View style={styles.resultCard}>
            <Text style={styles.resultLabel}>Total Interest Earned</Text>
            <Text style={styles.resultValue}>
              ${results.totalInterest.toFixed(2)}
            </Text>
          </View>

          <Text style={styles.cashFlowTitle}>💰 Cash Flow Schedule</Text>
          {results.cashFlows && results.cashFlows.length > 0 ? (
            <View style={styles.cashFlowContainer}>
              <View style={styles.cashFlowTable}>
                <View style={styles.cashFlowHeader}>
                  <Text style={[styles.cashFlowHeaderText, { flex: 0.8, textAlign: "center" }]}>Period</Text>
                  <Text style={[styles.cashFlowHeaderText, { flex: 1.2, textAlign: "left" }]}>Date</Text>
                  <Text style={[styles.cashFlowHeaderText, { flex: 1, textAlign: "right" }]}>Coupon</Text>
                  <Text style={[styles.cashFlowHeaderText, { flex: 1.2, textAlign: "right" }]}>Cum. Int.</Text>
                  <Text style={[styles.cashFlowHeaderText, { flex: 1.2, textAlign: "right" }]}>Principal</Text>
                </View>
                {results.cashFlows.map((flow, index) => (
                  <View key={flow.period} style={[styles.cashFlowRow, index % 2 === 0 && styles.cashFlowRowAlt]}>
                    <Text style={[styles.cashFlowCell, { flex: 0.8, textAlign: "center", fontWeight: "600" }]}>{flow.period}</Text>
                    <Text style={[styles.cashFlowCell, { flex: 1.2, textAlign: "left", fontSize: 11, color: "#666" }]}>{flow.paymentDate}</Text>
                    <Text style={[styles.cashFlowCell, { flex: 1, textAlign: "right", fontWeight: "600", color: "#007AFF" }]}>${flow.couponPayment.toFixed(2)}</Text>
                    <Text style={[styles.cashFlowCell, { flex: 1.2, textAlign: "right", fontWeight: "600" }]}>${flow.cumulativeInterest.toFixed(2)}</Text>
                    <Text style={[styles.cashFlowCell, { flex: 1.2, textAlign: "right", fontWeight: "600", color: "#34C759" }]}>${flow.remainingPrincipal.toFixed(2)}</Text>
                  </View>
                ))}
                <View style={styles.cashFlowFooter}>
                  <Text style={[styles.cashFlowFooterText, { flex: 0.8, textAlign: "center" }]}>Total</Text>
                  <Text style={[styles.cashFlowFooterText, { flex: 1.2 }]}></Text>
                  <Text style={[styles.cashFlowFooterText, { flex: 1, textAlign: "right" }]}>
                    ${results.cashFlows.reduce((sum, flow) => sum + flow.couponPayment, 0).toFixed(2)}
                  </Text>
                  <Text style={[styles.cashFlowFooterText, { flex: 1.2, textAlign: "right" }]}>
                    ${results.totalInterest.toFixed(2)}
                  </Text>
                  <Text style={[styles.cashFlowFooterText, { flex: 1.2, textAlign: "right" }]}>
                    ${results.faceValue ? results.faceValue.toFixed(2) : "0.00"}
                  </Text>
                </View>
              </View>
            </View>
          ) : (
            <Text style={styles.noCashFlowText}>📊 Cash flow data not available</Text>
          )}
        </View>
      )}
    </ScrollView>
  );
}

const getStatusColor = (status: string) => {
  switch (status) {
    case "Premium":
      return { color: "#FF9500" };
    case "Discount":
      return { color: "#FF3B30" };
    case "Par":
      return { color: "#34C759" };
    default:
      return { color: "#333" };
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  resultsContainer: {
    marginTop: 30,
    paddingBottom: 20,
  },
  resultsTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 20,
  },
  resultCard: {
    backgroundColor: "#f9f9f9",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderLeftWidth: 4,
    borderLeftColor: "#007AFF",
  },
  resultLabel: {
    fontSize: 14,
    color: "#666",
    marginBottom: 6,
    fontWeight: "500",
  },
  resultValue: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
  },
  cashFlowTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1a1a1a",
    marginVertical: 20,
  },
  cashFlowContainer: {
    borderRadius: 12,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#e8e8e8",
  },
  cashFlowTable: {
    backgroundColor: "#fff",
  },
  cashFlowHeader: {
    flexDirection: "row",
    backgroundColor: "#1a3a52",
    paddingVertical: 14,
    paddingHorizontal: 12,
  },
  cashFlowHeaderText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 12,
    letterSpacing: 0.3,
  },
  cashFlowRow: {
    flexDirection: "row",
    paddingVertical: 14,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#efefef",
    backgroundColor: "#fff",
  },
  cashFlowRowAlt: {
    backgroundColor: "#f8f9fa",
  },
  cashFlowCell: {
    fontSize: 13,
    color: "#333",
  },
  cashFlowFooter: {
    flexDirection: "row",
    paddingVertical: 14,
    paddingHorizontal: 12,
    backgroundColor: "#f0f5fa",
    borderTopWidth: 2,
    borderTopColor: "#1a3a52",
  },
  cashFlowFooterText: {
    fontSize: 13,
    fontWeight: "bold",
    color: "#1a3a52",
  },
  noCashFlowText: {
    fontSize: 14,
    color: "#999",
    fontStyle: "italic",
    marginBottom: 20,
  },
});
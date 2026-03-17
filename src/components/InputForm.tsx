import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { BondInput } from "../types/bond";

interface InputFormProps {
  onCalculate: (data: BondInput) => void;
}

interface ValidationErrors {
  faceValue?: string;
  couponRate?: string;
  marketPrice?: string;
  years?: string;
}

export default function InputForm({ onCalculate }: InputFormProps) {
  const [faceValue, setFaceValue] = useState("");
  const [couponRate, setCouponRate] = useState("");
  const [marketPrice, setMarketPrice] = useState("");
  const [years, setYears] = useState("");
  const [frequency, setFrequency] = useState("2");
  const [errors, setErrors] = useState<ValidationErrors>({});

  const validateInputs = (): boolean => {
    const newErrors: ValidationErrors = {};

    // Face Value validation
    if (!faceValue.trim()) {
      newErrors.faceValue = "⚠ Face Value is required. Enter the bond's par value (e.g., 1000)";
    } else {
      const fv = parseFloat(faceValue);
      if (isNaN(fv)) {
        newErrors.faceValue = "❌ Please enter a valid number for Face Value";
      } else if (fv <= 0) {
        newErrors.faceValue = "❌ Face Value must be a positive number (greater than 0)";
      } else if (fv > 1000000) {
        newErrors.faceValue = "⚠ Face Value exceeds typical bond values. Please verify the amount";
      }
    }

    // Coupon Rate validation
    if (!couponRate.trim()) {
      newErrors.couponRate = "⚠ Coupon Rate is required. Enter as a percentage (e.g., 5.5)";
    } else {
      const cr = parseFloat(couponRate);
      if (isNaN(cr)) {
        newErrors.couponRate = "❌ Please enter a valid number for Coupon Rate";
      } else if (cr < 0) {
        newErrors.couponRate = "❌ Coupon Rate cannot be negative";
      } else if (cr > 100) {
        newErrors.couponRate = "⚠ Coupon Rate exceeds 100%. Please verify the percentage";
      }
    }

    // Market Price validation
    if (!marketPrice.trim()) {
      newErrors.marketPrice = "⚠ Market Price is required. Enter the current bond price (e.g., 950)";
    } else {
      const mp = parseFloat(marketPrice);
      if (isNaN(mp)) {
        newErrors.marketPrice = "❌ Please enter a valid number for Market Price";
      } else if (mp <= 0) {
        newErrors.marketPrice = "❌ Market Price must be a positive number (greater than 0)";
      } else if (mp > 1000000) {
        newErrors.marketPrice = "⚠ Market Price exceeds typical bond values. Please verify the amount";
      }
    }

    // Years validation
    if (!years.trim()) {
      newErrors.years = "⚠ Years to Maturity is required. Enter the number of years (e.g., 10)";
    } else {
      const y = parseFloat(years);
      if (isNaN(y)) {
        newErrors.years = "❌ Please enter a valid number for Years to Maturity";
      } else if (y <= 0) {
        newErrors.years = "❌ Years to Maturity must be a positive number (greater than 0)";
      } else if (y > 100) {
        newErrors.years = "⚠ Years to Maturity exceeds 100 years. Please verify the duration";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCalculate = () => {
    if (!validateInputs()) {
      return;
    }

    const bondData: BondInput = {
      faceValue: parseFloat(faceValue),
      couponRate: parseFloat(couponRate),
      marketPrice: parseFloat(marketPrice),
      years: parseFloat(years),
      frequency: parseInt(frequency),
    };

    onCalculate(bondData);
    setErrors({});
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>Bond Yield Calculator</Text>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Face Value ($)</Text>
          <TextInput
            style={[styles.input, errors.faceValue && styles.inputError]}
            placeholder="e.g., 1000"
            keyboardType="decimal-pad"
            value={faceValue}
            onChangeText={setFaceValue}
            placeholderTextColor="#999"
          />
          {errors.faceValue && (
            <Text style={styles.errorText}>{errors.faceValue}</Text>
          )}
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Coupon Rate (%)</Text>
          <TextInput
            style={[styles.input, errors.couponRate && styles.inputError]}
            placeholder="e.g., 5.5"
            keyboardType="decimal-pad"
            value={couponRate}
            onChangeText={setCouponRate}
            placeholderTextColor="#999"
          />
          {errors.couponRate && (
            <Text style={styles.errorText}>{errors.couponRate}</Text>
          )}
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Market Price ($)</Text>
          <TextInput
            style={[styles.input, errors.marketPrice && styles.inputError]}
            placeholder="e.g., 950"
            keyboardType="decimal-pad"
            value={marketPrice}
            onChangeText={setMarketPrice}
            placeholderTextColor="#999"
          />
          {errors.marketPrice && (
            <Text style={styles.errorText}>{errors.marketPrice}</Text>
          )}
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Years to Maturity</Text>
          <TextInput
            style={[styles.input, errors.years && styles.inputError]}
            placeholder="e.g., 10"
            keyboardType="decimal-pad"
            value={years}
            onChangeText={setYears}
            placeholderTextColor="#999"
          />
          {errors.years && (
            <Text style={styles.errorText}>{errors.years}</Text>
          )}
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Payment Frequency</Text>
          <View style={styles.frequencyContainer}>
            <TouchableOpacity
              style={[
                styles.frequencyButton,
                frequency === "1" && styles.frequencyButtonActive,
              ]}
              onPress={() => setFrequency("1")}
            >
              <Text
                style={[
                  styles.frequencyButtonText,
                  frequency === "1" && styles.frequencyButtonTextActive,
                ]}
              >
                Annual
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.frequencyButton,
                frequency === "2" && styles.frequencyButtonActive,
              ]}
              onPress={() => setFrequency("2")}
            >
              <Text
                style={[
                  styles.frequencyButtonText,
                  frequency === "2" && styles.frequencyButtonTextActive,
                ]}
              >
                Semi-Annual
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity
          style={styles.calculateButton}
          onPress={handleCalculate}
        >
          <Text style={styles.calculateButtonText}>Calculate Yield</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 30,
    textAlign: "center",
  },
  formGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 8,
  },
  input: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#ddd",
    color: "#333",
  },
  frequencyContainer: {
    flexDirection: "row",
    gap: 10,
  },
  frequencyButton: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 12,
    borderWidth: 1,
    borderColor: "#ddd",
    alignItems: "center",
  },
  frequencyButtonActive: {
    backgroundColor: "#007AFF",
    borderColor: "#007AFF",
  },
  frequencyButtonText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
  },
  frequencyButtonTextActive: {
    color: "#fff",
  },
  calculateButton: {
    backgroundColor: "#007AFF",
    borderRadius: 8,
    padding: 16,
    marginTop: 30,
    alignItems: "center",
  },
  calculateButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  inputError: {
    borderColor: "#FF3B30",
    borderWidth: 1.5,
  },
  errorText: {
    color: "#FF3B30",
    fontSize: 12,
    fontWeight: "500",
    marginTop: 4,
  },
});

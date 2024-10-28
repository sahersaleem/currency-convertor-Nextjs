"use client";

import { useState, useEffect, ChangeEvent } from "react"; // Import React hooks and types
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card"; // Import custom Card components
import { Label } from "@/components/ui/label"; // Import custom Label component
import { Input } from "@/components/ui/input"; // Import custom Input component
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectItem,
} from "@/components/ui/select"; // Import custom Select components
import { Button } from "@/components/ui/button";

// Currency type alias
type Currency = "USD" | "EUR" | "GBP" | "JPY" | "AUD" | "CAD" | "PKR";
type ExchangeRates = { [key: string]: number };

const CurrencyConvertor = () => {
  const [amount, setAmount] = useState<number>(0);
  const [sourceCurrency, setSourceCurrency] = useState<Currency>("USD");
  const [targetCurrency, setTargetCurrency] = useState<Currency>("USD");
  const [exchangeRates, setExchangeRates] = useState<ExchangeRates>({});
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<null | string>(null);
  const [convertedAmount, setConvertedAmount] = useState(0);

  useEffect(() => {
    const fetchExchangeRates = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch(
          "https://api.exchangerate-api.com/v4/latest/USD"
        );
        const data = await response.json();
        setExchangeRates(data.rates);
      } catch (error: any) {
        setError("Error occured while fetching data");
        console.log(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchExchangeRates();
  }, []);

  const handleAmountChange = (e: ChangeEvent<HTMLInputElement>) => {
    setAmount(parseFloat(e.target.value));
  };

  const handleSourceCurrencyChange = (value: Currency) => {
    setSourceCurrency(value);
  };

  const handleTargetCurrencyChange = (value: Currency) => {
    setTargetCurrency(value);
  };

  const handleCalculateAmount = () => {
    if (sourceCurrency && targetCurrency && exchangeRates && amount) {
      const rates =
        sourceCurrency === "USD"
          ? exchangeRates[targetCurrency]
          : exchangeRates[sourceCurrency] / exchangeRates[targetCurrency];

      const result = amount * rates;
      setConvertedAmount(parseInt(result.toFixed(2)));
    }
  };

  return (
    <Card className="card">
      <CardHeader>
        <CardTitle className="heading">Currency Convertor</CardTitle>
        <CardDescription>Convert between different currencies</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="card-content">
          <Label className="heading2">From</Label>
          <Input
            type="string"
            value={amount || ""}
            onChange={handleAmountChange}
            placeholder="Enter amount to convert"
          />
        </div>
        <div className="card-content">
          <Label className="heading2">To</Label>
          <div className="text">{convertedAmount}</div>
        </div>
        <div className="select">
        <div >
          <Select
            value={sourceCurrency}
            onValueChange={handleSourceCurrencyChange}
          >
            <SelectTrigger>
              <SelectValue placeholder="USD"></SelectValue>
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="USD">USD</SelectItem>
                <SelectItem value="EUR">EUR</SelectItem>
                <SelectItem value="GBP">GBP</SelectItem>
                <SelectItem value="JPY">JPY</SelectItem>
                <SelectItem value="AUD">CAD</SelectItem>
                <SelectItem value="PKR">PKR</SelectItem>
                <SelectItem value="CAD">CAD</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          </div>
<div>
          <Select
            value={targetCurrency}
            onValueChange={handleTargetCurrencyChange}
          >
            <SelectTrigger>
              <SelectValue placeholder="USD"></SelectValue>
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="USD">USD</SelectItem>
                <SelectItem value="EUR">EUR</SelectItem>
                <SelectItem value="GBP">GBP</SelectItem>
                <SelectItem value="JPY">JPY</SelectItem>
                <SelectItem value="AUD">CAD</SelectItem>
                <SelectItem value="PKR">PKR</SelectItem>
                <SelectItem value="CAD">CAD</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          </div>
        </div>
      </CardContent>
      <Button onClick={handleCalculateAmount}>Calculate Amount</Button>
    </Card>
  );
};

export default CurrencyConvertor;

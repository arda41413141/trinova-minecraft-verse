
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { COIN_STORAGE_KEY } from "../types";

interface CoinTransaction {
  id: string;
  amount: number;
  type: "purchase" | "usage";
  description: string;
  date: Date;
}

export const useCoinBalance = () => {
  const [coinBalance, setCoinBalance] = useState<number>(0);
  const [transactions, setTransactions] = useState<CoinTransaction[]>([]);

  // Load coins and transactions from localStorage
  useEffect(() => {
    // Load coin balance
    const storedCoins = localStorage.getItem(COIN_STORAGE_KEY);
    if (storedCoins) {
      try {
        setCoinBalance(JSON.parse(storedCoins));
      } catch (error) {
        localStorage.removeItem(COIN_STORAGE_KEY);
      }
    }

    // Load transaction history
    const storedTransactions = localStorage.getItem("trinova_coin_transactions");
    if (storedTransactions) {
      try {
        const parsedTransactions = JSON.parse(storedTransactions);
        // Convert date strings back to Date objects
        const formattedTransactions = parsedTransactions.map((tx: any) => ({
          ...tx,
          date: new Date(tx.date)
        }));
        setTransactions(formattedTransactions);
      } catch (error) {
        localStorage.removeItem("trinova_coin_transactions");
      }
    }
  }, []);

  // Update localStorage when coins or transactions change
  useEffect(() => {
    localStorage.setItem(COIN_STORAGE_KEY, JSON.stringify(coinBalance));
  }, [coinBalance]);

  useEffect(() => {
    localStorage.setItem("trinova_coin_transactions", JSON.stringify(transactions));
  }, [transactions]);

  const addTransaction = (transaction: Omit<CoinTransaction, 'id' | 'date'>) => {
    const newTransaction = {
      ...transaction,
      id: `tx-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      date: new Date()
    };

    setTransactions(prev => [newTransaction, ...prev]);
  };

  const addCoins = (amount: number, description: string = "Coin satın alındı") => {
    setCoinBalance(prev => prev + amount);
    addTransaction({
      amount,
      type: "purchase",
      description
    });
    toast.success(`${amount} Coin hesabınıza eklendi`);
  };

  const useCoins = (amount: number, description: string = "Coin kullanıldı"): boolean => {
    if (coinBalance >= amount) {
      setCoinBalance(prev => prev - amount);
      addTransaction({
        amount,
        type: "usage",
        description
      });
      toast.info(`${amount} Coin kullanıldı`);
      return true;
    } else {
      toast.error("Yetersiz coin bakiyesi");
      return false;
    }
  };

  return {
    coinBalance,
    transactions,
    addCoins,
    useCoins
  };
};

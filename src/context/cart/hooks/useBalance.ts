
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { BALANCE_STORAGE_KEY } from "../types";

interface BalanceTransaction {
  id: string;
  amount: number;
  type: "purchase" | "usage";
  description: string;
  date: Date;
}

export const useBalanceHook = () => {
  const [balance, setBalance] = useState<number>(0);
  const [transactions, setTransactions] = useState<BalanceTransaction[]>([]);

  // Load balance and transactions from localStorage
  useEffect(() => {
    // Load balance
    const storedBalance = localStorage.getItem(BALANCE_STORAGE_KEY);
    if (storedBalance) {
      try {
        setBalance(JSON.parse(storedBalance));
      } catch (error) {
        localStorage.removeItem(BALANCE_STORAGE_KEY);
      }
    }

    // Load transaction history
    const storedTransactions = localStorage.getItem("trinova_balance_transactions");
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
        localStorage.removeItem("trinova_balance_transactions");
      }
    }
  }, []);

  // Update localStorage when balance or transactions change
  useEffect(() => {
    localStorage.setItem(BALANCE_STORAGE_KEY, JSON.stringify(balance));
  }, [balance]);

  useEffect(() => {
    localStorage.setItem("trinova_balance_transactions", JSON.stringify(transactions));
  }, [transactions]);

  const addTransaction = (transaction: Omit<BalanceTransaction, 'id' | 'date'>) => {
    const newTransaction = {
      ...transaction,
      id: `tx-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      date: new Date()
    };

    setTransactions(prev => [newTransaction, ...prev]);
  };

  const addBalance = (amount: number, description: string = "Bakiye yüklendi") => {
    setBalance(prev => prev + amount);
    addTransaction({
      amount,
      type: "purchase",
      description
    });
    toast.success(`${amount} TL bakiyenize eklendi`);
  };

  const useBalance = (amount: number, description: string = "Bakiye kullanıldı"): boolean => {
    if (balance >= amount) {
      setBalance(prev => prev - amount);
      addTransaction({
        amount,
        type: "usage",
        description
      });
      toast.info(`${amount} TL bakiyenizden kullanıldı`);
      return true;
    } else {
      toast.error("Yetersiz bakiye");
      return false;
    }
  };

  return {
    balance,
    transactions,
    addBalance,
    useBalance
  };
};

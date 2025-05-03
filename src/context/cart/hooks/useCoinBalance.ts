
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { COIN_STORAGE_KEY } from "../types";

export const useCoinBalance = () => {
  const [coinBalance, setCoinBalance] = useState<number>(0);

  // Load coins from localStorage
  useEffect(() => {
    const storedCoins = localStorage.getItem(COIN_STORAGE_KEY);
    
    if (storedCoins) {
      try {
        setCoinBalance(JSON.parse(storedCoins));
      } catch (error) {
        localStorage.removeItem(COIN_STORAGE_KEY);
      }
    }
  }, []);

  // Update localStorage when coins change
  useEffect(() => {
    localStorage.setItem(COIN_STORAGE_KEY, JSON.stringify(coinBalance));
  }, [coinBalance]);

  const addCoins = (amount: number) => {
    setCoinBalance(prev => prev + amount);
    toast.success(`${amount} Coin hesabınıza eklendi`);
  };

  const useCoins = (amount: number): boolean => {
    if (coinBalance >= amount) {
      setCoinBalance(prev => prev - amount);
      toast.info(`${amount} Coin kullanıldı`);
      return true;
    } else {
      toast.error("Yetersiz coin bakiyesi");
      return false;
    }
  };

  return {
    coinBalance,
    addCoins,
    useCoins
  };
};

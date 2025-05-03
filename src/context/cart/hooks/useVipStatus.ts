
import { useState, useEffect } from "react";
import { VIP_STATUS_KEY } from "../types";

export const useVipStatus = () => {
  const [vipStatus, setVipStatus] = useState<string | null>(null);

  // Load VIP status from localStorage
  useEffect(() => {
    const storedVipStatus = localStorage.getItem(VIP_STATUS_KEY);
    
    if (storedVipStatus) {
      try {
        setVipStatus(JSON.parse(storedVipStatus));
      } catch (error) {
        localStorage.removeItem(VIP_STATUS_KEY);
      }
    }
  }, []);

  // Update localStorage when VIP status changes
  useEffect(() => {
    if (vipStatus) {
      localStorage.setItem(VIP_STATUS_KEY, JSON.stringify(vipStatus));
    }
  }, [vipStatus]);

  return {
    vipStatus,
    setVipStatus
  };
};

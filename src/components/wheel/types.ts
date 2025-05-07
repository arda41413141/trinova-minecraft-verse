
import { ReactNode } from "react";

export interface WheelSegment {
  id: string;
  name: string;
  color: string;
  gradient: string;
  icon: ReactNode;
  chance: number;
  description: string;
}

export const SPIN_COST = 50; // Cost in TL to spin the wheel

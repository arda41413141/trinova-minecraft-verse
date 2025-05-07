
import { Percent, Wallet, Crown } from "lucide-react";
import { WheelSegment } from "./types";

export const wheelSegments: WheelSegment[] = [
  {
    id: "discount5",
    name: "5% İndirim",
    color: "from-blue-600 to-blue-800",
    gradient: "linear-gradient(135deg, #60a5fa, #1e40af)",
    icon: <Percent size={24} className="text-white" />,
    chance: 30,
    description: "Tüm alışverişlerinizde 5% indirim"
  },
  {
    id: "discount10",
    name: "10% İndirim",
    color: "from-green-600 to-green-800",
    gradient: "linear-gradient(135deg, #4ade80, #15803d)",
    icon: <Percent size={24} className="text-white" />,
    chance: 20,
    description: "Tüm alışverişlerinizde 10% indirim"
  },
  {
    id: "discount15",
    name: "15% İndirim",
    color: "from-purple-600 to-purple-900",
    gradient: "linear-gradient(135deg, #a855f7, #6b21a8)",
    icon: <Percent size={24} className="text-white" />,
    chance: 15,
    description: "Tüm alışverişlerinizde 15% indirim"
  },
  {
    id: "balance100",
    name: "100 TL",
    color: "from-amber-500 to-amber-700",
    gradient: "linear-gradient(135deg, #f59e0b, #b45309)",
    icon: <Wallet size={24} className="text-white" />,
    chance: 25,
    description: "100 TL bakiye kazandınız!"
  },
  {
    id: "vipBasic",
    name: "VIP Paketi",
    color: "from-pink-600 to-rose-900",
    gradient: "linear-gradient(135deg, #ec4899, #881337)",
    icon: <Crown size={24} className="text-yellow-300" />,
    chance: 10, // Lowest chance
    description: "Temel VIP Paketi kazandınız!"
  },
];

"use client";

import { useTranslations } from "next-intl";
import { formatNumber } from "@/helper";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface StatsDetailProps {
  totalDamage: number;
  totalAV: number;
  damagePerAV: number;
  totalTurn: number;
}

export default function StatsDetail({
  totalDamage,
  totalAV,
  damagePerAV,
  totalTurn,
}: StatsDetailProps) {
  const transI18n = useTranslations("DataAnalysisPage");
  const [isHovering, setIsHovering] = useState<number | null>(null);

  const stats = [
    {
      id: 1,
      label: transI18n("totalDamage"),
      value: totalDamage,
      unit: "dmg",
      icon: "⚔️",
      gradient: "from-red-600 to-red-500",
      bgGradient: "from-red-600/10 to-red-500/5",
      borderColor: "border-red-500/20",
    },
    {
      id: 2,
      label: transI18n("totalAV"),
      value: totalAV,
      unit: "av",
      icon: "⚡",
      gradient: "from-blue-600 to-blue-500",
      bgGradient: "from-blue-600/10 to-blue-500/5",
      borderColor: "border-blue-500/20",
    },
    {
      id: 3,
      label: transI18n("damagePerAV"),
      value: damagePerAV,
      unit: "dmg/av",
      icon: "📊",
      gradient: "from-purple-600 to-purple-500",
      bgGradient: "from-purple-600/10 to-purple-500/5",
      borderColor: "border-purple-500/20",
    },
    {
      id: 4,
      label: transI18n("totalTurn"),
      value: totalTurn,
      unit: "turn",
      icon: "🔄",
      gradient: "from-amber-600 to-amber-500",
      bgGradient: "from-amber-600/10 to-amber-500/5",
      borderColor: "border-amber-500/20",
    },
  ];

  return (
    <div className="w-full mb-4">
      {/* Alternative compact single-row display */}
      <div className="flex flex-wrap gap-2 lg:gap-3">
        {stats.map((stat, idx) => (
          <motion.div
            key={stat.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: idx * 0.08 }}
            onMouseEnter={() => setIsHovering(stat.id)}
            onMouseLeave={() => setIsHovering(null)}
            className={`flex-1 min-w-[140px] lg:min-w-[160px] px-3 lg:px-4 py-2 lg:py-3 rounded-lg border-2 ${stat.borderColor} cursor-pointer transition-all duration-300 ${
              isHovering === stat.id
                ? `bg-gradient-to-br ${stat.bgGradient} shadow-lg scale-105`
                : `bg-gradient-to-br ${stat.bgGradient} shadow-md`
            }`}
          >
            <div className="flex items-center justify-between gap-2">
              <div className="flex-1">
                <p className={`text-xs lg:text-sm font-semibold bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent mb-1`}>
                  {stat.icon} {stat.label}
                </p>
                <div className="flex items-baseline gap-1">
                  <motion.span
                    key={`${stat.value}`}
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    className={`text-lg lg:text-2xl font-bold bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent`}
                  >
                    {formatNumber(stat.value, stat.id === 4 ? 0 : 1)}
                  </motion.span>
                  <span className={`text-xs bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent opacity-70`}>
                    {stat.unit}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

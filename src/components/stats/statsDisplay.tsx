"use client";

import { useTranslations } from "next-intl";
import { formatNumber } from "@/helper";

interface StatsDisplayProps {
  totalDamage: number;
  totalAV: number;
  damagePerAV: number;
  totalTurn: number;
}

export default function StatsDisplay({
  totalDamage,
  totalAV,
  damagePerAV,
  totalTurn,
}: StatsDisplayProps) {
  const transI18n = useTranslations("DataAnalysisPage");

  return (
    <div className="grid grid-cols-2 gap-2 mb-3">
      <div className="p-2 text-base lg:text-lg xl:text-xl rounded bg-primary text-primary-content text-center shadow-md">
        {transI18n("totalDamage")}
        <div>{formatNumber(totalDamage, 1)}</div>
      </div>
      <div className="p-2 text-base lg:text-lg xl:text-xl rounded bg-secondary text-secondary-content text-center shadow-md">
        {transI18n("totalAV")}
        <div>{formatNumber(totalAV, 1)}</div>
      </div>
      <div className="p-2 text-base lg:text-lg xl:text-xl rounded bg-accent text-accent-content text-center shadow-md">
        {transI18n("damagePerAV")}
        <div>{formatNumber(damagePerAV, 1)}</div>
      </div>
      <div className="p-2 text-base lg:text-lg xl:text-xl rounded bg-warning text-warning-content text-center shadow-md">
        {transI18n("totalTurn")}
        <div>{totalTurn}</div>
      </div>
    </div>
  );
}

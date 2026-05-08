"use client";

import { getNameChar, formatNumber } from '@/helper';
import useLocaleStore from '@/stores/localeStore';
import { CharacterBasic } from '@/types';
import NameAvatar from '../nameAvatar';
import useBattleDataStore from '@/stores/battleDataStore';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

interface CharacterCardProps {
  data: CharacterBasic
}

export default function CharacterCard({ data }: CharacterCardProps) {
  const { locale } = useLocaleStore();
  const { avatarDetail } = useBattleDataStore()
  const transI18n = useTranslations("DataAnalysisPage");
  const text = getNameChar(locale, transI18n, data)

  return (
    <li className="z-10 flex flex-col w-28 items-center p-1 rounded-md shadow-lg bg-linear-to-b from-customStart to-customEnd transform transition-transform duration-300 hover:scale-105 m-1">
      <div
        className={`w-20 rounded-md p-0.5 bg-linear-to-br ${data.rank === "CombatPowerAvatarRarityType5"
          ? "from-yellow-400 via-yellow-300 to-yellow-500"
          : "from-purple-300 via-purple-200 to-purple-400"
          }`}
      >

        <div className="relative w-full h-full">
          <Image
            width={376}
            height={512}
            unoptimized
            crossOrigin="anonymous"
            src={`${process.env.CDN_URL}/${data.icon}`}
            className="w-full h-full rounded-md object-cover"
            alt="ALT"
          />
          <Image
            width={48}
            height={48}
            unoptimized
            crossOrigin="anonymous"
            src={`/icon/${data?.damageType?.toLowerCase()}.webp`}
            className="absolute top-0 left-0 w-6 h-6"
            alt={data?.damageType?.toLowerCase()}
          />
          <Image
            width={48}
            height={48}
            unoptimized
            crossOrigin="anonymous"
            src={`/icon/${data.baseType.toLowerCase()}.webp`}
            className="absolute top-0 right-0 w-6 h-6"
            alt={data.baseType.toLowerCase()}
          />
        </div>
      </div>

      <NameAvatar
        locale={locale}
        text={text}
        className="mt-2 text-center text-base font-normal leading-tight"
      />
      {avatarDetail && (
        <div className="space-y-3 w-full mt-2">
          {/* HP Display */}
          <div className="bg-gradient-to-r from-red-600/10 to-red-500/5 border border-red-400/30 rounded-lg p-2">
            <div className="flex justify-between items-center mb-1">
              <span className="text-xs font-semibold text-red-600">❤️ HP</span>
              <span className="text-xs font-bold text-red-500">
                {Math.round(((avatarDetail?.[Number(data.id)]?.stats?.HP || 0) / (avatarDetail?.[Number(data.id)]?.stats?.MaxHP || 100)) * 100)}%
              </span>
            </div>
            <div className="relative w-full bg-base-300/50 rounded-full h-3 overflow-hidden border border-base-300/50">
              <div
                className="bg-gradient-to-r from-red-500 to-red-400 h-3 rounded-full transition-all duration-500"
                style={{
                  width: `${Math.max(0, Math.min(100, ((avatarDetail?.[Number(data.id)]?.stats?.HP || 0) / (avatarDetail?.[Number(data.id)]?.stats?.MaxHP || 100)) * 100))}%`
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-20" />
            </div>
            <div className="mt-1 text-xs text-base-content/60 text-right font-mono">
              <span className="text-red-500 font-semibold">{formatNumber(avatarDetail?.[Number(data.id)]?.stats?.HP ?? 0, 0)}</span>
              <span className="text-base-content/40"> / </span>
              <span>{formatNumber(avatarDetail?.[Number(data.id)]?.stats?.MaxHP ?? 100, 0)}</span>
            </div>
          </div>
        </div>
      )}

    </li>

  );
}

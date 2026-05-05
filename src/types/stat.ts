import { EntityType } from "./entity";

export type StatType = Record<string, number> | { value: number; type: string };

export interface PropertyType {
    value: number;
    type: string;
}

export interface StatsType {
    level: number;
    hp: number;
    CurrentHP?: number;
    MaxHP?: number;
}

export interface StatChangeType {
    entity: EntityType;
    stat?: StatType;
    property?: PropertyType;
}
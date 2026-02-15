import type { DiveNode, EventType } from './types';
import DDData from './wa__data-table.json';

export const parseDD = (val: string): number | null => {
  if (val === '-' || val === 'x') return null;
  const n = parseFloat(val);
  return Number.isNaN(n) ? null : n;
};

export const formatEvent = (event: EventType): string => {
  if (event === 'Springboard') return 'SP';
  if (event === 'Platform') return 'PL';
  return '';
};

export const nodes: DiveNode[] = DDData.data.map((item, index) => ({
  id: index,
  ...item,
} as DiveNode));

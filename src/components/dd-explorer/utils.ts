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

export const formatColumnLabel = (label: string): string => {
  // Handle special cases
  const specialCases: Record<string, string> = {
    'diveNumber': 'Dive Number',
    'diveDescription': 'Dive Description',
    'a': 'A',
    'b': 'B',
    'c': 'C',
    'd': 'D',
  };
  
  if (label in specialCases) {
    return specialCases[label];
  }
  
  // Convert to title case (capitalize first letter)
  return label.charAt(0).toUpperCase() + label.slice(1);
};

export const nodes: DiveNode[] = DDData.data.map((item, index) => ({
  id: index,
  ...item,
} as DiveNode));

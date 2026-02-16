export type EventType = 'Springboard' | 'Platform';

export type Board = '1m' | '3m' | '5m' | '7.5m' | '10m';

export type Group = 1 | 2 | 3 | 4 | 5 | 6;

export type Position = 'a' | 'b' | 'c' | 'd';

export interface DiveNode {
  id: number;
  event: EventType;
  board: Board;
  group: Group;
  diveNumber: number;
  diveDescription: string;
  a: string;
  b: string;
  c: string;
  d: string;
  // Pre-computed fields from pipeline
  aDD: number | null;
  bDD: number | null;
  cDD: number | null;
  dDD: number | null;
  boardOrderIndex: number;
  isHeadFirst: boolean;
  hasValidDD: boolean;
}

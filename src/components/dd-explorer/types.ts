export type EventType = 'Springboard' | 'Platform';

export type Board = '1m' | '3m' | '5m' | '7.5m' | '10m';

export type Group = 1 | 2 | 3 | 4 | 5 | 6;

export type Position = 'A' | 'B' | 'C' | 'D';

export interface DiveNode {
  id: number;
  Event: EventType;
  Board: Board;
  Group: Group;
  'Dive Number': number;
  'Dive Description': string;
  A: string;
  B: string;
  C: string;
  D: string;
}

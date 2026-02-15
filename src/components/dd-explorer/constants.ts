import type { EventType, Board, Group, Position, DiveNode } from './types';

export const ALL_EVENTS: EventType[] = ['Springboard', 'Platform'];
export const ALL_BOARDS: readonly Board[] = ['1m', '3m', '5m', '7.5m', '10m'] as const;
export const BOARD_ORDER: string[] = ['1m', '3m', '5m', '7.5m', '10m'];
export const ALL_GROUPS: readonly Group[] = [1, 2, 3, 4, 5, 6] as const;
export const POSITIONS: readonly Position[] = ['A', 'B', 'C', 'D'] as const;

export const COLUMN_LABELS = [
  'Event', 'Board', 'Group', 'Dive Number', 'Dive Description', 'A', 'B', 'C', 'D',
] as const;

export const COLUMN_WIDTHS: Record<string, string> = {
  A: '60px',
  B: '60px',
  C: '60px',
  D: '60px',
};

export const DEFAULT_COLUMN_VISIBILITY: Record<string, boolean> = {
  Event: false,
  Board: true,
  Group: false,
  'Dive Number': true,
  'Dive Description': true,
  A: true,
  B: true,
  C: true,
  D: true,
};

export const CUSTOM_THEME = {
  BaseCell: `
    &:not(:last-of-type) {
      white-space: nowrap;
    }
  `,
  HeaderCell: `
    &:nth-last-of-type(-n+4) {
      font-weight: normal;
    }
  `,
  Row: `
    cursor: pointer;

    &.row-select-selected, &.row-select-single-selected {
      background-color: rgb(219 234 254);
      color: rgb(30 64 175);
    }
  `,
};

export const VIRTUALIZED_OPTIONS = {
  rowHeight: (_item: DiveNode, _index: number) => 33,
};

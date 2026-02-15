import type { EventType, Board, Group, Position, DiveNode } from './types';

export const ALL_EVENTS: EventType[] = ['Springboard', 'Platform'];
export const ALL_BOARDS: readonly Board[] = ['1m', '3m', '5m', '7.5m', '10m'] as const;
export const SPRINGBOARD_BOARDS: readonly Board[] = ['1m', '3m'] as const;
export const PLATFORM_BOARDS: readonly Board[] = ['5m', '7.5m', '10m'] as const;
export const BOARD_ORDER: string[] = ['1m', '3m', '5m', '7.5m', '10m'];
export const ALL_GROUPS: readonly Group[] = [1, 2, 3, 4, 5, 6] as const;
export const POSITIONS: readonly Position[] = ['A', 'B', 'C', 'D'] as const;

export const getAvailableBoards = (events: EventType[]): Board[] => {
  if (events.length === 0) return [...ALL_BOARDS];
  if (events.length === 2) return [...ALL_BOARDS];
  return events[0] === 'Springboard' ? [...SPRINGBOARD_BOARDS] : [...PLATFORM_BOARDS];
};

export const COLUMN_LABELS = [
  'Event', 'Board', 'Group', 'Dive Number', 'Dive Description', 'A', 'B', 'C', 'D',
] as const;

export const COLUMN_WIDTHS: Record<string, string> = {
  A: '3em',
  B: '3em',
  C: '3em',
  D: '3em',
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
    &:nth-last-of-type(-n+4) {
      text-align: center;
    }
  `,
  HeaderCell: `
    &:nth-last-of-type(-n+4) {
      font-weight: normal;
      text-align: center;
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

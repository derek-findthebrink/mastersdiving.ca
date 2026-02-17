import type { EventType, Board, Group, Position, DiveNode } from './types';

export const ALL_EVENTS: EventType[] = ['Springboard', 'Platform'];
export const ALL_BOARDS: readonly Board[] = ['1m', '3m', '5m', '7.5m', '10m'] as const;
export const SPRINGBOARD_BOARDS: readonly Board[] = ['1m', '3m'] as const;
export const PLATFORM_BOARDS: readonly Board[] = ['5m', '7.5m', '10m'] as const;
export const BOARD_ORDER: string[] = ['1m', '3m', '5m', '7.5m', '10m'];
export const ALL_GROUPS: readonly Group[] = [1, 2, 3, 4, 5, 6] as const;
export const POSITIONS: readonly Position[] = ['a', 'b', 'c', 'd'] as const;

export const getAvailableBoards = (events: EventType[]): Board[] => {
  if (events.length === 0) return [...ALL_BOARDS];
  if (events.length === 2) return [...ALL_BOARDS];
  return events[0] === 'Springboard' ? [...SPRINGBOARD_BOARDS] : [...PLATFORM_BOARDS];
};

export const COLUMN_LABELS = ['event', 'board', 'group', 'diveNumber', 'diveDescription', 'a', 'b', 'c', 'd'] as const;

// Mobile labels for columns (shown at 375px width or less)
// Set to null to keep the default label on mobile
export const MOBILE_COLUMN_LABELS: Partial<Record<string, string | null>> = {
  board: 'B',
  diveNumber: '#',
};

const DEFAULT_COLUMN_WIDTH = '3.5em';

export const COLUMN_WIDTHS: Record<string, string> = {
  a: DEFAULT_COLUMN_WIDTH,
  b: DEFAULT_COLUMN_WIDTH,
  c: DEFAULT_COLUMN_WIDTH,
  d: DEFAULT_COLUMN_WIDTH,
};

export const DEFAULT_COLUMN_VISIBILITY: Record<string, boolean> = {
  event: false,
  board: true,
  group: false,
  diveNumber: true,
  diveDescription: true,
  a: true,
  b: true,
  c: true,
  d: true,
};

export const getCustomTheme = (isDarkMode: boolean) => ({
  Table: `
    --data-table-library_grid-template-columns: ${isDarkMode ? 'var(--data-table-library_grid-template-columns)' : 'var(--data-table-library_grid-template-columns)'};
    background-color: ${isDarkMode ? 'rgb(30 41 59)' : 'white'};
    color: ${isDarkMode ? 'rgb(226 232 240)' : 'rgb(15 23 42)'};
  `,
  Header: ``,
  Body: ``,
  BaseRow: `
    background-color: ${isDarkMode ? 'rgb(30 41 59)' : 'white'};
    color: ${isDarkMode ? 'rgb(226 232 240)' : 'rgb(15 23 42)'};
  `,
  HeaderRow: `
    background-color: ${isDarkMode ? 'rgb(51 65 85)' : 'rgb(248 250 252)'};
    color: ${isDarkMode ? 'rgb(203 213 225)' : 'rgb(71 85 105)'};
  `,
  Row: `
    cursor: pointer;
    background-color: ${isDarkMode ? 'rgb(30 41 59)' : 'white'};
    color: ${isDarkMode ? 'rgb(226 232 240)' : 'rgb(15 23 42)'};

    /* Base bold text styling for normal rows */
    .font-bold {
      color: ${isDarkMode ? 'rgb(255 255 255)' : 'rgb(0 0 0)'};
    }

    &:hover {
      background-color: ${isDarkMode ? 'rgb(51 65 85)' : 'rgb(248 250 252)'};
      color: ${isDarkMode ? 'rgb(241 245 249)' : 'rgb(15 23 42)'};

      .font-bold {
        color: ${isDarkMode ? 'rgb(241 245 249)' : 'rgb(15 23 42)'};
      }
    }

    &.row-select-selected, &.row-select-single-selected {
      background-color: ${isDarkMode ? 'rgb(30 58 138)' : 'rgb(219 234 254)'};
      color: ${isDarkMode ? 'rgb(191 219 254)' : 'rgb(30 64 175)'};

      /* Override all text colors in selected rows including bold text */
      .font-bold {
        color: ${isDarkMode ? 'rgb(191 219 254)' : 'rgb(30 64 175)'};
      }
    }
  `,
  BaseCell: `
    border-bottom: 1px solid ${isDarkMode ? 'rgb(51 65 85)' : 'rgb(226 232 240)'};

    &:not(:last-of-type) {
      white-space: nowrap;
    }
    &:nth-last-of-type(-n+4) {
      text-align: center;
    }
  `,
  HeaderCell: `
    border-bottom: 1px solid ${isDarkMode ? 'rgb(71 85 105)' : 'rgb(203 213 225)'};

    &:nth-last-of-type(-n+4) {
      font-weight: normal;
      text-align: center;
    }
  `,
  Cell: ``,
});

export const VIRTUALIZED_OPTIONS = {
  rowHeight: (_item: DiveNode, _index: number) => 33,
};

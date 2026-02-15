import * as React from "react";

import { CompactTable, type Column } from "@table-library/react-table-library/compact";
import { useTheme } from "@table-library/react-table-library/theme";
import { getTheme } from "@table-library/react-table-library/baseline";
import { useRowSelect } from "@table-library/react-table-library/select";
import { SelectClickTypes, SelectTypes } from "@table-library/react-table-library/select";

import DDData from './wa__data-table.json'
import type { Layout } from "@table-library/react-table-library/types/layout";

type EventType = 'Springboard' | 'Platform';

const ALL_EVENTS: EventType[] = ['Springboard', 'Platform'];
const ALL_BOARDS = ['1m', '3m', '5m', '7.5m', '10m'] as const;
const BOARD_ORDER: string[] = ['1m', '3m', '5m', '7.5m', '10m'];
const ALL_GROUPS = [1, 2, 3, 4, 5, 6] as const;
const POSITIONS = ['A', 'B', 'C', 'D'] as const;

interface DiveNode {
  id: number;
  Event: EventType;
  Board: '1m' | '3m' | '5m' | '7.5m' | '10m';
  Group: 1 | 2 | 3 | 4 | 5 | 6;
  'Dive Number': number;
  'Dive Description': string;
  A: string;
  B: string;
  C: string;
  D: string;
}

const nodes: DiveNode[] = DDData.data.map((item, index) => {
  return {
    id: index,
    ...item,
  } as DiveNode;
});

const parseDD = (val: string): number | null => {
  if (val === '-' || val === 'x') return null;
  const n = parseFloat(val);
  return Number.isNaN(n) ? null : n;
};

const columnEventRenderer = (item: DiveNode) => {
  const event = item['Event'];
  if (event === 'Springboard') return 'SP';
  if (event === 'Platform') return 'PL';
  return '';
};

const COLUMN_LABELS = ['Event', 'Board', 'Group', 'Dive Number', 'Dive Description', 'A', 'B', 'C', 'D'] as const;

const COLUMN_WIDTHS: Record<string, string> = {
  A: '60px',
  B: '60px',
  C: '60px',
  D: '60px',
};

const defaultColumnVisibility: Record<string, boolean> = {
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

const DDTable = () => {

  const [events, setEvents] = React.useState<EventType[]>(() => [...ALL_EVENTS]);
  const [boards, setBoards] = React.useState<string[]>(() => [...ALL_BOARDS]);
  const [groups, setGroups] = React.useState<number[]>(() => [...ALL_GROUPS]);
  const [diveNumber, setDiveNumber] = React.useState<number | null>(null);
  const [diveNumberInput, setDiveNumberInput] = React.useState('');
  const [ddLimit, setDdLimit] = React.useState<number | null>(null);
  const [ddLimitInput, setDdLimitInput] = React.useState('');
  const [columnVisibility, setColumnVisibility] = React.useState<Record<string, boolean>>(() => ({ ...defaultColumnVisibility }));
  const [columnsOpen, setColumnsOpen] = React.useState(false);

  const customTheme = {
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

  const theme = useTheme([getTheme(), customTheme]);

  const filteredNodes = React.useMemo(() => {
    const filtered = nodes.filter((n) => {
      if (!events.includes(n.Event)) return false;
      if (!boards.includes(n.Board)) return false;
      if (!groups.includes(n.Group)) return false;
      if (diveNumber != null && n['Dive Number'] !== diveNumber) return false;
      if (ddLimit != null) {
        const hasPositionUnderLimit = POSITIONS.some((pos) => {
          const dd = parseDD(n[pos]);
          return dd !== null && dd <= ddLimit;
        });
        if (!hasPositionUnderLimit) return false;
      }
      return true;
    });
    return [...filtered].sort((a, b) => {
      const boardA = BOARD_ORDER.indexOf(a.Board);
      const boardB = BOARD_ORDER.indexOf(b.Board);
      if (boardA !== boardB) return boardA - boardB;
      if (a.Group !== b.Group) return a.Group - b.Group;
      return a['Dive Number'] - b['Dive Number'];
    });
  }, [events, boards, groups, diveNumber, ddLimit]);

  const data = React.useMemo(() => ({ nodes: filteredNodes }), [filteredNodes]);

  const select = useRowSelect(data, {
    state: { id: null },
  }, {
    clickType: SelectClickTypes.RowClick,
    rowSelect: SelectTypes.SingleSelect,
  });

  const makeDDRenderer = React.useCallback(
    (position: 'A' | 'B' | 'C' | 'D') => (item: DiveNode) => {
      const classes = ['text-center'];
      const val = item[position].toString();
      const numeric = parseDD(val);

      if (val === '-' || val === 'x') {
        classes.push('text-gray-400');
      } else if (ddLimit != null && numeric !== null && numeric > ddLimit) {
        classes.push('text-gray-400');
      } else {
        classes.push('font-bold', 'text-black');
      }

      return <span className={classes.join(' ')} style={{ width: '2em' }}>{val}</span>;
    },
    [ddLimit]
  );

  const columns = React.useMemo<Column<DiveNode>[]>(() => {
    const defs: Omit<Column<DiveNode>, 'hide'>[] = [
      { label: "Event", renderCell: columnEventRenderer, resize: true },
      { label: "Board", renderCell: (item) => item['Board'], resize: true },
      { label: "Group", renderCell: (item) => item['Group'], resize: true },
      { label: "Dive Number", renderCell: (item) => item['Dive Number'], resize: true },
      { label: "Dive Description", renderCell: (item) => item['Dive Description'], resize: true },
      { label: 'A', renderCell: makeDDRenderer('A'), resize: true },
      { label: 'B', renderCell: makeDDRenderer('B'), resize: true },
      { label: 'C', renderCell: makeDDRenderer('C'), resize: true },
      { label: 'D', renderCell: makeDDRenderer('D'), resize: true },
    ];
    return defs.map((col) => ({ ...col, hide: !columnVisibility[col.label] }));
  }, [columnVisibility, makeDDRenderer]);

  const toggleEvent = (event: EventType) => {
    setEvents((prev) =>
      prev.includes(event) ? prev.filter((e) => e !== event) : [...prev, event]
    );
  };

  const toggleBoard = (board: string) => {
    setBoards((prev) =>
      prev.includes(board) ? prev.filter((b) => b !== board) : [...prev, board]
    );
  };

  const toggleGroup = (group: number) => {
    setGroups((prev) =>
      prev.includes(group) ? prev.filter((g) => g !== group) : [...prev, group]
    );
  };

  const applyDiveNumber = () => {
    const parsed = diveNumberInput.trim() === '' ? null : parseInt(diveNumberInput.trim(), 10);
    setDiveNumber(Number.isNaN(parsed) ? null : parsed);
  };

  const applyDdLimit = () => {
    const parsed = ddLimitInput.trim() === '' ? null : parseFloat(ddLimitInput.trim());
    setDdLimit(parsed === null || Number.isNaN(parsed) ? null : parsed);
  };

  const toggleColumn = (label: string) => {
    setColumnVisibility((prev) => ({ ...prev, [label]: !prev[label] }));
  };

  const resetFilters = () => {
    setEvents([...ALL_EVENTS]);
    setBoards([...ALL_BOARDS]);
    setGroups([...ALL_GROUPS]);
    setDiveNumber(null);
    setDiveNumberInput('');
    setDdLimit(null);
    setDdLimitInput('');
  };

  const resizedLayout = React.useMemo(() => {
    return columns
      .filter((col) => !col.hide)
      .map((col) => COLUMN_WIDTHS[col.label] || 'minmax(0px, 1fr)')
      .join(' ');
  }, [columns]);

  const tableKey = React.useMemo(() => {
    return columns.filter((col) => !col.hide).map((col) => col.label).join(',');
  }, [columns]);

  const layout: Layout = {
    isDiv: true,
    fixedHeader: true,
    resizedLayout,
  };

  const VIRTUALIZED_OPTIONS = {
    rowHeight: (_item: DiveNode, _index: number) => 33,
  };

  const isEmpty = filteredNodes.length === 0;

  return (
    <div className="space-y-3">
      <div
        className="flex flex-wrap items-start gap-4 rounded-lg border border-slate-200 bg-slate-50/80 p-3 dark:border-slate-700 dark:bg-slate-800/50"
        role="toolbar"
        aria-label="Table filters and column visibility"
      >
        <fieldset className="flex flex-wrap items-center gap-2 border-0 p-0">
          <legend className="sr-only">Event type</legend>
          <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Event:</span>
          {ALL_EVENTS.map((event) => (
            <label key={event} className="inline-flex cursor-pointer items-center gap-1.5 text-sm text-slate-700 dark:text-slate-300">
              <input
                type="checkbox"
                checked={events.includes(event)}
                onChange={() => toggleEvent(event)}
                className="h-3.5 w-3.5 rounded border-slate-300 text-blue-600 focus:ring-blue-500 dark:border-slate-600 dark:bg-slate-700"
              />
              {event === 'Springboard' ? 'SP' : 'PL'}
            </label>
          ))}
        </fieldset>

        <fieldset className="flex flex-wrap items-center gap-2 border-0 p-0">
          <legend className="sr-only">Board</legend>
          <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Board:</span>
          {ALL_BOARDS.map((board) => (
            <label key={board} className="inline-flex cursor-pointer items-center gap-1.5 text-sm text-slate-700 dark:text-slate-300">
              <input
                type="checkbox"
                checked={boards.includes(board)}
                onChange={() => toggleBoard(board)}
                className="h-3.5 w-3.5 rounded border-slate-300 text-blue-600 focus:ring-blue-500 dark:border-slate-600 dark:bg-slate-700"
              />
              {board}
            </label>
          ))}
        </fieldset>

        <fieldset className="flex flex-wrap items-center gap-2 border-0 p-0">
          <legend className="sr-only">Dive group</legend>
          <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Group:</span>
          {ALL_GROUPS.map((group) => (
            <label key={group} className="inline-flex cursor-pointer items-center gap-1.5 text-sm text-slate-700 dark:text-slate-300">
              <input
                type="checkbox"
                checked={groups.includes(group)}
                onChange={() => toggleGroup(group)}
                className="h-3.5 w-3.5 rounded border-slate-300 text-blue-600 focus:ring-blue-500 dark:border-slate-600 dark:bg-slate-700"
              />
              {group}
            </label>
          ))}
        </fieldset>

        <fieldset className="flex flex-wrap items-center gap-2 border-0 p-0">
          <legend className="sr-only">Dive number</legend>
          <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Dive #:</span>
          <input
            type="number"
            min={1}
            placeholder="All"
            value={diveNumberInput}
            onChange={(e) => setDiveNumberInput(e.target.value)}
            onBlur={applyDiveNumber}
            onKeyDown={(e) => e.key === 'Enter' && applyDiveNumber()}
            className="w-20 rounded border border-slate-300 bg-white px-2 py-1 text-sm text-slate-800 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-200"
            aria-label="Filter by dive number (optional)"
          />
        </fieldset>

        <fieldset className="flex flex-wrap items-center gap-2 border-0 p-0">
          <legend className="sr-only">DD Limit</legend>
          <span className="text-sm font-medium text-slate-700 dark:text-slate-300">DD Limit:</span>
          <input
            type="text"
            inputMode="decimal"
            placeholder="None"
            value={ddLimitInput}
            onChange={(e) => setDdLimitInput(e.target.value)}
            onBlur={applyDdLimit}
            onKeyDown={(e) => e.key === 'Enter' && applyDdLimit()}
            className="w-20 rounded border border-slate-300 bg-white px-2 py-1 text-sm text-slate-800 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-200"
            aria-label="Filter by maximum degree of difficulty (optional)"
          />
        </fieldset>

        <div className="relative">
          <button
            type="button"
            onClick={() => setColumnsOpen((o) => !o)}
            className="rounded border border-slate-300 bg-white px-2 py-1 text-sm font-medium text-slate-700 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-200"
            aria-expanded={columnsOpen}
            aria-haspopup="true"
          >
            Columns
          </button>
          {columnsOpen && (
            <>
              <div
                className="fixed inset-0 z-10"
                aria-hidden="true"
                onClick={() => setColumnsOpen(false)}
              />
              <div
                className="absolute left-0 top-full z-20 mt-1 min-w-[10rem] rounded border border-slate-200 bg-white p-2 shadow-lg dark:border-slate-700 dark:bg-slate-800"
                role="menu"
              >
                {COLUMN_LABELS.map((label) => (
                  <label
                    key={label}
                    className="flex cursor-pointer items-center gap-2 py-1 text-sm text-slate-700 dark:text-slate-300"
                  >
                    <input
                      type="checkbox"
                      checked={columnVisibility[label] ?? true}
                      onChange={() => toggleColumn(label)}
                      className="h-3.5 w-3.5 rounded border-slate-300 text-blue-600 focus:ring-blue-500 dark:border-slate-600 dark:bg-slate-700"
                    />
                    {label}
                  </label>
                ))}
              </div>
            </>
          )}
        </div>

        <button
          type="button"
          onClick={resetFilters}
          className="rounded border border-slate-300 bg-white px-2 py-1 text-sm text-slate-600 hover:bg-slate-100 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-300 dark:hover:bg-slate-600"
        >
          Reset filters
        </button>
      </div>

      {isEmpty ? (
        <p className="rounded-lg border border-slate-200 bg-slate-50 py-8 text-center text-slate-600 dark:border-slate-700 dark:bg-slate-800/50 dark:text-slate-400">
          No dives match. Try changing filters or reset filters.
        </p>
      ) : (
        <div style={{ height: 400 }}>
          <CompactTable
            key={tableKey}
            columns={columns}
            data={data}
            theme={theme}
            layout={layout}
            select={select}
            virtualizedOptions={VIRTUALIZED_OPTIONS}
          />
        </div>
      )}
    </div>
  );
};

export default DDTable;

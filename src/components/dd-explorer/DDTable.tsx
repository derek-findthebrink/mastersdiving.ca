import * as React from "react";

import { CompactTable, type Column } from "@table-library/react-table-library/compact";
import { useTheme } from "@table-library/react-table-library/theme";
import { getTheme } from "@table-library/react-table-library/baseline";

import DDData from './wa__data-table.json'
import type { Layout } from "@table-library/react-table-library/types/layout";

type EventType = 'Springboard' | 'Platform';

const ALL_EVENTS: EventType[] = ['Springboard', 'Platform'];
const ALL_BOARDS = ['1M', '3M', '5M', '7.5M', '10M'] as const;
const BOARD_ORDER: string[] = ['1M', '3M', '5M', '7.5M', '10M'];
const ALL_GROUPS = [1, 2, 3, 4, 5, 6] as const;

interface DiveNode {
  id: number;
  Event: EventType;
  Board: '1M' | '3M' | '5M' | '7.5M' | '10M';
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

const columnEventRenderer = (item: DiveNode) => {
  const event = item['Event'];
  if (event === 'Springboard') return 'SP';
  if (event === 'Platform') return 'PL';
  return '';
};

const columnDegreeOfDifficultyRenderer = (position: 'A' | 'B' | 'C' | 'D') => (item: DiveNode) => {
  const classes = ['text-center'];
  const val = item[position].toString();
  if (val === '-' || val === 'x') classes.push('text-gray-400');
  if (val !== '-' && val !== 'x') classes.push('font-bold', 'text-black');
  return <span className={classes.join(' ')} style={{ width: '2em' }}>{val}</span>;
};

const COLUMN_LABELS = ['Event', 'Board', 'Group', 'Dive Number', 'Dive Description', 'A', 'B', 'C', 'D'] as const;

const COLUMN_DEFS: Omit<Column<DiveNode>, 'hide'>[] = [
  { label: "Event", renderCell: columnEventRenderer, resize: false },
  { label: "Board", renderCell: (item) => item['Board'], resize: false },
  { label: "Group", renderCell: (item) => item['Group'], resize: false },
  { label: "Dive Number", renderCell: (item) => item['Dive Number'], resize: false },
  { label: "Dive Description", renderCell: (item) => item['Dive Description'], resize: true },
  { label: 'A', renderCell: columnDegreeOfDifficultyRenderer('A'), resize: false },
  { label: 'B', renderCell: columnDegreeOfDifficultyRenderer('B'), resize: false },
  { label: 'C', renderCell: columnDegreeOfDifficultyRenderer('C'), resize: false },
  { label: 'D', renderCell: columnDegreeOfDifficultyRenderer('D'), resize: false },
];

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
  const theme = useTheme(getTheme());

  const [events, setEvents] = React.useState<EventType[]>(() => [...ALL_EVENTS]);
  const [boards, setBoards] = React.useState<string[]>(() => [...ALL_BOARDS]);
  const [groups, setGroups] = React.useState<number[]>(() => [...ALL_GROUPS]);
  const [diveNumber, setDiveNumber] = React.useState<number | null>(null);
  const [diveNumberInput, setDiveNumberInput] = React.useState('');
  const [columnVisibility, setColumnVisibility] = React.useState<Record<string, boolean>>(() => ({ ...defaultColumnVisibility }));
  const [columnsOpen, setColumnsOpen] = React.useState(false);

  const filteredNodes = React.useMemo(() => {
    const filtered = nodes.filter(
      (n) =>
        events.includes(n.Event) &&
        boards.includes(n.Board) &&
        groups.includes(n.Group) &&
        (diveNumber == null || n['Dive Number'] === diveNumber)
    );
    return [...filtered].sort((a, b) => {
      const boardA = BOARD_ORDER.indexOf(a.Board);
      const boardB = BOARD_ORDER.indexOf(b.Board);
      if (boardA !== boardB) return boardA - boardB;
      if (a.Group !== b.Group) return a.Group - b.Group;
      return a['Dive Number'] - b['Dive Number'];
    });
  }, [events, boards, groups, diveNumber]);

  const columns = React.useMemo<Column<DiveNode>[]>(
    () => COLUMN_DEFS.map((col) => ({ ...col, hide: !columnVisibility[col.label] })),
    [columnVisibility]
  );

  const data = React.useMemo(() => ({ nodes: filteredNodes }), [filteredNodes]);

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

  const toggleColumn = (label: string) => {
    setColumnVisibility((prev) => ({ ...prev, [label]: !prev[label] }));
  };

  const resetFilters = () => {
    setEvents([...ALL_EVENTS]);
    setBoards([...ALL_BOARDS]);
    setGroups([...ALL_GROUPS]);
    setDiveNumber(null);
    setDiveNumberInput('');
  };

  const layout: Layout = {
    isDiv: true,
    fixedHeader: true,
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
            columns={columns}
            data={data}
            theme={theme}
            layout={layout}
            virtualizedOptions={VIRTUALIZED_OPTIONS}
          />
        </div>
      )}
    </div>
  );
};

export default DDTable;

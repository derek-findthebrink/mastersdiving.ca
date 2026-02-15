import * as React from 'react';

import type { EventType } from './types';
import { ALL_EVENTS, ALL_BOARDS, ALL_GROUPS } from './constants';
import type { DDFiltersReturn } from './useDDFilters';
import DDColumnPicker from './DDColumnPicker';

type DDFilterToolbarProps = Pick<
  DDFiltersReturn,
  | 'events'
  | 'boards'
  | 'groups'
  | 'diveNumberInput'
  | 'ddLimitInput'
  | 'columnVisibility'
  | 'columnsOpen'
  | 'toggleEvent'
  | 'toggleBoard'
  | 'toggleGroup'
  | 'setDiveNumberInput'
  | 'applyDiveNumber'
  | 'setDdLimitInput'
  | 'applyDdLimit'
  | 'resetFilters'
  | 'toggleColumn'
  | 'toggleColumnsOpen'
  | 'closeColumns'
>;

const CHECKBOX_CLASS =
  'h-3.5 w-3.5 rounded border-slate-300 text-blue-600 focus:ring-blue-500 dark:border-slate-600 dark:bg-slate-700';

const LABEL_CLASS =
  'inline-flex cursor-pointer items-center gap-1.5 text-sm text-slate-700 dark:text-slate-300';

const DDFilterToolbar: React.FC<DDFilterToolbarProps> = ({
  events,
  boards,
  groups,
  diveNumberInput,
  ddLimitInput,
  columnVisibility,
  columnsOpen,
  toggleEvent,
  toggleBoard,
  toggleGroup,
  setDiveNumberInput,
  applyDiveNumber,
  setDdLimitInput,
  applyDdLimit,
  resetFilters,
  toggleColumn,
  toggleColumnsOpen,
  closeColumns,
}) => (
  <div
    className="flex flex-wrap items-start gap-4 rounded-lg border border-slate-200 bg-slate-50/80 p-3 dark:border-slate-700 dark:bg-slate-800/50"
    role="toolbar"
    aria-label="Table filters and column visibility"
  >
    <fieldset className="flex flex-wrap items-center gap-2 border-0 p-0">
      <legend className="sr-only">Event type</legend>
      <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Event:</span>
      {ALL_EVENTS.map((event) => (
        <label key={event} className={LABEL_CLASS}>
          <input
            type="checkbox"
            checked={events.includes(event)}
            onChange={() => toggleEvent(event)}
            className={CHECKBOX_CLASS}
          />
          {event === 'Springboard' ? 'SP' : 'PL'}
        </label>
      ))}
    </fieldset>

    <fieldset className="flex flex-wrap items-center gap-2 border-0 p-0">
      <legend className="sr-only">Board</legend>
      <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Board:</span>
      {ALL_BOARDS.map((board) => (
        <label key={board} className={LABEL_CLASS}>
          <input
            type="checkbox"
            checked={boards.includes(board)}
            onChange={() => toggleBoard(board)}
            className={CHECKBOX_CLASS}
          />
          {board}
        </label>
      ))}
    </fieldset>

    <fieldset className="flex flex-wrap items-center gap-2 border-0 p-0">
      <legend className="sr-only">Dive group</legend>
      <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Group:</span>
      {ALL_GROUPS.map((group) => (
        <label key={group} className={LABEL_CLASS}>
          <input
            type="checkbox"
            checked={groups.includes(group)}
            onChange={() => toggleGroup(group)}
            className={CHECKBOX_CLASS}
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

    <DDColumnPicker
      open={columnsOpen}
      columnVisibility={columnVisibility}
      onToggle={toggleColumnsOpen}
      onClose={closeColumns}
      onToggleColumn={toggleColumn}
    />

    <button
      type="button"
      onClick={resetFilters}
      className="rounded border border-slate-300 bg-white px-2 py-1 text-sm text-slate-600 hover:bg-slate-100 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-300 dark:hover:bg-slate-600"
    >
      Reset filters
    </button>
  </div>
);

export default DDFilterToolbar;

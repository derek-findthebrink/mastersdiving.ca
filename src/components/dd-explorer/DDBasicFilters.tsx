import * as React from 'react';

import type { EventType, Board } from './types';
import { ALL_EVENTS, getAvailableBoards } from './constants';
import type { DDFiltersReturn } from './useDDFilters';

type DDBasicFiltersProps = Pick<
  DDFiltersReturn,
  'events' | 'boards' | 'setEventSingle' | 'setBoardSingle'
>;

const BUTTON_BASE =
  'min-h-[44px] px-4 py-2 font-medium text-sm transition-colors border';
const BUTTON_ACTIVE =
  'bg-blue-600 text-white border-blue-600 dark:bg-blue-500 dark:border-blue-500';
const BUTTON_INACTIVE =
  'bg-slate-100 text-slate-700 border-slate-300 hover:bg-slate-200 dark:bg-slate-700 dark:text-slate-300 dark:border-slate-600 dark:hover:bg-slate-600';

const DDBasicFilters: React.FC<DDBasicFiltersProps> = ({
  events,
  boards,
  setEventSingle,
  setBoardSingle,
}) => {
  const availableBoards = React.useMemo(() => getAvailableBoards(events), [events]);

  return (
    <div
      className="flex flex-col gap-3 rounded-lg border border-slate-200 bg-slate-50/80 p-3 dark:border-slate-700 dark:bg-slate-800/50"
      role="toolbar"
      aria-label="Basic filters"
    >
      <fieldset className="flex flex-wrap items-center gap-2 border-0 p-0">
        <legend className="mb-1 text-sm font-medium text-slate-700 dark:text-slate-300">
          Event:
        </legend>
        <div className="flex flex-wrap gap-2">
          {ALL_EVENTS.map((event) => {
            const isActive = events.includes(event);
            return (
              <button
                key={event}
                type="button"
                onClick={() => setEventSingle(event)}
                className={`${BUTTON_BASE} ${
                  isActive ? BUTTON_ACTIVE : BUTTON_INACTIVE
                } rounded-md`}
                aria-pressed={isActive}
              >
                {event}
              </button>
            );
          })}
        </div>
      </fieldset>

      <fieldset className="flex flex-wrap items-center gap-2 border-0 p-0">
        <legend className="mb-1 text-sm font-medium text-slate-700 dark:text-slate-300">
          Board:
        </legend>
        <div className="flex flex-wrap gap-2">
          {availableBoards.map((board) => {
            const isActive = boards.includes(board);
            return (
              <button
                key={board}
                type="button"
                onClick={() => setBoardSingle(board)}
                className={`${BUTTON_BASE} ${
                  isActive ? BUTTON_ACTIVE : BUTTON_INACTIVE
                } rounded-md`}
                aria-pressed={isActive}
              >
                {board}
              </button>
            );
          })}
        </div>
      </fieldset>
    </div>
  );
};

export default DDBasicFilters;

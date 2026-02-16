import * as React from 'react';

import { ALL_GROUPS } from './constants';
import type { DDFiltersReturn } from './useDDFilters';

type DDAdvancedFiltersProps = Pick<
  DDFiltersReturn,
  | 'groups'
  | 'diveNumberInput'
  | 'ddLimitInput'
  | 'ddMinInput'
  | 'headFirstOnly'
  | 'hideImpossibleDives'
  | 'ignoreADives'
  | 'advancedFiltersOpen'
  | 'toggleGroup'
  | 'setDiveNumberInput'
  | 'setDdLimitInput'
  | 'setDdMinInput'
  | 'toggleHeadFirstOnly'
  | 'toggleHideImpossibleDives'
  | 'toggleIgnoreADives'
  | 'toggleAdvancedFilters'
>;

const BUTTON_BASE_CLASS = 'rounded border px-2 py-1 text-sm transition-colors';

const BUTTON_ACTIVE_CLASS =
  'border-blue-500 bg-blue-500 text-white hover:bg-blue-600 dark:border-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700';

const BUTTON_INACTIVE_CLASS =
  'border-slate-300 bg-white text-slate-600 hover:bg-slate-100 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-300 dark:hover:bg-slate-600';

const DDAdvancedFilters: React.FC<DDAdvancedFiltersProps> = ({
  groups,
  diveNumberInput,
  ddLimitInput,
  ddMinInput,
  headFirstOnly,
  hideImpossibleDives,
  ignoreADives,
  advancedFiltersOpen,
  toggleGroup,
  setDiveNumberInput,
  setDdLimitInput,
  setDdMinInput,
  toggleHeadFirstOnly,
  toggleHideImpossibleDives,
  toggleIgnoreADives,
  toggleAdvancedFilters,
}) => (
  <div
    className="rounded-lg border border-slate-200 bg-slate-50/80 dark:border-slate-700 dark:bg-slate-800/50"
    role="region"
    aria-label="Advanced filters"
  >
    <button
      type="button"
      onClick={toggleAdvancedFilters}
      className="flex w-full items-center justify-between p-3 text-left text-sm font-medium text-slate-700 hover:bg-slate-100/50 dark:text-slate-300 dark:hover:bg-slate-700/50"
      aria-expanded={advancedFiltersOpen}
    >
      <span>Advanced Filters</span>
      <svg
        className={`h-5 w-5 transition-transform ${advancedFiltersOpen ? 'rotate-180' : ''}`}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
      </svg>
    </button>

    {advancedFiltersOpen && (
      <div className="flex flex-wrap items-start gap-4 border-t border-slate-200 p-3 dark:border-slate-700">
        <fieldset className="flex flex-wrap items-center gap-2 border-0 p-0">
          <legend className="sr-only">Dive group</legend>
          <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Group:</span>
          {ALL_GROUPS.map((group) => (
            <button
              key={group}
              type="button"
              onClick={() => toggleGroup(group)}
              className={`${BUTTON_BASE_CLASS} ${groups.includes(group) ? BUTTON_ACTIVE_CLASS : BUTTON_INACTIVE_CLASS}`}
              aria-pressed={groups.includes(group)}
            >
              {group}
            </button>
          ))}
        </fieldset>

        <fieldset className="flex flex-wrap items-center gap-2 border-0 p-0">
          <legend className="sr-only">Head-first entries only</legend>
          <button
            type="button"
            onClick={toggleHeadFirstOnly}
            className={`${BUTTON_BASE_CLASS} ${headFirstOnly ? BUTTON_ACTIVE_CLASS : BUTTON_INACTIVE_CLASS}`}
            aria-pressed={headFirstOnly}
          >
            Head-First Only
          </button>
        </fieldset>

        <fieldset className="flex flex-wrap items-center gap-2 border-0 p-0">
          <legend className="sr-only">Hide impossible dives</legend>
          <button
            type="button"
            onClick={toggleHideImpossibleDives}
            className={`${BUTTON_BASE_CLASS} ${hideImpossibleDives ? BUTTON_ACTIVE_CLASS : BUTTON_INACTIVE_CLASS}`}
            aria-pressed={hideImpossibleDives}
          >
            Hide Impossible Dives
          </button>
        </fieldset>

        <fieldset className="flex flex-wrap items-center gap-2 border-0 p-0">
          <legend className="sr-only">Ignore A dives</legend>
          <button
            type="button"
            onClick={toggleIgnoreADives}
            className={`${BUTTON_BASE_CLASS} ${ignoreADives ? BUTTON_ACTIVE_CLASS : BUTTON_INACTIVE_CLASS}`}
            aria-pressed={ignoreADives}
          >
            Ignore A Dives
          </button>
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
            className="w-20 rounded border border-slate-300 bg-white px-2 py-1 text-sm text-slate-800 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-200"
            aria-label="Filter by dive number (optional)"
          />
        </fieldset>

        <fieldset className="flex flex-wrap items-center gap-2 border-0 p-0">
          <legend className="sr-only">DD Minimum</legend>
          <span className="text-sm font-medium text-slate-700 dark:text-slate-300">DD Min:</span>
          <input
            type="text"
            inputMode="decimal"
            placeholder="None"
            value={ddMinInput}
            onChange={(e) => setDdMinInput(e.target.value)}
            className="w-20 rounded border border-slate-300 bg-white px-2 py-1 text-sm text-slate-800 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-200"
            aria-label="Filter by minimum degree of difficulty (optional)"
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
            className="w-20 rounded border border-slate-300 bg-white px-2 py-1 text-sm text-slate-800 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-200"
            aria-label="Filter by maximum degree of difficulty (optional)"
          />
        </fieldset>
      </div>
    )}
  </div>
);

export default DDAdvancedFilters;

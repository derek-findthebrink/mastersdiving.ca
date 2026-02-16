import * as React from 'react';

import type { DDFiltersReturn } from './useDDFilters';
import DDColumnPicker from './DDColumnPicker';

type DDFilterActionsProps = Pick<
  DDFiltersReturn,
  | 'columnVisibility'
  | 'columnsOpen'
  | 'resetFilters'
  | 'toggleColumn'
  | 'toggleColumnsOpen'
  | 'closeColumns'
>;

const DDFilterActions: React.FC<DDFilterActionsProps> = ({
  columnVisibility,
  columnsOpen,
  resetFilters,
  toggleColumn,
  toggleColumnsOpen,
  closeColumns,
}) => (
  <div
    className="flex flex-wrap items-center gap-3 rounded-lg border border-slate-200 bg-slate-50/80 p-3 dark:border-slate-700 dark:bg-slate-800/50"
    role="toolbar"
    aria-label="Filter actions"
  >
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

export default DDFilterActions;

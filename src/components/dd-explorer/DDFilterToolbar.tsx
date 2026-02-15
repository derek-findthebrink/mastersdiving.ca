import * as React from 'react';

import type { DDFiltersReturn } from './useDDFilters';
import DDBasicFilters from './DDBasicFilters';
import DDAdvancedFilters from './DDAdvancedFilters';

type DDFilterToolbarProps = Pick<
  DDFiltersReturn,
  | 'events'
  | 'boards'
  | 'groups'
  | 'diveNumberInput'
  | 'ddLimitInput'
  | 'ddMinInput'
  | 'columnVisibility'
  | 'columnsOpen'
  | 'setEventSingle'
  | 'setBoardSingle'
  | 'toggleGroup'
  | 'setDiveNumberInput'
  | 'applyDiveNumber'
  | 'setDdLimitInput'
  | 'applyDdLimit'
  | 'setDdMinInput'
  | 'applyDdMin'
  | 'resetFilters'
  | 'toggleColumn'
  | 'toggleColumnsOpen'
  | 'closeColumns'
>;

const DDFilterToolbar: React.FC<DDFilterToolbarProps> = ({
  events,
  boards,
  groups,
  diveNumberInput,
  ddLimitInput,
  ddMinInput,
  columnVisibility,
  columnsOpen,
  setEventSingle,
  setBoardSingle,
  toggleGroup,
  setDiveNumberInput,
  applyDiveNumber,
  setDdLimitInput,
  applyDdLimit,
  setDdMinInput,
  applyDdMin,
  resetFilters,
  toggleColumn,
  toggleColumnsOpen,
  closeColumns,
}) => (
  <div className="flex flex-col gap-3">
    <DDBasicFilters
      events={events}
      boards={boards}
      setEventSingle={setEventSingle}
      setBoardSingle={setBoardSingle}
    />
    <DDAdvancedFilters
      groups={groups}
      diveNumberInput={diveNumberInput}
      ddLimitInput={ddLimitInput}
      ddMinInput={ddMinInput}
      columnVisibility={columnVisibility}
      columnsOpen={columnsOpen}
      toggleGroup={toggleGroup}
      setDiveNumberInput={setDiveNumberInput}
      applyDiveNumber={applyDiveNumber}
      setDdLimitInput={setDdLimitInput}
      applyDdLimit={applyDdLimit}
      setDdMinInput={setDdMinInput}
      applyDdMin={applyDdMin}
      resetFilters={resetFilters}
      toggleColumn={toggleColumn}
      toggleColumnsOpen={toggleColumnsOpen}
      closeColumns={closeColumns}
    />
  </div>
);

export default DDFilterToolbar;

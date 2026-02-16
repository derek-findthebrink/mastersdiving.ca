import * as React from 'react';

import type { DDFiltersReturn } from './useDDFilters';
import DDBasicFilters from './DDBasicFilters';
import DDAdvancedFilters from './DDAdvancedFilters';
import DDFilterActions from './DDFilterActions';

type DDFilterToolbarProps = Pick<
  DDFiltersReturn,
  | 'events'
  | 'boards'
  | 'groups'
  | 'diveNumberInput'
  | 'ddLimitInput'
  | 'ddMinInput'
  | 'headFirstOnly'
  | 'hideImpossibleDives'
  | 'advancedFiltersOpen'
  | 'columnVisibility'
  | 'columnsOpen'
  | 'setEventSingle'
  | 'setBoardSingle'
  | 'toggleGroup'
  | 'setDiveNumberInput'
  | 'setDdLimitInput'
  | 'setDdMinInput'
  | 'toggleHeadFirstOnly'
  | 'toggleHideImpossibleDives'
  | 'toggleAdvancedFilters'
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
  headFirstOnly,
  hideImpossibleDives,
  advancedFiltersOpen,
  columnVisibility,
  columnsOpen,
  setEventSingle,
  setBoardSingle,
  toggleGroup,
  setDiveNumberInput,
  setDdLimitInput,
  setDdMinInput,
  toggleHeadFirstOnly,
  toggleHideImpossibleDives,
  toggleAdvancedFilters,
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
      headFirstOnly={headFirstOnly}
      hideImpossibleDives={hideImpossibleDives}
      advancedFiltersOpen={advancedFiltersOpen}
      toggleGroup={toggleGroup}
      setDiveNumberInput={setDiveNumberInput}
      setDdLimitInput={setDdLimitInput}
      setDdMinInput={setDdMinInput}
      toggleHeadFirstOnly={toggleHeadFirstOnly}
      toggleHideImpossibleDives={toggleHideImpossibleDives}
      toggleAdvancedFilters={toggleAdvancedFilters}
    />
    <DDFilterActions
      columnVisibility={columnVisibility}
      columnsOpen={columnsOpen}
      resetFilters={resetFilters}
      toggleColumn={toggleColumn}
      toggleColumnsOpen={toggleColumnsOpen}
      closeColumns={closeColumns}
    />
  </div>
);

export default DDFilterToolbar;

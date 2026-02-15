import * as React from 'react';

import { CompactTable, type Column } from '@table-library/react-table-library/compact';
import { useTheme } from '@table-library/react-table-library/theme';
import { getTheme } from '@table-library/react-table-library/baseline';
import { useRowSelect } from '@table-library/react-table-library/select';
import { SelectClickTypes, SelectTypes } from '@table-library/react-table-library/select';
import type { Layout } from '@table-library/react-table-library/types/layout';

import type { DiveNode, Position } from './types';
import { COLUMN_WIDTHS, CUSTOM_THEME, VIRTUALIZED_OPTIONS } from './constants';
import { parseDD, formatEvent } from './utils';
import { useDDFilters } from './useDDFilters';
import DDFilterToolbar from './DDFilterToolbar';

const DDTable = () => {
  const filters = useDDFilters();
  const { filteredNodes, ddLimit, columnVisibility } = filters;

  const theme = useTheme([getTheme(), CUSTOM_THEME]);

  const data = React.useMemo(() => ({ nodes: filteredNodes }), [filteredNodes]);

  const select = useRowSelect(data, {
    state: { id: null },
  }, {
    clickType: SelectClickTypes.RowClick,
    rowSelect: SelectTypes.SingleSelect,
  });

  const makeDDRenderer = React.useCallback(
    (position: Position) => (item: DiveNode) => {
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
      { label: 'Event', renderCell: (item) => formatEvent(item.Event), resize: true },
      { label: 'Board', renderCell: (item) => item['Board'], resize: true },
      { label: 'Group', renderCell: (item) => item['Group'], resize: true },
      { label: 'Dive Number', renderCell: (item) => item['Dive Number'], resize: true },
      { label: 'Dive Description', renderCell: (item) => item['Dive Description'], resize: true },
      { label: 'A', renderCell: makeDDRenderer('A'), resize: true },
      { label: 'B', renderCell: makeDDRenderer('B'), resize: true },
      { label: 'C', renderCell: makeDDRenderer('C'), resize: true },
      { label: 'D', renderCell: makeDDRenderer('D'), resize: true },
    ];
    return defs.map((col) => ({ ...col, hide: !columnVisibility[col.label] }));
  }, [columnVisibility, makeDDRenderer]);

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

  const isEmpty = filteredNodes.length === 0;

  return (
    <div className="space-y-3">
      <DDFilterToolbar {...filters} />

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

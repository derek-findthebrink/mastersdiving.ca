import * as React from 'react';

import { CompactTable, type Column } from '@table-library/react-table-library/compact';
import { useTheme } from '@table-library/react-table-library/theme';
import { getTheme } from '@table-library/react-table-library/baseline';
import { useRowSelect } from '@table-library/react-table-library/select';
import { SelectClickTypes, SelectTypes } from '@table-library/react-table-library/select';
import type { Layout } from '@table-library/react-table-library/types/layout';

import type { DiveNode, Position } from './types';
import { COLUMN_WIDTHS, CUSTOM_THEME, VIRTUALIZED_OPTIONS, MOBILE_COLUMN_LABELS } from './constants';
import { parseDD, formatEvent } from './utils';
import { useDDFilters } from './useDDFilters';
import DDFilterToolbar from './DDFilterToolbar';

// Extended column type that includes originalLabel for lookups
type ExtendedColumn = Column<DiveNode> & { originalLabel?: string };

const DDTable = () => {
  const filters = useDDFilters();
  const { filteredNodes, ddLimit, ddMin, columnVisibility } = filters;

  // Track if we're on mobile (375px or less)
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 375px)');
    
    const handleChange = (e: MediaQueryListEvent | MediaQueryList) => {
      setIsMobile(e.matches);
    };

    // Set initial value
    handleChange(mediaQuery);

    // Listen for changes
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Helper function to get the appropriate label based on screen size
  const getColumnLabel = React.useCallback((label: string): string => {
    if (isMobile && label in MOBILE_COLUMN_LABELS) {
      return MOBILE_COLUMN_LABELS[label] ?? label;
    }
    return label;
  }, [isMobile]);

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
      } else if (ddMin != null && numeric !== null && numeric < ddMin) {
        classes.push('text-gray-400');
      } else {
        classes.push('font-bold', 'text-black');
      }

      return <span className={classes.join(' ')} style={{ width: '2em' }}>{val}</span>;
    },
    [ddLimit, ddMin]
  );

  const columns = React.useMemo<ExtendedColumn[]>(() => {
    // Define columns with their original label names for lookups
    const columnDefs: Array<{ originalLabel: string; renderCell: (item: DiveNode) => React.ReactNode; resize: boolean }> = [
      { originalLabel: 'Event', renderCell: (item) => formatEvent(item.Event), resize: true },
      { originalLabel: 'Board', renderCell: (item) => item['Board'], resize: true },
      { originalLabel: 'Group', renderCell: (item) => item['Group'], resize: true },
      { originalLabel: 'Dive Number', renderCell: (item) => item['Dive Number'], resize: true },
      { originalLabel: 'Dive Description', renderCell: (item) => item['Dive Description'], resize: true },
      { originalLabel: 'A', renderCell: makeDDRenderer('A'), resize: true },
      { originalLabel: 'B', renderCell: makeDDRenderer('B'), resize: true },
      { originalLabel: 'C', renderCell: makeDDRenderer('C'), resize: true },
      { originalLabel: 'D', renderCell: makeDDRenderer('D'), resize: true },
    ];
    
    return columnDefs.map((col) => ({
      label: getColumnLabel(col.originalLabel),
      originalLabel: col.originalLabel, // Store for lookups
      renderCell: col.renderCell,
      resize: col.resize,
      hide: !columnVisibility[col.originalLabel],
    }));
  }, [columnVisibility, makeDDRenderer, getColumnLabel]);

  const resizedLayout = React.useMemo(() => {
    return columns
      .filter((col) => !col.hide)
      .map((col) => COLUMN_WIDTHS[col.originalLabel || col.label] || 'minmax(0px, 1fr)')
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

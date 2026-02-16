import * as React from 'react';

import { CompactTable, type Column } from '@table-library/react-table-library/compact';
import { useTheme } from '@table-library/react-table-library/theme';
import { getTheme } from '@table-library/react-table-library/baseline';
import { useRowSelect } from '@table-library/react-table-library/select';
import { SelectClickTypes, SelectTypes } from '@table-library/react-table-library/select';
import type { Layout } from '@table-library/react-table-library/types/layout';

import type { DiveNode, Position } from './types';
import { COLUMN_WIDTHS, getCustomTheme, VIRTUALIZED_OPTIONS, MOBILE_COLUMN_LABELS } from './constants';
import { formatEvent } from './utils';
import { useDDFilters } from './useDDFilters';
import DDFilterToolbar from './DDFilterToolbar';

// Extended column type that includes originalLabel for lookups
type ExtendedColumn = Column<DiveNode> & { originalLabel?: string };

const DDTable = () => {
  const filters = useDDFilters();
  const { filteredNodes, ddLimit, ddMin, columnVisibility } = filters;

  // Track if we're on mobile (375px or less)
  const [isMobile, setIsMobile] = React.useState(false);
  const [isDarkMode, setIsDarkMode] = React.useState(false);

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

  React.useEffect(() => {
    // Check if dark mode is active (class-based dark mode)
    const checkDarkMode = () => {
      setIsDarkMode(document.documentElement.classList.contains('dark'));
    };

    // Set initial value
    checkDarkMode();

    // Watch for changes to the dark class on the html element
    const observer = new MutationObserver(checkDarkMode);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    return () => observer.disconnect();
  }, []);

  // Helper function to get the appropriate label based on screen size
  const getColumnLabel = React.useCallback((label: string): string => {
    if (isMobile && label in MOBILE_COLUMN_LABELS) {
      return MOBILE_COLUMN_LABELS[label] ?? label;
    }
    return label;
  }, [isMobile]);

  // Generate custom theme based on dark mode state
  const customTheme = React.useMemo(() => getCustomTheme(isDarkMode), [isDarkMode]);
  const theme = useTheme([getTheme(), customTheme]);

  const data = React.useMemo(() => ({ nodes: filteredNodes }), [filteredNodes]);

  const select = useRowSelect(data, {
    state: { id: null },
  }, {
    clickType: SelectClickTypes.RowClick,
    rowSelect: SelectTypes.SingleSelect,
  });

  const makeDDRenderer = React.useCallback(
    (position: Position) => (item: DiveNode) => {
      const val = item[position];
      const numeric = item[`${position}DD` as keyof DiveNode] as number | null;
      
      let className = 'text-center';
      
      if (val === '-' || val === 'x') {
        className += ' text-gray-400 dark:text-gray-500';
      } else if (ddLimit != null && numeric !== null && numeric > ddLimit) {
        className += ' text-gray-400 dark:text-gray-500';
      } else if (ddMin != null && numeric !== null && numeric < ddMin) {
        className += ' text-gray-400 dark:text-gray-500';
      } else {
        className += ' font-bold';
      }
      
      return <span className={className} style={{ width: '2em' }}>{val}</span>;
    },
    [ddLimit, ddMin]
  );

  const columns = React.useMemo<ExtendedColumn[]>(() => {
    // Define columns with their original label names for lookups
    const columnDefs: Array<{ originalLabel: string; renderCell: (item: DiveNode) => React.ReactNode; resize: boolean }> = [
      { originalLabel: 'event', renderCell: (item) => formatEvent(item.event), resize: true },
      { originalLabel: 'board', renderCell: (item) => item.board, resize: true },
      { originalLabel: 'group', renderCell: (item) => item.group, resize: true },
      { originalLabel: 'diveNumber', renderCell: (item) => item.diveNumber, resize: true },
      { originalLabel: 'diveDescription', renderCell: (item) => item.diveDescription, resize: true },
      { originalLabel: 'a', renderCell: makeDDRenderer('a'), resize: true },
      { originalLabel: 'b', renderCell: makeDDRenderer('b'), resize: true },
      { originalLabel: 'c', renderCell: makeDDRenderer('c'), resize: true },
      { originalLabel: 'd', renderCell: makeDDRenderer('d'), resize: true },
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

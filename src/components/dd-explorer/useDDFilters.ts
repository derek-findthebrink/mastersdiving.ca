import * as React from 'react';

import type { EventType, Board } from './types';
import { ALL_EVENTS, ALL_GROUPS, DEFAULT_COLUMN_VISIBILITY, getAvailableBoards } from './constants';
import { nodes } from './utils';

export function useDDFilters() {
  const [events, setEvents] = React.useState<EventType[]>(() => []);
  const [boards, setBoards] = React.useState<string[]>(() => []);
  const [groups, setGroups] = React.useState<number[]>(() => [...ALL_GROUPS]);
  const [diveNumber, setDiveNumber] = React.useState<number | null>(null);
  const [diveNumberInput, setDiveNumberInput] = React.useState('');
  const [ddLimit, setDdLimit] = React.useState<number | null>(null);
  const [ddLimitInput, setDdLimitInput] = React.useState('');
  const [ddMin, setDdMin] = React.useState<number | null>(null);
  const [ddMinInput, setDdMinInput] = React.useState('');
  const [headFirstOnly, setHeadFirstOnly] = React.useState(false);
  const [hideImpossibleDives, setHideImpossibleDives] = React.useState(false);
  const [ignoreADives, setIgnoreADives] = React.useState(false);
  const [advancedFiltersOpen, setAdvancedFiltersOpen] = React.useState(false);
  const [columnVisibility, setColumnVisibility] = React.useState<Record<string, boolean>>(() => {
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
    return {
      ...DEFAULT_COLUMN_VISIBILITY,
      diveDescription: isMobile ? false : DEFAULT_COLUMN_VISIBILITY['diveDescription'],
    };
  });
  const [columnsOpen, setColumnsOpen] = React.useState(false);

  const filteredNodes = React.useMemo(() => {
    const filtered = nodes.filter((n) => {
      // Event filter
      if (events.length > 0 && !events.includes(n.event)) return false;

      // Board filter
      if (boards.length > 0 && !boards.includes(n.board)) return false;

      // Group filter
      if (!groups.includes(n.group)) return false;

      // Dive number filter
      if (diveNumber != null && n.diveNumber !== diveNumber) return false;

      // Head first filter - use pre-computed flag
      if (headFirstOnly && !n.isHeadFirst) return false;

      // Hide impossible dives - use pre-computed flag
      if (hideImpossibleDives && !n.hasValidDD) return false;

      // DD limit filter - use pre-computed values
      if (ddLimit != null) {
        const hasPositionUnderLimit =
          (!ignoreADives && n.aDD !== null && n.aDD <= ddLimit) ||
          (n.bDD !== null && n.bDD <= ddLimit) ||
          (n.cDD !== null && n.cDD <= ddLimit) ||
          (n.dDD !== null && n.dDD <= ddLimit);
        if (!hasPositionUnderLimit) return false;
      }

      // DD min filter - use pre-computed values
      if (ddMin != null) {
        const hasPositionOverMin =
          (!ignoreADives && n.aDD !== null && n.aDD >= ddMin) ||
          (n.bDD !== null && n.bDD >= ddMin) ||
          (n.cDD !== null && n.cDD >= ddMin) ||
          (n.dDD !== null && n.dDD >= ddMin);
        if (!hasPositionOverMin) return false;
      }

      return true;
    });

    // Optimized sort - use pre-computed boardOrderIndex, remove array spread
    filtered.sort((a, b) => {
      if (a.boardOrderIndex !== b.boardOrderIndex) {
        return a.boardOrderIndex - b.boardOrderIndex;
      }
      if (a.group !== b.group) return a.group - b.group;
      return a.diveNumber - b.diveNumber;
    });

    return filtered;
  }, [events, boards, groups, diveNumber, ddLimit, ddMin, headFirstOnly, hideImpossibleDives, ignoreADives]);

  const toggleEvent = React.useCallback((event: EventType) => {
    setEvents((prev) => (prev.includes(event) ? prev.filter((e) => e !== event) : [...prev, event]));
  }, []);

  const toggleBoard = React.useCallback((board: string) => {
    setBoards((prev) => (prev.includes(board) ? prev.filter((b) => b !== board) : [...prev, board]));
  }, []);

  const toggleGroup = React.useCallback((group: number) => {
    setGroups((prev) => {
      // If clicking a group that's already selected and all groups are selected,
      // deselect all other groups (keep only the clicked one)
      if (prev.includes(group) && prev.length === ALL_GROUPS.length) {
        return [group];
      }
      // Otherwise, toggle the group normally
      return prev.includes(group) ? prev.filter((g) => g !== group) : [...prev, group];
    });
  }, []);

  const setEventAll = React.useCallback(() => {
    setEvents([...ALL_EVENTS]);
  }, []);

  const setEventSingle = React.useCallback((event: EventType) => {
    setEvents(
      (prev) =>
        prev.includes(event) && prev.length === 1
          ? [] // If clicking the only selected event, deselect it
          : [event] // Otherwise, exclusively select this event
    );
  }, []);

  const setBoardAll = React.useCallback(() => {
    const availableBoards = getAvailableBoards(events);
    setBoards(availableBoards);
  }, [events]);

  const setBoardSingle = React.useCallback((board: string) => {
    setBoards((prev) => (prev.includes(board) ? prev.filter((b) => b !== board) : [...prev, board]));
  }, []);

  const applyDiveNumber = React.useCallback(() => {
    const parsed = diveNumberInput.trim() === '' ? null : parseInt(diveNumberInput.trim(), 10);
    setDiveNumber(Number.isNaN(parsed) ? null : parsed);
  }, [diveNumberInput]);

  const applyDdLimit = React.useCallback(() => {
    const parsed = ddLimitInput.trim() === '' ? null : parseFloat(ddLimitInput.trim());
    setDdLimit(parsed === null || Number.isNaN(parsed) ? null : parsed);
  }, [ddLimitInput]);

  const applyDdMin = React.useCallback(() => {
    const parsed = ddMinInput.trim() === '' ? null : parseFloat(ddMinInput.trim());
    setDdMin(parsed === null || Number.isNaN(parsed) ? null : parsed);
  }, [ddMinInput]);

  const toggleColumn = React.useCallback((label: string) => {
    setColumnVisibility((prev) => ({ ...prev, [label]: !prev[label] }));
  }, []);

  const toggleColumnsOpen = React.useCallback(() => {
    setColumnsOpen((o) => !o);
  }, []);

  const closeColumns = React.useCallback(() => {
    setColumnsOpen(false);
  }, []);

  const toggleAdvancedFilters = React.useCallback(() => {
    setAdvancedFiltersOpen((o) => !o);
  }, []);

  const toggleHeadFirstOnly = React.useCallback(() => {
    setHeadFirstOnly((prev) => !prev);
  }, []);

  const toggleHideImpossibleDives = React.useCallback(() => {
    setHideImpossibleDives((prev) => !prev);
  }, []);

  const toggleIgnoreADives = React.useCallback(() => {
    setIgnoreADives((prev) => !prev);
  }, []);

  const resetFilters = React.useCallback(() => {
    setEvents([]);
    setBoards([]);
    setGroups([...ALL_GROUPS]);
    setDiveNumber(null);
    setDiveNumberInput('');
    setDdLimit(null);
    setDdLimitInput('');
    setDdMin(null);
    setDdMinInput('');
    setHeadFirstOnly(false);
    setHideImpossibleDives(false);
    setIgnoreADives(false);
  }, []);

  // Auto-deselect boards that are not available for selected events
  React.useEffect(() => {
    if (events.length === 0) return;
    const availableBoards = getAvailableBoards(events);
    setBoards((prev) => prev.filter((b) => availableBoards.includes(b as Board)));
  }, [events]);

  // Debounce and auto-apply dive number input
  React.useEffect(() => {
    const timeout = setTimeout(() => {
      const parsed = diveNumberInput.trim() === '' ? null : parseInt(diveNumberInput.trim(), 10);
      setDiveNumber(Number.isNaN(parsed) ? null : parsed);
    }, 300);
    return () => clearTimeout(timeout);
  }, [diveNumberInput]);

  // Debounce and auto-apply DD limit input
  React.useEffect(() => {
    const timeout = setTimeout(() => {
      const parsed = ddLimitInput.trim() === '' ? null : parseFloat(ddLimitInput.trim());
      setDdLimit(parsed === null || Number.isNaN(parsed) ? null : parsed);
    }, 300);
    return () => clearTimeout(timeout);
  }, [ddLimitInput]);

  // Debounce and auto-apply DD min input
  React.useEffect(() => {
    const timeout = setTimeout(() => {
      const parsed = ddMinInput.trim() === '' ? null : parseFloat(ddMinInput.trim());
      setDdMin(parsed === null || Number.isNaN(parsed) ? null : parsed);
    }, 300);
    return () => clearTimeout(timeout);
  }, [ddMinInput]);

  return {
    // Filter state
    events,
    boards,
    groups,
    diveNumber,
    diveNumberInput,
    ddLimit,
    ddLimitInput,
    ddMin,
    ddMinInput,
    headFirstOnly,
    hideImpossibleDives,
    ignoreADives,
    advancedFiltersOpen,
    filteredNodes,

    // Column state
    columnVisibility,
    columnsOpen,

    // Filter actions
    toggleEvent,
    toggleBoard,
    toggleGroup,
    setEventAll,
    setEventSingle,
    setBoardAll,
    setBoardSingle,
    setDiveNumberInput,
    applyDiveNumber,
    setDdLimitInput,
    applyDdLimit,
    setDdMinInput,
    applyDdMin,
    toggleHeadFirstOnly,
    toggleHideImpossibleDives,
    toggleIgnoreADives,
    toggleAdvancedFilters,
    resetFilters,

    // Column actions
    toggleColumn,
    toggleColumnsOpen,
    closeColumns,
  };
}

export type DDFiltersReturn = ReturnType<typeof useDDFilters>;

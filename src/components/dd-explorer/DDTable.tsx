
import * as React from "react";

import { CompactTable, type Column } from "@table-library/react-table-library/compact";
import { useTheme } from "@table-library/react-table-library/theme";
import { getTheme } from "@table-library/react-table-library/baseline";

import DDData from './wa__data-table.json'
import type { Layout } from "@table-library/react-table-library/types/layout";

interface DiveNode {
  id: number;
  Event: 'Springboard' | 'Platform';
  Board: '1M' | '3M' | '5M' | '7M' | '10M';
  Group: 1 | 2 | 3 | 4 | 5 | 6;
  'Dive Number': number;
  'Dive Description': string;
  A: string;
  B: string;
  C: string;
  D: string;
}

const nodes: DiveNode[] = DDData.data.map((item, index) => {
  return {
    id: index,
    ...item,
  } as DiveNode;
});

const columnEventRenderer = (item) => {
  const event = item['Event']
  if (event === 'Springboard') {
    return 'SP'
  } else if (event === 'Platform') {
    return 'PL'
  }
}

const columnDegreeOfDifficultyRenderer = (position) => (item) => {
  const classes = ['text-center']
  const val = item[position].toString()
  if (val === '-' || val === 'x') classes.push('text-gray-400')
  if (val !== '-' && val !== 'x') classes.push('font-bold', 'text-black')
  return <span className={classes.join(' ')} style={{ width: '2em' }}>{val}</span>
}

const DDTable = () => {
  const theme = useTheme(getTheme());
  const data = { nodes }

  const COLUMNS: Column<DiveNode>[] = [
    { label: "Event", renderCell: columnEventRenderer, resize: false, hide: true },
    { label: "Board", renderCell: (item) => item['Board'], resize: false },
    { label: "Group", renderCell: (item) => item['Group'], resize: false, hide: true },
    { label: "Dive Number", renderCell: (item) => item['Dive Number'], resize: false },
    { label: "Dive Description", renderCell: (item) => item['Dive Description'], resize: true },
    { label: 'A', renderCell: columnDegreeOfDifficultyRenderer('A'), resize: false },
    { label: 'B', renderCell: columnDegreeOfDifficultyRenderer('B'), resize: false },
    { label: 'C', renderCell: columnDegreeOfDifficultyRenderer('C'), resize: false },
    { label: 'D', renderCell: columnDegreeOfDifficultyRenderer('D'), resize: false },
  ];

  const layout: Layout = {
    isDiv: true,
    fixedHeader: true,
  }

  const VIRTUALIZED_OPTIONS = {
    rowHeight: (_item, _index) => 33,
  };

  return (
    <div style={{ height: 400 }}>
      <CompactTable columns={COLUMNS} data={data} theme={theme} layout={layout} virtualizedOptions={VIRTUALIZED_OPTIONS} />
    </div>
  );
};

export default DDTable;

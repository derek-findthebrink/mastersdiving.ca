import * as React from 'react';

import { COLUMN_LABELS } from './constants';

interface DDColumnPickerProps {
  open: boolean;
  columnVisibility: Record<string, boolean>;
  onToggle: () => void;
  onClose: () => void;
  onToggleColumn: (label: string) => void;
}

const DDColumnPicker: React.FC<DDColumnPickerProps> = ({
  open,
  columnVisibility,
  onToggle,
  onClose,
  onToggleColumn,
}) => (
  <div className="relative">
    <button
      type="button"
      onClick={onToggle}
      className="rounded border border-slate-300 bg-white px-2 py-1 text-sm font-medium text-slate-700 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-200"
      aria-expanded={open}
      aria-haspopup="true"
    >
      Columns
    </button>
    {open && (
      <>
        <div
          className="fixed inset-0 z-10"
          aria-hidden="true"
          onClick={onClose}
        />
        <div
          className="absolute left-0 top-full z-20 mt-1 min-w-[10rem] rounded border border-slate-200 bg-white p-2 shadow-lg dark:border-slate-700 dark:bg-slate-800"
          role="menu"
        >
          {COLUMN_LABELS.map((label) => (
            <label
              key={label}
              className="flex cursor-pointer items-center gap-2 py-1 text-sm text-slate-700 dark:text-slate-300"
            >
              <input
                type="checkbox"
                checked={columnVisibility[label] ?? true}
                onChange={() => onToggleColumn(label)}
                className="h-3.5 w-3.5 rounded border-slate-300 text-blue-600 focus:ring-blue-500 dark:border-slate-600 dark:bg-slate-700"
              />
              {label}
            </label>
          ))}
        </div>
      </>
    )}
  </div>
);

export default DDColumnPicker;

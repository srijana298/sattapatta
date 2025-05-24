import React, { useState, useEffect, useMemo } from 'react';
import {
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight
} from 'lucide-react';

// TypeScript interfaces
export interface ColumnDef<T = any> {
  key: string;
  header: string;
  sortable?: boolean;
  width?: string;
  className?: string;
  headerClassName?: string;
  render?: (value: any, row: T, index: number) => React.ReactNode;
}

export type SortDirection = 'asc' | 'desc';

export interface SortConfig {
  key: string | null;
  direction: SortDirection;
}

export interface DataTableProps<T extends Record<string, any> = Record<string, any>> {
  columns: ColumnDef<T>[];
  data: T[];
  pagination?: boolean;
  pageSize?: number;
  pageSizeOptions?: number[];
  customRowRenderer?: (row: T, index: number) => React.ReactNode;
  customCellRenderer?: (value: any, row: T, columnKey: string, index: number) => React.ReactNode;
  striped?: boolean;
  hoverable?: boolean;
  bordered?: boolean;
  className?: string;
  emptyMessage?: string;
}

// Main Table Component
export default function DataTable<T extends Record<string, any>>({
  columns = [],
  data = [],
  pagination = true,
  pageSize = 10,
  pageSizeOptions = [5, 10, 25, 50],
  customRowRenderer,
  customCellRenderer,
  striped = true,
  hoverable = true,
  bordered = true,
  className = '',
  emptyMessage = 'No data available'
}: DataTableProps<T>) {
  // State for sorting
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    key: null,
    direction: 'asc'
  });

  // State for pagination
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [rowsPerPage, setRowsPerPage] = useState<number>(pageSize);

  // Reset to first page when data changes
  useEffect(() => {
    setCurrentPage(1);
  }, [data, rowsPerPage]);

  // Sorting logic
  const handleSort = (key: string, sortable?: boolean) => {
    if (sortable === false) return;

    let direction: SortDirection = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  // Apply sorting to data
  const sortedData = useMemo(() => {
    if (!sortConfig.key) return data;

    return [...data].sort((a, b) => {
      const aValue = a[sortConfig.key as string];
      const bValue = b[sortConfig.key as string];

      if (aValue === null || aValue === undefined) return 1;
      if (bValue === null || bValue === undefined) return -1;

      if (typeof aValue === 'string') {
        return sortConfig.direction === 'asc'
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }

      return sortConfig.direction === 'asc' ? aValue - bValue : bValue - aValue;
    });
  }, [data, sortConfig]);

  // Apply pagination
  const paginatedData = useMemo(() => {
    if (!pagination) return sortedData;

    const startIndex = (currentPage - 1) * rowsPerPage;
    return sortedData.slice(startIndex, startIndex + rowsPerPage);
  }, [sortedData, currentPage, rowsPerPage, pagination]);

  // Total pages calculation
  const totalPages = Math.ceil(sortedData.length / rowsPerPage);

  // Generate page numbers to display
  const getPageNumbers = (): (number | string)[] => {
    const maxPagesToShow = 5;
    if (totalPages <= maxPagesToShow) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    // Always show first, last, and current pages
    const pages: (number | string)[] = [1];

    let startPage = Math.max(2, currentPage - 1);
    let endPage = Math.min(totalPages - 1, currentPage + 1);

    // Adjust if we're at the start or end
    if (currentPage <= 3) {
      endPage = Math.min(totalPages - 1, 4);
    } else if (currentPage >= totalPages - 2) {
      startPage = Math.max(2, totalPages - 3);
    }

    // Add ellipsis indicators
    if (startPage > 2) {
      pages.push('...');
    }

    // Add middle pages
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    // Add ending ellipsis
    if (endPage < totalPages - 1) {
      pages.push('...');
    }

    // Add last page
    if (totalPages > 1) {
      pages.push(totalPages);
    }

    return pages;
  };

  // Pagination handlers
  const handleNextPage = (): void => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePrevPage = (): void => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const handleFirstPage = (): void => {
    setCurrentPage(1);
  };

  const handleLastPage = (): void => {
    setCurrentPage(totalPages);
  };

  const handlePageClick = (page: number | string): void => {
    if (typeof page === 'number') {
      setCurrentPage(page);
    }
  };

  const handleRowsPerPageChange = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    setRowsPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  // Render table header
  const renderTableHeader = (): React.ReactNode => {
    return (
      <thead className="text-xs text-gray-700 uppercase bg-gray-50">
        <tr>
          {columns.map((column, index) => {
            const isSorted = sortConfig.key === column.key;
            const sortIcon = isSorted ? (
              sortConfig.direction === 'asc' ? (
                <ChevronUp className="ml-1 inline-block h-4 w-4" />
              ) : (
                <ChevronDown className="ml-1 inline-block h-4 w-4" />
              )
            ) : null;

            return (
              <th
                key={`header-${column.key}-${index}`}
                className={`px-6 py-3 ${column.sortable !== false ? 'cursor-pointer' : ''} ${
                  column.headerClassName || ''
                }`}
                style={{ width: column.width }}
                onClick={() => handleSort(column.key, column.sortable)}
              >
                <div className="flex items-center">
                  {column.header}
                  {column.sortable !== false && sortIcon}
                </div>
              </th>
            );
          })}
        </tr>
      </thead>
    );
  };

  // Render table rows
  const renderTableRows = (): React.ReactNode => {
    if (paginatedData.length === 0) {
      return (
        <tr>
          <td colSpan={columns.length} className="px-6 py-4 text-center text-gray-500">
            {emptyMessage}
          </td>
        </tr>
      );
    }

    return paginatedData.map((row, rowIndex) => {
      if (customRowRenderer) {
        return customRowRenderer(row, rowIndex);
      }

      const rowClass = `${striped && rowIndex % 2 === 0 ? 'bg-gray-50' : 'bg-white'} ${
        hoverable ? 'hover:bg-gray-100' : ''
      }`;

      return (
        <tr key={`row-${rowIndex}`} className={rowClass}>
          {columns.map((column, colIndex) => {
            const cellValue = row[column.key];
            const cellContent = column.render
              ? column.render(cellValue, row, rowIndex)
              : customCellRenderer
                ? customCellRenderer(cellValue, row, column.key, rowIndex)
                : cellValue;

            return (
              <td
                key={`cell-${rowIndex}-${colIndex}`}
                className={`px-6 py-4 ${column.className || ''}`}
              >
                {cellContent}
              </td>
            );
          })}
        </tr>
      );
    });
  };

  // Render pagination controls
  const renderPagination = (): React.ReactNode => {
    if (!pagination || totalPages <= 1) return null;

    const pageNumbers = getPageNumbers();

    return (
      <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
        <div className="flex flex-1 items-center justify-between sm:hidden">
          <button
            onClick={handlePrevPage}
            disabled={currentPage === 1}
            className={`relative inline-flex items-center rounded px-4 py-2 text-sm font-medium ${
              currentPage === 1
                ? 'cursor-not-allowed text-gray-300'
                : 'text-gray-700 hover:bg-gray-50'
            }`}
          >
            Previous
          </button>
          <span className="text-sm text-gray-700">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={handleNextPage}
            disabled={currentPage >= totalPages}
            className={`relative ml-3 inline-flex items-center rounded px-4 py-2 text-sm font-medium ${
              currentPage >= totalPages
                ? 'cursor-not-allowed text-gray-300'
                : 'text-gray-700 hover:bg-gray-50'
            }`}
          >
            Next
          </button>
        </div>

        <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
          <div>
            <p className="text-sm text-gray-700">
              Showing <span className="font-medium">{(currentPage - 1) * rowsPerPage + 1}</span> to{' '}
              <span className="font-medium">
                {Math.min(currentPage * rowsPerPage, sortedData.length)}
              </span>{' '}
              of <span className="font-medium">{sortedData.length}</span> results
            </p>
          </div>

          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-700">Rows per page:</span>
            <select
              className="rounded border border-gray-300 py-1 pl-2 pr-8 text-sm"
              value={rowsPerPage}
              onChange={handleRowsPerPageChange}
            >
              {pageSizeOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>

            <nav
              className="isolate inline-flex -space-x-px rounded-md shadow-sm"
              aria-label="Pagination"
            >
              <button
                onClick={handleFirstPage}
                disabled={currentPage === 1}
                className={`relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ${
                  currentPage === 1 ? 'cursor-not-allowed' : 'hover:bg-gray-50'
                }`}
              >
                <span className="sr-only">First page</span>
                <ChevronsLeft className="h-5 w-5" />
              </button>

              <button
                onClick={handlePrevPage}
                disabled={currentPage === 1}
                className={`relative inline-flex items-center px-2 py-2 text-gray-400 ${
                  currentPage === 1 ? 'cursor-not-allowed' : 'hover:bg-gray-50'
                }`}
              >
                <span className="sr-only">Previous</span>
                <ChevronLeft className="h-5 w-5" />
              </button>

              {pageNumbers.map((page, index) => {
                if (page === '...') {
                  return (
                    <span
                      key={`ellipsis-${index}`}
                      className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700"
                    >
                      ...
                    </span>
                  );
                }

                return (
                  <button
                    key={`page-${page}`}
                    onClick={() => handlePageClick(page)}
                    className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ${
                      page === currentPage
                        ? 'z-10 bg-blue-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600'
                        : 'text-gray-900 hover:bg-gray-50'
                    }`}
                  >
                    {page}
                  </button>
                );
              })}

              <button
                onClick={handleNextPage}
                disabled={currentPage >= totalPages}
                className={`relative inline-flex items-center px-2 py-2 text-gray-400 ${
                  currentPage >= totalPages ? 'cursor-not-allowed' : 'hover:bg-gray-50'
                }`}
              >
                <span className="sr-only">Next</span>
                <ChevronRight className="h-5 w-5" />
              </button>

              <button
                onClick={handleLastPage}
                disabled={currentPage >= totalPages}
                className={`relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ${
                  currentPage >= totalPages ? 'cursor-not-allowed' : 'hover:bg-gray-50'
                }`}
              >
                <span className="sr-only">Last page</span>
                <ChevronsRight className="h-5 w-5" />
              </button>
            </nav>
          </div>
        </div>
      </div>
    );
  };

  // Table style classes
  const tableClasses = `w-full text-sm text-left ${
    bordered ? 'border border-gray-200' : ''
  } ${className}`;

  return (
    <div className="w-full overflow-hidden rounded-lg shadow-sm">
      <div className="w-full overflow-x-auto">
        <table className={tableClasses}>
          {renderTableHeader()}
          <tbody>{renderTableRows()}</tbody>
        </table>
      </div>
      {renderPagination()}
    </div>
  );
}

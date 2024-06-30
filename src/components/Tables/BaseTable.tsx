import React, {
  ReactElement,
  SetStateAction,
  useEffect,
  useMemo,
  useState,
} from "react";
import styled, { useTheme } from "styled-components";
import { FaCaretDown, FaCaretUp } from "react-icons/fa";
import { TbFilter, TbFilterEdit } from "react-icons/tb";

import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  getExpandedRowModel,
  getGroupedRowModel,
  ColumnDef,
} from "@tanstack/react-table";
import { ClipLoader } from "react-spinners";
import SearchBar from "../SearchBar";
import IconButton from "../IconButton";
import { HiMiniViewColumns } from "react-icons/hi2";
import Menu from "../Menu";
import { humanizeString } from "../../helpers";
import Button from "../Button";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import FilterForm from "../FilterForm";
import useFetchTable from "../../custom_hooks/useFetchTable";
import { AdvanceFilter } from "../../models/misc";
import { FieldValues, Resolver } from "react-hook-form";
import { AnyObject, Lazy, ObjectSchema } from "yup";

const Toolbar = styled.div`
  padding: ${({ theme }) => theme.spacing.s16};
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: ${({ theme }) => theme.palette.background.default};
  border-radius: ${({ theme }) => theme.borderRadius.container};
  margin-bottom: ${({ theme }) => theme.spacing.s8};

  .icon {
    font-size: ${({ theme }) => theme.typography.fontSize.f30};
    transition: all 0.3s ease;
  }
`;

const TableWrapper = styled.div`
  overflow-x: auto;
  background-color: ${({ theme }) => theme.palette.background.default};
  border-radius: ${({ theme }) => theme.borderRadius.container};
  padding: ${({ theme }) => theme.spacing.s8};
  transition: all 0.3s ease;

  /* width */
  &::-webkit-scrollbar {
    height: 5px;
    width: 5px;
  }

  /* Track */
  &::-webkit-scrollbar-track {
    box-shadow: inset 0 0 5px grey;
    border-radius: ${({ theme }) => theme.borderRadius.container};
  }

  /* Handle */
  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.palette.primary.main};
    border-radius: 10px;
  }

  /* Handle on hover */
  &::-webkit-scrollbar-thumb:hover {
    background: ${({ theme }) => theme.palette.primary.dark};
  }
`;

const StyledTable = styled.table`
  border-collapse: collapse;
  width: 100%;
  height: "400px";
  tbody {
    position: relative;
  }
  p {
    margin: 0;
  }
  th {
    background-color: aliceblue;
    text-align: center;
    border: 2px solid ${({ theme }) => theme.palette.border.primary};
    div {
      display: flex;
      align-items: center;
      gap: 4px;
    }
    padding: 12px;
  }
  td {
    text-align: left;
    padding: 12px;
    border: 1px solid ${({ theme }) => theme.palette.border.secondary};
  }
  th,
  td {
    border-collapse: collapse;
  }
`;

const LoadingWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  border-top: 1px solid ${({ theme }) => theme.palette.border.primary};
  left: 0;
  right: 0;
`;

const HeadingRow = styled.tr`
  th:hover {
    background-color: ${({ theme }) => theme.palette.background.dark};
  }
  th {
    position: relative;
    div {
      display: none;
      position: absolute;
      right: 0;
      bottom: 0;
      top: 0;
      cursor: col-resize;
      width: ${({ theme }) => theme.sizing.s10};
      border: 0;
      user-select: none;
      touch-action: none;
      background-color: ${({ theme }) => theme.palette.primary.dark};
      transition: all 0.6s ease-in-out;
      &.active {
        display: block;
      }
    }
    &:hover {
      div {
        display: block;
      }
    }
  }
`;

const DataRow = styled.tr`
  &:hover {
    background-color: ${({ theme }) => theme.palette.background.dark};
  }
`;

const Title = styled.h1`
  margin: 0;
  font-size: ${({ theme }) => theme.typography.fontSize.f24};
`;

const PaginationButton = styled.div<{ disabled: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.s8};
  color: ${({ theme, disabled }) =>
    disabled ? theme.palette.disabled.button : theme.palette.primary.main};

  transition: color 0.2s ease;

  .icon-button {
    font-size: ${({ theme }) => theme.typography.fontSize.f24};
    border: 2px solid
      ${({ theme, disabled }) =>
        disabled ? theme.palette.disabled.button : theme.palette.primary.main};
    border-radius: ${({ theme }) => theme.borderRadius.container};
    cursor: pointer;
  }
`;

type BaseTableProps<T> = {
  rows: T[];
  columns: ColumnDef<T, string | number | undefined>[];
  loading?: boolean;
  tableLoading?: boolean;
  columnOrder?: string[];
  height?: string;
  title?: string;
  toolbarActions?: ReactElement<any, any>;
  navigateOnRowClick?: (row: T) => void;
  filterFields?: AdvanceFilter[];
  onFilter?: (data: Record<string, any>) => void;
  onReset?: () => void;
  showAdvanceFilters?: boolean;
  noDataMessage?: string;
  validationSchema:
    | ObjectSchema<FieldValues, AnyObject, any, "">
    | Lazy<{ [x: string]: any }, AnyObject, any>;
};

const BaseTable = <T extends object>({
  rows,
  columns,
  loading = true,
  tableLoading = false,
  columnOrder,
  height,
  title,
  toolbarActions,
  navigateOnRowClick,
  filterFields,
  onFilter,
  onReset,
  showAdvanceFilters = true,
  noDataMessage = "No data found",
  validationSchema,
}: BaseTableProps<T>) => {
  const theme = useTheme();
  const [showFilterForm, setShowFilterForm] = useState<boolean>(false); // Always set this initial state to false
  const [sorting, setSorting] = useState<any[]>([]);
  const [filtering, setFiltering] = useState("");

  const [anchorEl, setAnchorEl] = useState(null);
  const [grouping, setGrouping] = useState<string[]>([]);

  const table = useReactTable({
    data: rows || [],
    columns,
    onGroupingChange: setGrouping,
    getExpandedRowModel: getExpandedRowModel(),
    getGroupedRowModel: getGroupedRowModel(),
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    columnResizeMode: "onChange",
    debugTable: true,
    state: {
      grouping,
      sorting: sorting,
      globalFilter: filtering,
      columnOrder,
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setFiltering,
  });

  if (loading) {
    return (
      <div
        role="loding-table"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
        }}
      >
        <ClipLoader />
      </div>
    );
  }

  if (columns.length === 0) {
    return (
      <div
        role="no-data"
        style={{
          textAlign: "center",
          marginTop: theme.spacing.s24,
          color: theme.palette.error.main,
          fontSize: theme.typography.fontSize.f18,
          fontWeight: theme.typography.fontWeight.semiBold,
        }}
      >
        {noDataMessage}
      </div>
    );
  }

  return (
    <>
      {showFilterForm && (
        <FilterForm
          showFilters={showFilterForm}
          filterFields={filterFields}
          onFilter={onFilter}
          onReset={onReset}
          validationSchema={validationSchema}
        />
      )}
      <Toolbar>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "start",
            gap: theme.spacing.s4,
          }}
        >
          {title && <Title role="table-title">{title}</Title>}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: theme.spacing.s4,
            }}
          >
            {toolbarActions && toolbarActions}
            <SearchBar
              placeholder={"Search"}
              value={filtering}
              setValue={setFiltering}
              style={{}}
              inputStyle={{}}
            />
          </div>
        </div>
        <div style={{ display: "flex", gap: theme.spacing.s12 }}>
          {showAdvanceFilters && (
            <div>
              <IconButton
                role="toggle-advance-filters"
                onClick={() => setShowFilterForm(!showFilterForm)}
              >
                {showFilterForm ? (
                  <TbFilterEdit className="icon" />
                ) : (
                  <TbFilter className="icon" />
                )}
              </IconButton>
            </div>
          )}
          <div>
            <IconButton
              role="show-hide-columns-menu"
              onClick={(e: React.MouseEvent<HTMLButtonElement>) =>
                setAnchorEl(e.currentTarget as any)
              }
            >
              <HiMiniViewColumns className="icon" />
            </IconButton>

            <Menu
              style={{
                width: theme.sizing.s256,
                display: "flex",
                flexWrap: "wrap",
                gap: theme.spacing.s16,
              }}
              anchorEl={anchorEl}
              setAnchorEl={setAnchorEl}
            >
              {table.getAllColumns().map((item) => (
                <div style={{ display: "flex", gap: theme.spacing.s8 }}>
                  <input
                    key={item.id}
                    type="checkbox"
                    disabled={!item.getCanHide()}
                    style={{ cursor: "pointer" }}
                    checked={item.getIsVisible()}
                    onChange={item.getToggleVisibilityHandler()}
                  />
                  <p>{humanizeString(item.columnDef.header)}</p>
                </div>
              ))}
            </Menu>
          </div>
        </div>
      </Toolbar>
      <TableWrapper style={{ height: height ? height : "auto" }}>
        <StyledTable>
          <thead style={{ width: table.getTotalSize() }}>
            {table.getHeaderGroups().map((headerGroup) => (
              <HeadingRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  const isGrouped: boolean =
                    header.subHeaders && header.subHeaders.length > 0;
                  return (
                    <th
                      key={header.id}
                      colSpan={isGrouped ? header.colSpan : 1}
                      rowSpan={isGrouped ? 1 : 2}
                      onClick={header.column.getToggleSortingHandler()}
                      style={{
                        cursor: "pointer",
                        width: header.getSize(),
                        // borderCollapse : isGrouped ? "collapse" : "none",
                      }}
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                      {header.column.getIsSorted() ? (
                        header.column.getIsSorted() === "asc" ? (
                          <FaCaretUp />
                        ) : (
                          <FaCaretDown />
                        )
                      ) : null}
                      <div
                        onMouseDown={header.getResizeHandler()}
                        onTouchStart={header.getResizeHandler()}
                        className={`${
                          header.column.getIsResizing() && "active"
                        }`}
                        style={{
                          backgroundColor:
                            header.column.getIsResizing() &&
                            theme.palette.secondary.dark,
                        }}
                      />
                    </th>
                  );
                })}
              </HeadingRow>
            ))}
          </thead>

          <tbody>
            {tableLoading ? (
              <div
                role="table-loading-indicator"
                style={{
                  height: theme.sizing.s44,
                  marginTop: theme.spacing.s16,
                }}
              >
                <LoadingWrapper>
                  <ClipLoader />
                </LoadingWrapper>
              </div>
            ) : (
              table.getRowModel().rows.map((row) => (
                <DataRow
                  key={row.id}
                  onClick={() =>
                    navigateOnRowClick && navigateOnRowClick(row.original)
                  }
                  style={{ ...(navigateOnRowClick && { cursor: "pointer" }) }}
                >
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} style={{ width: cell.column.getSize() }}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </DataRow>
              ))
            )}

            {rows.length === 0 && (
              <div
                style={{
                  height: theme.sizing.s44,
                  marginTop: theme.spacing.s16,
                }}
              >
                <LoadingWrapper>
                  <p
                    role="no-row-data"
                    style={{
                      margin: theme.spacing.s16,
                      fontSize: theme.sizing.f18,
                      fontWeight: theme.typography.fontWeight.semiBold,
                    }}
                  >
                    No result found!
                  </p>
                </LoadingWrapper>
              </div>
            )}
          </tbody>
        </StyledTable>
        {table.getCanNextPage() && (
          <div
            style={{
              marginTop: theme.spacing.s16,
              display: "flex",
              justifyContent: "start",
              alignItems: "center",
              gap: theme.spacing.s16,
            }}
          >
            <Button
              text="First page"
              disabled={!table.getCanPreviousPage()}
              onClick={() => table.setPageIndex(0)}
            />

            <PaginationButton disabled={!table.getCanPreviousPage()}>
              <FaAngleLeft
                className="icon-button"
                onClick={() =>
                  table.getCanPreviousPage() && table.previousPage()
                }
              />
              <p>Previous page</p>
            </PaginationButton>
            <PaginationButton disabled={!table.getCanNextPage()}>
              <FaAngleRight
                className="icon-button"
                onClick={() => table.getCanNextPage() && table.nextPage()}
              />
              <p>Next page</p>
            </PaginationButton>

            <Button
              text="Last page"
              disabled={!table.getCanNextPage()}
              onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            />
          </div>
        )}
      </TableWrapper>
    </>
  );
};

export default BaseTable;
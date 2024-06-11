import React, { useMemo, useState } from "react";
import styled, { useTheme } from "styled-components";
import { FaCaretDown, FaCaretUp } from "react-icons/fa";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  getExpandedRowModel,
  getGroupedRowModel,
} from "@tanstack/react-table";
import { ClipLoader } from "react-spinners";
import data from "./students.json";

const TableWrapper = styled.div`
  overflow-x: auto;
  background-color: ${({ theme }) => theme.palette.background.default};
  border-radius: ${({ theme }) => theme.borderRadius.container};
  padding: ${({ theme }) => theme.spacing.s8};
  transition: all 0.3s ease;
  &::-webkit-scrollbar {
    height: 5px;
    width: 5px;
  }
  &::-webkit-scrollbar-track {
    box-shadow: inset 0 0 5px grey;
    border-radius: ${({ theme }) => theme.borderRadius.container};
  }
  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.palette.primary.main};
    border-radius: 10px;
  }
  &::-webkit-scrollbar-thumb:hover {
    background: ${({ theme }) => theme.palette.primary.dark};
  }
`;

const StyledTable = styled.table`
  border-collapse: collapse;
  width: 100%;
  p {
    margin: 0;
  }
  th {
    background-color: aliceblue;
    text-align: center;
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
  }
  th,
  td {
    border: 1px solid ${({ theme }) => theme.palette.border.secondary};
    border-collapse: collapse;
  }
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

const ClassificationTable = ({
  columns,
  height,
  isLoading,
  title,
  toolbarActions,
  navigateOnRowClick,
}) => {
  const theme = useTheme();
  const [showFilterForm, setShowFilterForm] = useState(false);
  const [sorting, setSorting] = useState([]);
  const [filtering, setFiltering] = useState("");
  const [grouping, setGrouping] = useState([]);

  const table = useReactTable({
    data,
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
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setFiltering,
  });

  return (
    <>
      <TableWrapper style={{ height: height ? height : "auto" }}>
        <StyledTable>
          <thead style={{ width: table.getTotalSize() }}>
            {table.getHeaderGroups().map((headerGroup) => (
              <HeadingRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  const isGrouped =
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
                        borderCollapse: isGrouped ? "collapse" : "none",
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
            {table.getRowModel().rows.map((row) => (
              <DataRow
                key={row.id}
                onClick={() =>
                  navigateOnRowClick && navigateOnRowClick(row.original)
                }
                style={{ ...(navigateOnRowClick && { cursor: "pointer" }) }}
              >
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} style={{ width: cell.column.getSize() }}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </DataRow>
            ))}
          </tbody>
        </StyledTable>
        <div style={{ textAlign: "center" }}>{isLoading && <ClipLoader />}</div>
      </TableWrapper>
    </>
  );
};

export default ClassificationTable;

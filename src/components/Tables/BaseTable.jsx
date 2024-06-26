import { useMemo, useState } from "react";
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
} from "@tanstack/react-table";
import { ClipLoader } from "react-spinners";
import SearchBar from "../SearchBar";
import IconButton from "../IconButton";
import { HiMiniViewColumns } from "react-icons/hi2";
import Menu from "../Menu";
import { humanizeString } from "../../helpers";
import Button from "../Button";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import LoanFilterForm from "../LoanFilterForm";

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
  width: 100%;

  p {
    margin: 0;
  }
  th {
    text-align: left;
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

const PaginationButton = styled.div`
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

const BaseTable = ({
  data,
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

  const [anchorEl, setAnchorEl] = useState(null);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    columnResizeMode: "onChange",
    state: {
      sorting: sorting,
      globalFilter: filtering,
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setFiltering,
  });

  return (
    <>
      <LoanFilterForm showFilters={showFilterForm} />
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
          {title && <Title>{title}</Title>}
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
            />
          </div>
        </div>
        <div style={{ display: "flex", gap: theme.spacing.s12 }}>
          <div>
            {showFilterForm ? (
              <IconButton onClick={(e) => setShowFilterForm(!showFilterForm)}>
                <TbFilterEdit className="icon" />
              </IconButton>
            ) : (
              <IconButton onClick={(e) => setShowFilterForm(!showFilterForm)}>
                <TbFilter className="icon" />
              </IconButton>
            )}
          </div>
          <div>
            <IconButton onClick={(e) => setAnchorEl(e.currentTarget)}>
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
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    onClick={header.column.getToggleSortingHandler()}
                    style={{
                      cursor: "pointer",
                      width: header.getSize(),
                    }}
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                    {
                      <>
                        <FaCaretUp
                          style={{
                            display:
                              header.column.getIsSorted() === "asc"
                                ? "inline"
                                : "none",
                          }}
                        />
                        <FaCaretDown
                          style={{
                            display:
                              header.column.getIsSorted() === "desc"
                                ? "inline"
                                : "none",
                          }}
                        />
                      </>
                    }
                    <div
                      onMouseDown={header.getResizeHandler()}
                      onTouchStart={header.getResizeHandler()}
                      className={`${header.column.getIsResizing() && "active"}`}
                      style={{
                        backgroundColor:
                          header.column.getIsResizing() &&
                          theme.palette.secondary.dark,
                      }}
                    />
                  </th>
                ))}
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
                style={{
                  ...(navigateOnRowClick && { cursor: "pointer" }),
                }}
              >
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    style={{
                      width: cell.column.getSize(),
                    }}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </DataRow>
            ))}
          </tbody>
        </StyledTable>
        <div style={{ textAlign: "center" }}>{isLoading && <ClipLoader />}</div>
        <div
          style={{
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
              onClick={() => table.getCanPreviousPage() && table.previousPage()}
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
      </TableWrapper>
    </>
  );
};

export default BaseTable;

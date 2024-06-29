import { render, screen } from "@testing-library/react";
import { ThemeProvider } from "styled-components";
import { theme } from "../../src/theme";
import React from "react";
import BaseTable from "../../src/components/Tables/BaseTable";
import { debug } from "console";
import { ColumnDef } from "@tanstack/react-table";
import userEvent from '@testing-library/user-event'

describe("DataItems", () => {
  const rows = [
    { id: 1, name: "test1" },
    { id: 2, name: "test2" }
  ]

  const columns = [
    { accessorKey: "id", header: "ID" },
    { accessorKey: "name", header: "Name" }
  ]

  const renderComponent = ({ loading, tableLoading, rows, columns, noDataMessage, title, showAdvanceFilters, height }: { loading?: boolean, tableLoading?: boolean, rows?: object[], columns?: ColumnDef<object, any>[], noDataMessage?: string, title?: string, showAdvanceFilters?: boolean, height?: string }) => {
    render(
      <ThemeProvider theme={theme.light}>
        <BaseTable rows={rows || []} columns={columns || []} noDataMessage={noDataMessage} loading={loading} tableLoading={tableLoading} title={title} showAdvanceFilters={showAdvanceFilters} height={height} />
      </ThemeProvider>
    );

    const getTableRows = () => {
      let tableRows = screen.getAllByRole("row");
      // Slicing to remove table header row
      let dataRows = tableRows.slice(1);
      return dataRows
    }

    const getTableColumns = () => screen.getAllByRole("columnheader");

    return { getTableRows, getTableColumns };

  }

  it('should show loading indicator when loading is true', () => {
    renderComponent({ loading: true });

    const loading = screen.getByRole("loding-table");
    expect(loading).toBeInTheDocument();

  })

  it('should show not loading indicator when loading is false', () => {

    renderComponent({ loading: false });

    const loading = screen.queryByRole("loding-table");

    expect(loading).not.toBeInTheDocument();

  })

  it('should should show no data message if colums is empty', () => {

    renderComponent({ loading: false, rows: rows, columns: [] });

    expect(screen.getByRole("no-data")).toBeInTheDocument();

  })


  it('should should show no data message if rows is empty', () => {

    renderComponent({ loading: false, rows: [], columns: columns });

    expect(screen.getByRole("no-row-data")).toBeInTheDocument();

  })

  it('should should show no data message if rows and columns are empty', () => {

    renderComponent({ loading: false, rows: [], columns: [] });

    expect(screen.getByRole("no-data")).toBeInTheDocument();
  })


  it('should have exact number of columns', () => {



    renderComponent({
      loading: false, rows: rows, columns: columns
    });

    columns.forEach((column) => {
      expect(screen.getByText(column.header)).toBeInTheDocument();
    })

    // expect(screen.getAllByRole("columnheader").length).toBe(columns.length); 

    expect(screen.getAllByRole("columnheader")).toHaveLength(columns.length);
  })


  it('should have exact number of table rows to the number of row data', () => {

    renderComponent({
      loading: false, rows: rows, columns: columns
    });

    rows.forEach((row) => {
      expect(screen.getByText(row.name)).toBeInTheDocument();
    })
    const tableRows = screen.getAllByRole("row");
    // slicing to remove header
    const dataRows = tableRows.slice(1);
    expect(dataRows).toHaveLength(rows.length)
  })

  it('should should show custom no data message if provided', () => {

    renderComponent({ loading: false, rows: [], columns: [], noDataMessage: "Custom No Data Message" });

    expect(screen.getByRole("no-data")).toHaveTextContent("Custom No Data Message");

  })


  it('should should not show toggle filter button if showadvancefilters is false', async () => {

    renderComponent({ loading: false, rows: rows, columns: columns, showAdvanceFilters: false });
    const filtertogglebutton = screen.queryByRole("toggle-advance-filters");
    expect(filtertogglebutton).not.toBeInTheDocument();
  })


  it('should should show toggle filter button if showadvancefilters is true', async () => {
    renderComponent({ loading: false, rows: rows, columns: columns, showadvancefilters: true });
    const filtertogglebutton = screen.getByRole("toggle-advance-filters");

    expect(filtertogglebutton).toBeInTheDocument();
  })

  it('should should not show filter form if showFilterForm is flase', async () => {

    renderComponent({ loading: false, rows: rows, columns: columns });
    let filterForm = screen.queryByRole("advance-filters-form");
    expect(filterForm).not.toBeInTheDocument();

  })

  it('should should show filter form if showFilterForm is true', async () => {

    renderComponent({ loading: false, rows: rows, columns: columns });
    const filterToggleButton = screen.getByRole("toggle-advance-filters");

    const user = userEvent.setup();

    let filterForm = screen.queryByRole("advance-filters-form");
    expect(filterForm).not.toBeInTheDocument();
    await user.click(filterToggleButton);
    filterForm = screen.getByRole("advance-filters-form");
    expect(filterForm).toBeInTheDocument();
  })


  it('should not display title if not provided', () => {

    renderComponent({
      loading: false, rows: rows, columns: columns
    });
    expect(screen.queryByRole("table-title")).not.toBeInTheDocument();

  })


  it('should display title if provided', () => {

    renderComponent({
      loading: false, rows: rows, columns: columns, title: "Test Title"
    });
    expect(screen.getByRole("table-title")).toBeInTheDocument();
  })

  it('should internal filter the table on keyword change on search input', async () => {

    const { getTableRows, getTableColumns } = renderComponent({
      loading: false, rows: rows, columns: columns
    });

    expect(getTableRows()).toHaveLength(2);
    expect(getTableColumns()).toHaveLength(2);

    const searchInput = screen.getByPlaceholderText(/search/i);
    const user = userEvent.setup();
    await user.type(searchInput, "notest");
    expect(getTableRows()).toHaveLength(0);
  })


  it('should have column visibility toggles for all the columns in the table', async () => {

    renderComponent({
      loading: false, rows: rows, columns: columns
    });
    const showMenuButton = screen.getByRole("show-hide-columns-menu");
    const user = userEvent.setup();

    expect(screen.queryByRole("checkbox")).not.toBeInTheDocument();

    await user.click(showMenuButton);

    const columnToggles = screen.getAllByRole("checkbox");
    expect(columnToggles).toHaveLength(columns.length);
  });


  it('should should toggle the visibility of the columns on click ', async () => {

    const { getTableColumns } = renderComponent({
      loading: false, rows: rows, columns: columns
    });
    const showMenuButton = screen.getByRole("show-hide-columns-menu");
    const user = userEvent.setup();

    await user.click(showMenuButton);
    const columnToggles = screen.getAllByRole("checkbox");

    expect(columnToggles).toHaveLength(columns.length);
    expect(getTableColumns()).toHaveLength(columns.length);
    expect(columnToggles[0]).toBeChecked();

    await user.click(columnToggles[0]);

    expect(getTableColumns()).toHaveLength(columns.length - 1);
    expect(columnToggles[0]).not.toBeChecked();
    expect(getTableColumns()).not.toContain(columns[0]);

  });


  it('should have the fixed height if provided', () => {

    renderComponent({
      loading: false, rows: rows, columns: columns, height: "300px"
    });

    // taking closes div because height style is applied on the parant of the table
    const table = screen.getByRole("table").closest("div");
    expect(table!.style.height).toBe("300px");
  })

  it('should have the auto height if not provided', () => {

    renderComponent({
      loading: false, rows: rows, columns: columns});

    // taking closes div because height style is applied on the parant of the table
    const table = screen.getByRole("table").closest("div");
    expect(table!.style.height).toBe("auto");
  })

  it('should have loading indicator if tableLoading is true', () => {

    const { getTableRows } = renderComponent({ loading: false, tableLoading: true, rows: rows, columns: columns});
    
    const loadingIndicator = screen.getByRole("table-loading-indicator");
    expect(loadingIndicator).toBeInTheDocument();
    expect(getTableRows()).toHaveLength(0);
  })

  it('should have rows if tableLoading is false', () => {

    const { getTableRows } = renderComponent({ loading: false, tableLoading: false, rows: rows, columns: columns});
    
    const loadingIndicator = screen.queryByRole("table-loading-indicator");
    expect(loadingIndicator).not.toBeInTheDocument();
    expect(getTableRows()).toHaveLength(rows.length);
  })

});

import React from "react";
import styled, { useTheme } from "styled-components";
import { hexWithOpacity } from "../../helpers";

const Wrapper = styled.div`
  table,
  th,
  td {
    border-collapse: collapse;
  }
  th,
  td {
    border: 1px solid rgba(0, 0, 0, 0.2);
  }
  tr {
    border-radius: ${({ theme }) => theme.borderRadius.input};
    display: flex;
    flex-wrap: wrap;
    overflow: hidden;
    width: 100%;
    & > div {
      flex-grow: 1;
      display: flex;
      th {
        align-content: center;
        padding-left: ${({ theme }) => theme.spacing.s12};
        padding-right: ${({ theme }) => theme.spacing.s12};
        text-align: end;
        font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
        color: ${({ theme }) => theme.palette.text.primary};
        font-size: ${({ theme }) => theme.typography.fontSize.f16};
        background-color: ${({ theme }) =>
          hexWithOpacity(theme.palette.primary.main, 10)};
      }
      td {
        flex-grow: 1;
        align-content: center;
        padding-left: ${({ theme }) => theme.spacing.s12};
        padding-right: ${({ theme }) => theme.spacing.s12};
        font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
        color: ${({ theme }) => theme.palette.text.primary};
        font-size: ${({ theme }) => theme.typography.fontSize.f16};
      }
    }
  }
  th,
  td {
    /* border: 1px solid green; */
    height: ${({ theme }) => theme.sizing.s36};
    /* margin: 2px; */
  }
`;

function DetailsTable() {
  const theme = useTheme();
  return (
    <div>
      <Wrapper
        className="table-container"
        style={{
          margin: "auto",
          backgroundColor: theme.palette.background.default,
          borderRadius: theme.borderRadius.input,
          border: `1px solid ${theme.palette.border.primary}`,
          overflow: "hidden",
        }}
      >
        <table
          style={{
            borderRadius: theme.borderRadius.input,
          }}
        >
          <tr style={{}}>
            <div>
              <th>
                <span>Father's Name :</span>
              </th>
              <td colSpan="1">
                <span>William H. Gates Sr.</span>
              </td>
            </div>
            <div>
              <th>
                <span>Mothers's Name :</span>
              </th>
              <td colSpan="2">
                <span>William H. Gates Sr.</span>
              </td>
            </div>
            <div>
              <th>
                <span>Father's Name :</span>
              </th>
              <td colSpan="2">
                <span>William H. Gates Sr.</span>
              </td>
            </div>
            <div>
              <th>
                <span>Father's Name :</span>
              </th>
              <td colSpan="2">
                <span>William H. Gates Sr.</span>
              </td>
            </div>
            <div>
              <th>
                <span>Address :</span>
              </th>
              <td colSpan="2">
                <span>WKathmandu, NP</span>
              </td>
            </div>
            <div>
              <th>
                <span>DOB:</span>
              </th>
              <td colSpan="2">
                <span>2022-01-01</span>
              </td>
            </div>
            <div>
              <th>
                <span>Mother's Name :</span>
              </th>
              <td colSpan="2">
                <span>William H. Gates Sr.</span>
              </td>
            </div>
            <div>
              <th>
                <span>Company Name:</span>
              </th>
              <td colSpan="2">
                <span>CCIP</span>
              </td>
            </div>
            <div>
              <th>
                <span>Father's Name :</span>
              </th>
              <td colSpan="2">
                <span>William H. Gates Sr.</span>
              </td>
            </div>
          </tr>
          <tr style={{}}>
            <div>
              <th>
                <span>Father's Name :</span>
              </th>
              <td colSpan="1">
                <span>William H. Gates Sr.</span>
              </td>
            </div>
            <div>
              <th>
                <span>Mothers's Name :</span>
              </th>
              <td colSpan="2">
                <span>William H. Gates Sr.</span>
              </td>
            </div>
            <div>
              <th>
                <span>Father's Name :</span>
              </th>
              <td colSpan="2">
                <span>William H. Gates Sr.</span>
              </td>
            </div>
            <div>
              <th>
                <span>Father's Name :</span>
              </th>
              <td colSpan="2">
                <span>William H. Gates Sr.</span>
              </td>
            </div>
            <div>
              <th>
                <span>Address :</span>
              </th>
              <td colSpan="2">
                <span>WKathmandu, NP</span>
              </td>
            </div>
            <div>
              <th>
                <span>DOB:</span>
              </th>
              <td colSpan="2">
                <span>2022-01-01</span>
              </td>
            </div>
            <div>
              <th>
                <span>Mother's Name :</span>
              </th>
              <td colSpan="2">
                <span>William H. Gates Sr.</span>
              </td>
            </div>
            <div>
              <th>
                <span>Company Name:</span>
              </th>
              <td colSpan="2">
                <span>CCIP</span>
              </td>
            </div>
            <div>
              <th>
                <span>Father's Name :</span>
              </th>
              <td colSpan="2">
                <span>William H. Gates Sr.</span>
              </td>
            </div>
          </tr>
        </table>
      </Wrapper>
    </div>
  );
}

export default DetailsTable;

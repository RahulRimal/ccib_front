import React from "react";
import styled, { useTheme } from "styled-components";
import { hexWithOpacity } from "../../helpers";
const Wrapper = styled.div`
  table,
  th,
  td {
    border-collapse: collapse;
  }

  tr {
    border-radius: ${({ theme }) => theme.borderRadius.input};
    display: flex;
    flex-wrap: wrap;
    overflow: hidden;
    width: 100%;
    border: 1px solid ${({ theme }) => theme.palette.border.primary};
    border-collapse: collapse;
    & > div {
      ${({ theme }) => hexWithOpacity(theme.palette.border.focused, 10)};
      flex-grow: 1;
      display: flex;
      border: 1px solid ${({ theme }) => theme.palette.border.primary};
      th {
        min-width: 200px;
        align-content: center;
        padding-left: ${({ theme }) => theme.spacing.s12};
        padding-right: ${({ theme }) => theme.spacing.s12};
        text-align: end;
        font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
        color: ${({ theme }) => theme.palette.text.primary};
        font-size: ${({ theme }) => theme.typography.fontSize.f16};
        background-color: ${({ theme }) =>
          hexWithOpacity(theme.palette.primary.dark, 10)};
      }
      td {
        min-width: 250px;
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
    height: ${({ theme }) => theme.sizing.s44};
  }
`;
const Title = styled.p`
  margin-bottom: ${({ theme }) => theme.spacing.s8};
  padding-bottom: ${({ theme }) => theme.spacing.s8};
  font-size: ${({ theme }) => theme.typography.fontSize.f20};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semiBold};
`;
function UserDetailsTable() {
  const theme = useTheme();
  return (
    <div style={{ width: "100%", marginBottom: "100px" }}>
      <Wrapper
        className="table-container"
        style={{
          margin: "auto",
          padding: `${theme.spacing.s20} ${theme.spacing.s12} `,
        }}
      >
        <Title>User Status Details</Title>
        <table>
          <tr style={{}}>
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
                <span>Father's Name :</span>
              </th>
              <td colSpan="2">
                <span>William H. Gates Sr.</span>
              </td>
            </div>
            <div>
              <th>
                <span>Father's Name hj hjh:</span>
              </th>
              <td colSpan="2">
                <span>William H. Gates Sr.</span>
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
                <span>Father's Name hj hjh:</span>
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
          </tr>
        </table>
      </Wrapper>
    </div>
  );
}

export default UserDetailsTable;

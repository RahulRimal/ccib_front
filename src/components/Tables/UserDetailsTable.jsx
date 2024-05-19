import React from "react";
import styled, { useTheme } from "styled-components";

const Wrapper = styled.div`
  table,
  th,
  td {
    border: 1px solid rgba(0, 0, 0, 0.3);
    border-collapse: collapse;
  }
  tr {
    border-radius: ${({ theme }) => theme.borderRadius.container};
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
    height: ${({ theme }) => theme.sizing.s44};
  }
`;
const Title = styled.p`
  width: ${({ theme }) => theme.sizing.s288};
  padding-left: ${({ theme }) => theme.spacing.s28};
  padding-right: ${({ theme }) => theme.spacing.s28};
  margin-bottom: ${({ theme }) => theme.spacing.s8};
  background-color: #60ae50;
  color: ${({ theme }) => theme.palette.text.white};
  line-height: ${({ theme }) => theme.sizing.s36};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semiBold};
  border-radius: ${({ theme }) => theme.borderRadius.container};
`;
function UserDetailsTable() {
    const theme = useTheme();
    return (
        <div style={{ width: "100%", marginBottom: "100px" }}>
            <Wrapper
                className="table-container"
                style={{ margin: "auto", padding: theme.spacing.s20 }}
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
                                <span>Father's Nksjdksk kjhdksame :</span>
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
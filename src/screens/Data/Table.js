import React, { useState } from "react";

import styled from "styled-components";

import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";

const columns = [
  { id: "rowIndex", label: "Id" },
  { id: "Date", label: "Date" },
  { id: "Who", label: "Who" },
  { id: "Amount", label: "Amount" },
  { id: "Type", label: "Type" },
];

const useStyles = makeStyles({
  root: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "10px",
    display: "flex",
    margin: 0,
    height: "100%",
    padding: 0,
  },
  container: {
    maxHeight: window.innerHeight - 170 + "px",
  },
  tableCell: {
    fontSize: "10px",
    padding: "2px",
  },
  paginator: {
    fontSize: "10px",
    padding: 0,
    "& div": {
      padding: 0,
    },
  },
});

const AbsoluteContainer = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #eee;
  top: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  font-size: 10px;
`;

const DataTable = (props) => {
  const { data } = props;
  const classes = useStyles();

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(100);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <AbsoluteContainer>
      <Container maxWidth="sm" className={classes.root}>
        {data ? (
          <div
            style={{
              display: "flex",
              flex: 1,
              flexDirection: "column",
              height: "100%",
              boxSizing: "border-box",
              padding: "50px 5px 70px 5px",
            }}
          >
            <TableContainer className={classes.container}>
              <Table stickyHeader size="small" aria-label="a dense table">
                <TableHead>
                  <TableRow>
                    {columns.map((column) => (
                      <TableCell
                        key={column.id}
                        align={column.align}
                        style={{ minWidth: column.minWidth }}
                        className={classes.tableCell}
                      >
                        {column.label}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => {
                      return (
                        <TableRow hover tabIndex={-1} key={row.rowIndex}>
                          {columns.map((column) => {
                            const value = row[column.id];
                            return (
                              <TableCell
                                key={column.id}
                                align={column.align}
                                className={classes.tableCell}
                              >
                                {column.format && typeof value === "number"
                                  ? column.format(value)
                                  : value}
                              </TableCell>
                            );
                          })}
                        </TableRow>
                      );
                    })}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              className={classes.paginator}
              rowsPerPageOptions={[25, 50, 100]}
              component="div"
              count={data.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onChangePage={handleChangePage}
              onChangeRowsPerPage={handleChangeRowsPerPage}
            />
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </Container>
    </AbsoluteContainer>
  );
};

export default DataTable;

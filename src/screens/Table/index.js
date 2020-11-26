import React, { useEffect, useState, useContext } from "react";
import { GoogleSpreadsheet } from "google-spreadsheet";
import UserContext from "../../components/userContext";
import { dateParser } from "../../config/date";

import { AbsoluteContainerStyled } from "./styles";

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
    maxHeight: window.innerHeight - 140 + "px",
  },
  tableCell: {
    fontSize: "10px",
    padding: "2px",
  },
  paginator: {
    fontSize: "10px",
  },
});

const DataTable = (props) => {
  const classes = useStyles();
  const userContext = useContext(UserContext);
  const { jsonFile, spreadsheetId, name } = userContext.user;

  const { closeAction } = props;

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(100);
  const [rows, setRows] = useState(null);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleClose = () => {
    closeAction();
  };

  useEffect(() => {
    loadTable();
  }, []);

  const loadTable = async () => {
    try {
      const doc = new GoogleSpreadsheet(spreadsheetId);
      await doc.useServiceAccountAuth(jsonFile);
      await doc.loadInfo();

      const sheet = doc.sheetsByIndex[0];
      const fetchedRows = await sheet.getRows();
      const sortedRows = fetchedRows.sort(
        (a, b) => dateParser(b.Date) - dateParser(a.Date)
      );
      setRows(sortedRows);
    } catch (e) {
      alert(`Hubo un error en la autenticación: ${e.message}`);
      userContext.newUser(null);
    }
  };

  return (
    <AbsoluteContainerStyled>
      <div className="close" onClick={handleClose}>
        CLOSE
      </div>
      <Container maxWidth="sm" className={classes.root}>
        {rows ? (
          <div
            style={{
              display: "flex",
              flex: 1,
              flexDirection: "column",
              height: "100%",
              boxSizing: "border-box",
              padding: "5px 5px 70px 5px",
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
                  {rows
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
              count={rows.length}
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
    </AbsoluteContainerStyled>
  );
};

export default DataTable;

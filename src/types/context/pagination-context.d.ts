/**  */
interface PaginationContextInterface {
  pagination: number;
  setPagination: (number: number) => void;
  resetPagination: () => void;
  paginationQuery: string;
  rowsPerPage: number;
  setRowsPerPage: (rowsN: number) => void;
}

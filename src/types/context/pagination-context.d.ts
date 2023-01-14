/**  */
export interface PaginationContextInterface {
  pagination: number;
  setPagination: (number: number) => void;
  resetPagination: () => void;
  paginationQuery: () => string;
}

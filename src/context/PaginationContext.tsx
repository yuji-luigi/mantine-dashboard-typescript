import React, { createContext, ReactNode, useContext, useState } from 'react';

// This custom hook is to control entity of the dashboard page: jsonFormField, sectionJson.
// And CrudPagenNumber component state.
// Also childEntity state to control when creating child entity in the parent page ex: create area from building page.

const useStore = () => {
  // PagenNumber status state.
  const [pagination, setPagination] = useState(0);
  const [rowsPerPage, setRowPerPage] = useState(10);

  return {
    pagination,
    setPagination: (number: number) => setPagination(number),
    resetPagination: () => setPagination(0),
    /** ? in this string might not be needed */
    paginationQuery: `?skip=${pagination}&limit=${rowsPerPage}`,
    rowsPerPage,
    setRowsPerPage: (rowsN: number) => setRowPerPage(rowsN),
  };
};

// can be null. set this to get extra support by intellisense
const PaginationContext = createContext<PaginationContextInterface>({
  /** example @return {number} */
  pagination: 0,
  /** example @return {void} */
  resetPagination: () => {},
  setPagination: () => {},
  /** @return {string} */
  paginationQuery: '',
  rowsPerPage: 10,
  setRowsPerPage: () => {},
});

export const PaginationContextProvider = ({ children }: { children: ReactNode }) => (
  <PaginationContext.Provider value={useStore()}>{children}</PaginationContext.Provider>
);

// Facade pattern to facilitate use of contexts (custom facade hooks)

// based on entity set use redux actions and set formfield and sections
// In case of using CrudPagenNumber to create child entity use entity from this. childEntity.
// Use this hook to send requet.body.__parent and in the api will handle saving in parent.

/**
 *  define hooks here in the context to use all of them
 *  with usePaginationContext
 * */
/** define hooks pagination related */
export const usePagination = () => useContext(PaginationContext).pagination;
export const useSetPagination = () => useContext(PaginationContext).setPagination;
export const usePaginationQuery = () => useContext(PaginationContext).paginationQuery;
/** define hooks related to limit query */
export const useRowsPerPage = () => useContext(PaginationContext).rowsPerPage;
export const useSetRowsPerPage = () => useContext(PaginationContext).setRowsPerPage;

// this hook to use easily
export const usePaginationContext = () => ({
  pagination: usePagination(),
  setPagination: useSetPagination(),
  paginationQuery: usePaginationQuery(),
  rowsPerPage: useRowsPerPage(),
  setRowsPerPage: useSetRowsPerPage(),
});

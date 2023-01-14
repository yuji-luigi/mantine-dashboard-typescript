import React, { createContext, ReactNode, useContext, useState } from 'react';
import { PaginationContextInterface } from '../types/context/pagination-context';

// This custom hook is to control entity of the dashboard page: jsonFormField, sectionJson.
// And CrudPagenNumber component state.
// Also childEntity state to control when creating child entity in the parent page ex: create area from building page.

const useStore = () => {
  // PagenNumber status state.
  const [pagination, setPagination] = useState(0);

  return {
    pagination,
    setPagination: (number: number) => setPagination(number),
    resetPagination: () => setPagination(0),
    paginationQuery: () => `?skip=${pagination}`,
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
  paginationQuery: () => '',
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

const usePagination = () => useContext(PaginationContext).pagination;
const useSetPagination = () => useContext(PaginationContext).setPagination;

// this hook to use easily
export const usePaginationContext = () => ({
  pagination: usePagination(),
  useSetPagination: useSetPagination(),
});

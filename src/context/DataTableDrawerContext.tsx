import React, { createContext, ReactNode, useContext, useState, useReducer } from 'react';

// import { useCrudSlice } from '../../hooks/redux-hooks/useCrudSlice';
import { useCrudSliceStore } from '../redux/features/crud/crudSlice';
import { Sections } from '../types/general/data/sections-type';

// This custom hook is to control entity of the dashboard page: jsonFormField, sectionJson.
// And CrudDrawer component state.
// Also childEntity state to control when creating child entity in the parent page ex: create area from building page.

function drawerFormStateReducer(state: ReducerState, action: DrawerStateAction) {
  const { type /* ,payload */ } = action;

  const reducerStore = {
    linkedChildren: { mode: 'linkedChildren' },
    reset: { mode: '', age: 0 },
  };

  const returnValue = reducerStore[type] || null;

  if (returnValue) {
    return { ...state, ...returnValue } as ReducerState;
  }
  throw Error('unknown action');
  // return newState;
}

const useStore = () => {
  const { selectCrudDocument } = useCrudSliceStore();
  // const { selectCrudDocument } = useCrudSlice();

  // Drawer status state.
  const [drawerIsOpen, setDrawerIsOpen] = useState(false);
  // not using now 15/1/2023
  const [drawerFormState, drawerFormStateDispatch] = useReducer(drawerFormStateReducer, {
    mode: '',
  });

  // const [isChildrenPage, setIsChildrenPage] = useState(false);

  return {
    drawerIsOpen,
    openDrawer: () => setDrawerIsOpen(true),
    /** every time close the drawer set selectedDocument to null */
    closeDrawer: (entity?: Sections) => {
      if (entity) {
        selectCrudDocument({ entity, document: null });
      }
      setDrawerIsOpen(false);
    },
    // closeDrawer: () => {
    //   setDrawerIsOpen(false);
    // },
    toggleOpenDrawer: () => setDrawerIsOpen((prev) => !prev),
    drawerFormState,
    drawerFormStateDispatch,
    // isChildrenPage,
    // setIsChildrenPage: (bool: boolean) => setIsChildrenPage(bool),
  };
};

// can be null. set this to get extra support by intellisense
const DrawerContext = createContext<DrawerContextInterface>({
  drawerIsOpen: false,
  openDrawer: () => {},
  closeDrawer: () => {},
  toggleOpenDrawer: () => {},
  drawerFormState: { mode: '' },
  drawerFormStateDispatch: () => {},
  // isChildrenPage: false,
  // setIsChildrenPage: () => {},
});

export const DrawerContextProvider = ({ children }: { children: ReactNode }) => (
  <DrawerContext.Provider value={useStore()}>{children}</DrawerContext.Provider>
);

// Facade pattern to facilitate use of contexts (custom facade hooks)

// based on entity set use redux actions and set formfield and sections
// In case of using CrudDrawer to create child entity use entity from this. childEntity.
// Use this hook to send requet.body.__parent and in the api will handle saving in parent.

// Drawer status contexts hooks
export const useDrawerIsOpen = () => useContext(DrawerContext).drawerIsOpen;
export const useOpenDrawer = () => useContext(DrawerContext).openDrawer;
export const useCloseDrawer = () => useContext(DrawerContext).closeDrawer;
export const useToggleOpenDrawer = () => useContext(DrawerContext).toggleOpenDrawer;

// this hook to use easily
// export const useDrawerContext = () => ({
//   drawerIsOpen: useDrawerIsOpen(),
//   openDrawer: useOpenDrawer(),
//   closeDrawer: useCloseDrawer(),
//   toggleOpenDrawer: useToggleOpenDrawer(),
// });
export const useDrawerContext = () => useContext(DrawerContext);

// Planning specific drawer state

// Crud Status for flash message at the top
// export const useCrudSuccess = () => useContext(DrawerContext).crudSuccess;
// export const useSetCrudSuccess = () => useContext(DrawerContext).setCrudSuccess;
// export const useCrudError = () => useContext(DrawerContext).crudError;
// export const useSetCrudError = () => useContext(DrawerContext).setCrudError;

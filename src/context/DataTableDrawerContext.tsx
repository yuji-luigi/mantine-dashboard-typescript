import React, { createContext, ReactNode, useContext, useState } from 'react';

// This custom hook is to control entity of the dashboard page: jsonFormField, sectionJson.
// And CrudDrawer component state.
// Also childEntity state to control when creating child entity in the parent page ex: create area from building page.

const useStore = () => {
  // Drawer status state.
  const [drawerIsOpen, setDrawerIsOpen] = useState(false);
  // initial entity set to idle set make condition based on this initial value in
  // index.slice.js
  // const [entity, setEntity] = useState('idle');
  // // When create child entity we use this state and eventually clear state.
  // const [childEntity, setChildEntity] = useState('');
  // // Usually id of the building. but in the future we can use this for others. (supply...etc)
  // const [parentId, setParentId] = useState('');
  // // flash(snackbar status for all entity)
  // const [crudSuccess, setCrudSuccess] = useState(false);
  // const [crudError, setCrudError] = useState(null);
  return {
    drawerIsOpen,
    openDrawer: () => setDrawerIsOpen(true),
    closeDrawer: () => {
      setDrawerIsOpen(false);
      // setChildEntity(''); // set child entity to '' and automatically update drawer entity
      // setParentId(''); // set parent id to ''
    },
    toggleOpenDrawer: () => setDrawerIsOpen((prev) => !prev),
  };
};

// can be null. set this to get extra support by intellisense
const DrawerContext = createContext({
  // entity: '',
  // setEntity: () => {},
  // childEntity: '',
  // setChildEntity: () => {},
  // clearChildEntity: () => {},
  // parentId: '',
  // setParentId: () => {},
  drawerIsOpen: false,
  openDrawer: () => {},
  closeDrawer: () => {},
  toggleOpenDrawer: () => {},
  // crudSuccess: false,
  // setCrudSuccess: () => {},
  // crudError: null,
  // setCrudError: () => {},
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
export const useDrawerContext = () => ({
  drawerIsOpen: useDrawerIsOpen(),
  openDrawer: useOpenDrawer(),
  closeDrawer: useCloseDrawer(),
  toggleOpenDrawer: useToggleOpenDrawer(),
});

// Planning specific drawer state

// Crud Status for flash message at the top
// export const useCrudSuccess = () => useContext(DrawerContext).crudSuccess;
// export const useSetCrudSuccess = () => useContext(DrawerContext).setCrudSuccess;
// export const useCrudError = () => useContext(DrawerContext).crudError;
// export const useSetCrudError = () => useContext(DrawerContext).setCrudError;

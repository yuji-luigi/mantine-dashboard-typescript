import React, { useState, useCallback, useContext } from 'react';

// Define the context for the modals
const ModalsContext = React.createContext({
  modals: [],
  openConfirmModal: () => {},
  closeModal: () => {},
});

// Define the modals provider
export function ModalsProvider({ children }: { children: React.ReactNode }) {
  // State to keep track of the modals
  const [modals, setModals] = useState([]);

  // Function to open a confirm modal
  const openConfirmModal = useCallback(
    ({
      title,
      centered,
      children,
      onCancel,
      onConfirm,
      ...otherProps
    }: {
      title: string;
      centered: boolean;
      children: React.ReactNode;
      onCancel: () => void;
      onConfirm: () => void;
    }) => {
      // Generate a unique modal ID
      const modalId = Math.random().toString(36).substr(2, 9);

      // Create the modal object
      const modal = {
        id: modalId,
        type: 'confirm',
        title,
        centered,
        children,
        onCancel,
        onConfirm,
        ...otherProps,
      };

      // Add the modal to the modals array
      setModals((modals) => [...modals, modal]);

      // Return the modal ID for future reference
      return modalId;
    },
    []
  );

  // Function to close a modal by ID
  const closeModal = useCallback((modalId) => {
    setModals((modals) => modals.filter((modal) => modal.id !== modalId));
  }, []);

  // Define the value for the context
  const value = {
    modals,
    openConfirmModal,
    closeModal,
  };

  return <ModalsContext.Provider value={value}>{children}</ModalsContext.Provider>;
}

// Custom hook to access the modals context
export function useModals() {
  return useContext(ModalsContext);
}

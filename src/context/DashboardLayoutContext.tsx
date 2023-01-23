import { createContext, ReactNode, useState } from 'react';

export const DashboardLayoutContext = createContext<DashboardLayoutContextStates>({
  isOpen: false,
  toggleBarOpen() {},
  closeBar() {},
  openBar() {},
  setBreadcrumbs() {},
  breadcrumbs: [],
  prevBreadcrumbs: [],
  restorePrevBreadcrumbs() {},
  setPrevBreadcrumbs() {},
  setParentData() {},
  parentData: { name: '' },
});

const useStore = () => {
  const [isOpen, setBarOpen] = useState(false);
  const [breadcrumbs, setBreadcrumbs] = useState<BreadcrumbInterface[]>([]);
  const [prevBreadcrumbs, setPrevBreadcrumbs] = useState<BreadcrumbInterface[]>([]);
  const [parentData, setParentData] = useState<ParentDataInterface | {}>({});

  return {
    isOpen,
    toggleBarOpen: () => setBarOpen(!isOpen),
    closeBar: () => setBarOpen(false),
    openBar: () => setBarOpen(true),
    setBreadcrumbs: (breadcrumb: BreadcrumbInterface | null) => {
      if (breadcrumb === null) {
        setBreadcrumbs([]);
        return;
      }
      setBreadcrumbs((prev) => [...prev, breadcrumb]);
    },
    breadcrumbs,
    prevBreadcrumbs,
    parentData,
    setParentData: (data: ParentDataInterface) => setParentData(data),
    restorePrevBreadcrumbs: (prevDataArray: BreadcrumbInterface[]) => setBreadcrumbs(prevDataArray),
    setPrevBreadcrumbs,
  };
};

export const DashboardLayoutContextProvider = ({ children }: { children: ReactNode }) => (
  <DashboardLayoutContext.Provider value={useStore()}>{children}</DashboardLayoutContext.Provider>
);

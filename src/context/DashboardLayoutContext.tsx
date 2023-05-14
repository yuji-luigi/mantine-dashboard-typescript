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
  setChildrenBreadcrumbs() {},
});

const useStore = () => {
  const [isOpen, setBarOpen] = useState(false);
  const [breadcrumbs, setBreadcrumbs] = useState<BreadcrumbInterface[]>([]);
  const [prevBreadcrumbs, setPrevBreadcrumbs] = useState<BreadcrumbInterface[]>([]);
  const [parentData, setParentData] = useState<ParentDataInterface | {}>({});
  const setChildrenBreadcrumbs = (breadcrumb: BreadcrumbInterface) => {
    setBreadcrumbs((prev) => {
      const baseUrl = prev[0].href;
      const allButLast = prev.slice(0, -1);
      const idArray = prev.map((p) => p.href.split('/').pop());
      const currentid = breadcrumb.href.split('/').pop();
      const foundIndex = idArray.findIndex((id) => id === currentid);
      if (foundIndex !== -1) {
        //remove all breadcrumbs after foundIndex
        const newBreadcrumbs = prev.slice(0, foundIndex + 1);
        return newBreadcrumbs;
      }
      const newBreadcrumb = { ...breadcrumb, href: `${baseUrl}/access/${breadcrumb.href}` };
      return [...prev, newBreadcrumb];
    });
  };
  return {
    isOpen,
    toggleBarOpen: () => setBarOpen(!isOpen),
    closeBar: () => setBarOpen(false),
    openBar: () => setBarOpen(true),
    setBreadcrumbs: (breadcrumb: BreadcrumbInterface | null) => {
      if (breadcrumb === null) {
        setBreadcrumbs([{ title: 'Feed', href: '/dashboard/posts' }]);
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
    setChildrenBreadcrumbs,
  };
};

export const DashboardLayoutContextProvider = ({ children }: { children: ReactNode }) => (
  <DashboardLayoutContext.Provider value={useStore()}>{children}</DashboardLayoutContext.Provider>
);

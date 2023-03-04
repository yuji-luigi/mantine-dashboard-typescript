/** use to set page title as the parent name */
interface ParentDataInterface {
  name: string;
  /** now there is only name field we can add anything from the parent model */
}
interface DashboardLayoutContextStates {
  isOpen: boolean;
  toggleBarOpen(): void;
  closeBar(): void;
  openBar(): void;
  /** in child page set this to display section name as parent name */
  setParentData(data: ParentDataInterface): void;
  parentData?: ParentDataInterface | {};
  /** If breadcrumb is passed as null, reset the state to empty array */
  setBreadcrumbs(breadcrumb: BreadcrumbInterface | null): void;
  breadcrumbs: BreadcrumbInterface[];
  prevBreadcrumbs: BreadcrumbInterface[];
  /**
   * When reset happens but need to chain the array, load function to
   * restore the array of breadcrumbs
   */
  setPrevBreadcrumbs(data): void;
  restorePrevBreadcrumbs(prevData): void;
  /**
   * used to set parent data page as breadcrumbs. sets $rootUrl/access/:id
   * todo: when going back to parent page, the breadcrumbs should be deleted
   * */
  setChildrenBreadcrumbs(breadcrumb: BreadcrumbInterface | null): void;
}

interface BreadcrumbInterface {
  title: string;
  href: string;
}

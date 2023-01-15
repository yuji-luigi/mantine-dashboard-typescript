interface DashboardLayoutContextStates {
  isOpen: boolean;
  toggleBarOpen(): void;
  closeBar(): void;
  openBar(): void;
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
}

interface BreadcrumbInterface {
  title: string;
  href: string;
}

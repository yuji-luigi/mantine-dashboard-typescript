interface DrawerContextInterface {
  drawerIsOpen: boolean;
  openDrawer: () => void;
  closeDrawer: (entity?: Sections) => void;
  toggleOpenDrawer: () => void;
}

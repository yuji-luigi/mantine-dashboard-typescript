interface DrawerContextInterface {
  drawerIsOpen: boolean;
  openDrawer: () => void;
  closeDrawer: (entity?: Sections) => void;
  toggleOpenDrawer: () => void;
  drawerFormState: ReducerState;
  drawerFormStateDispatch: Dispatch<DrawerStateAction>;
  /** deprecated now using query.parentId by next router */
  // isChildrenPage: boolean;
  // setIsChildrenPage: (bool: boolean) => void;
}

interface ReducerStore {
  [key: string]: ReducerState;
}

interface ReducerState {
  mode: 'linkedChildren' | '';
}

type DrawerStateActionType = 'linkedChildren' | 'reset';
interface DrawerStateAction {
  type: DrawerStateActionType;
  payload?: string;
}

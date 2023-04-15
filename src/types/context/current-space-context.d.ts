interface CurrentSpaceContextState {
  currentSpace?: CurrentSpace | null;
  setCurrentSpace: (space: CurrentSpace | null) => void;
}

interface CurrentSpace {
  _id: string;
  name: string;
  address: string;
  organization: string;
}

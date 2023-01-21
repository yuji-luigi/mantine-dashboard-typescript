interface ReduxDbEntity<Entity> {
  entity: Sections;
  documentsArray: Array<Entity> | [];
  totalDocuments: number;
  selectedDocument: AllModels | null;
}

interface Reduxdb {
  [key: string]: ReduxDbEntity<AllModels>;
  home: ReduxDbEntity<Array<Record>>;
  users: ReduxDbEntity<User>;
  buildings: ReduxDbEntity<Building>;
  billing: ReduxDbEntity<Array<Record>>;
  statistics: ReduxDbEntity<Array<Record>>;
  comments: ReduxDbEntity<Array<Record>>;
  funds: ReduxDbEntity<Array<Record>>;
  fundRules: ReduxDbEntity<Array<Record>>;
  instances: ReduxDbEntity<Array<Record>>;
  proposals: ReduxDbEntity<Array<Record>>;
  notifications: ReduxDbEntity<Array<Record>>;
  bookmarks: ReduxDbEntity<Array<Record>>;
  tags: ReduxDbEntity<Array<Record>>;
  threads: ReduxDbEntity<Array<Record>>;
  userSettings: ReduxDbEntity<Array<Record>>;
  wallets: ReduxDbEntity<Array<Record>>;
  events: ReduxDbEntity<Array<Record>>;
}

// interface SelectedDocument {
//   entity: Sections;
//   document: AllModels;
// }
interface CrudState {
  reduxdb: Reduxdb;
  status: 'idle' | 'loading' | 'succeed' | 'failed';
  error?: null | string;
  message?: null | string;
  // TODO: DELETE
  counter: number;
  // selectedDocuments: [] | SelectedDocument[];
}

type AddCrudPayload = {
  entity: Sections;
  newDocument: AllModels;
  parentId?: string;
};

interface SelectCrudPayload {
  entity: Sections;
  document: AllModels;
}

interface AddedCrudResponse {
  success: boolean;
  collection: Sections;
  data: AllModels;
  count: Number;
}

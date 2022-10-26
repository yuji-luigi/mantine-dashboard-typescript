interface ReduxDbEntity<Entity> {
  entity: Sections;
  documentsArray: Array<Entity> | [];
}

interface CrudState {
  reduxdb: {
    [key: string]: ReduxDbEntity<AllModels>;
    users: ReduxDbEntity<User>;
    buildings: ReduxDbEntity<Building>;
  };
  status: 'idle' | 'loading' | 'succeed' | 'failed';
  error?: null | string;
  // TODO: DELETE
  counter: number;
}

type AddCrudPayload = {
  entity: Sections;
  document: AllModels;
};

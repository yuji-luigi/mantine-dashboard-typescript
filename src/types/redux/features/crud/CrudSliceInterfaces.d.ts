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
  newDocument: AllModels;
};

interface AddedCrudResponce {
  success: boolean;
  collection: Sections;
  data: AllModels;
  count: Number;
}

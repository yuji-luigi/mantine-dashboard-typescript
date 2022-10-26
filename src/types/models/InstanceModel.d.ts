 interface Instance extends MongooseBaseModel {
  description?: string | undefined;
  users?: string[] | User[];
  building?: string | Building;
  type: 'space' | 'user';
  proposals?: string[] | Proposal[] | undefined;
}

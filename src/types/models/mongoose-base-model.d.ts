interface MongooseBaseModel /* <ChildModel> */ {
  _id: string;
  name: string;
  description?: string;
  // children?: Array<ChildModel>;
  parent?: string;
  createdAt: string;
  updatedAt: string;
}

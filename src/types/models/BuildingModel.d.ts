interface ISpace extends MongooseBaseModel<null> {
  address?: string;
  floors?: string[];
  password: string;
  threads?: string[] | IThread[] | undefined;
  fund: string[] | IFund;
  administrator: string | User;
  // ! todo add virtuals in api
  _createdAt: string;
}

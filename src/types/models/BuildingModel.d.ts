 interface Building extends MongooseBaseModel {
  address?: string;
  floors?: string[];
  password: string;
  threads?: string[] | IThread[] | undefined;
  fund: string[] | IFund;
  administrator: string | User;
}

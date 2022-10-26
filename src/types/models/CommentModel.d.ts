 interface Comment extends MongooseBaseModel {
  title: string;
  body?: string;
  password: string;
  fund: string[] | Fund;
  building?: string | Building;
  user?: string | User | undefined;
}

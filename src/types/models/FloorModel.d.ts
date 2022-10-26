 interface IFloor extends MongooseBaseModel {
  instances?: string | undefined;
  limitInstances?: string[] | undefined;
  buildings?: string[] | Building[] | undefined;
}

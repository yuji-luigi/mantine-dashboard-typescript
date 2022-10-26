 interface IFundRule extends MongooseBaseModel {
  executeCondition?: 'every' | 'majority';
  building?: string | Building | undefined;
  createdBy?: string | User | undefined;
}

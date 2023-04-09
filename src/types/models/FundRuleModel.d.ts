interface IFundRule extends MongooseBaseModel {
  executeCondition?: 'every' | 'majority';
  building?: string | Building | undefined;
  user?: string | User | undefined;
}

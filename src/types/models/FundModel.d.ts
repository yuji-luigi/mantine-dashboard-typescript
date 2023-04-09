interface IFund extends MongooseBaseModel {
  amount?: number;
  fundRules?: string[] | IFundRule[] | undefined;
  building?: string | Building;

  user?: string | User | undefined;
}

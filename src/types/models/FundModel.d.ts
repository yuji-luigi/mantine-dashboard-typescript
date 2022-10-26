 interface IFund extends MongooseBaseModel {
  amount?: number;
  fundRules?: string[] | IFundRule[] | undefined;
  building?: string | Building;

  createdBy?: string | User | undefined;
}

interface FundModel extends MongooseBaseModel {
  amount?: number;
  fundRules?: string[] | FundModelRule[] | undefined;
  building?: string | Building;

  user?: string | UserModel | undefined;
}

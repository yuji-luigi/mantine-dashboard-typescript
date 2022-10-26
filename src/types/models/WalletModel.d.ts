 interface IWallet extends MongooseBaseModel {
  amount?: number | undefined;
  user?: string | User | undefined;
}

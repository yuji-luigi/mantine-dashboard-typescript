interface WalletModel extends MongooseBaseModel {
  amount?: number | undefined;
  user?: string | UserModel | undefined;
}

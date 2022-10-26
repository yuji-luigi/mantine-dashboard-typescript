 interface IProposal extends MongooseBaseModel {
  amount?: number | undefined;
  description?: string | undefined;
  fundRule?: string | IFundRule | undefined;
  building?: string | IBuilding;
  proposals?: string[] | IProposal[] | undefined;
  createdBy?: string | IUser | undefined;
}

interface IProposal extends MongooseBaseModel {
  amount?: number | undefined;
  description?: string | undefined;
  fundRule?: string | IFundRule | undefined;
  headSpace?: string | ISpace;
  proposals?: string[] | IProposal[] | undefined;
  createdBy?: string | IUser | undefined;
}

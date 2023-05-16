interface MaintainerModel extends MongooseBaseModel {
  name: string;
  company: string;
  avatar: UploadModel;
  homepage: string;
  type: string;
  tel: string;
  email: string;
  logo: string;
  description: string;
  address: string;
  isIndividual: boolean;
  // organizations: IOrganization[];
  // spaces: ISpaces[];
  createdBy: string | IUser;
}

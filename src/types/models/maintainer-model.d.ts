interface MaintainerModel extends MongooseBaseModel {
  name: string;
  company: string;
  avatar?: UploadModel;
  homepage: string;
  type: string;
  tel: string;
  email: string;
  logo?: UploadModel;
  description: string;
  address: string;
  isIndividual: boolean;
  // organizations: IOrganization[];
  // spaces: ISpaces[];
  createdBy: string | IUser;
}

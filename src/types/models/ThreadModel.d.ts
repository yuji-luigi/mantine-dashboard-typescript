interface Thread extends MongooseBaseModel<null> {
  title: string;
  images: string[] | IUpload[] | [];
  description: string;
  attachments?: string[] | undefined;
  tags?: string[];
  rating?: number;
  building?: string | IBuilding;
  createdBy: IUser | string;
  owner: IOwner | string;
}

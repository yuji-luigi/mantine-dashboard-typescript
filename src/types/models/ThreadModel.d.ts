interface Thread extends MongooseBaseModel<null> {
  title: string;
  images: string[] | IUpload[] | [];
  imagesUrl: string[] | [];
  description: string;
  attachments?: string[] | undefined;
  attachmentsUrl?: string[] | undefined;
  tags?: string[];
  rating?: number;
  building?: string | IBuilding;
  createdBy: IUser | string;
  owner: IOwner | string;
}

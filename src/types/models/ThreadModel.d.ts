interface Thread extends MongooseBaseModel<null> {
  title: string;
  images: Upload[];
  description: string;
  attachments?: string[] | undefined;
  tags?: string[];
  rating?: number;
  building?: string | IBuilding;
  createdBy: IUser | string;
  owner: IOwner | string;
}

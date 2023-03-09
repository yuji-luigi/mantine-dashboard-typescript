interface Thread extends MongooseBaseModel<null> {
  title: string;
  body?: string | undefined;
  tag: string[] | [];
  attachments?: string[] | undefined;
  tags?: string[] | ITag[];
  building?: string | Building;
  createdBy: string | IUser;
}

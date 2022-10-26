interface Thread extends MongooseBaseModel {
  title: string;
  body?: string | undefined;
  attachments?: string[] | undefined;
  tags?: string[] | ITag[];
  building?: string | Building;
}

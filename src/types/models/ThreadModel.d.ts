interface Thread extends MongooseBaseModel {
  title: string;
  body?: string | undefined;
  tag: string[] | [];
  attachments?: string[] | undefined;
  tags?: string[] | ITag[];
  building?: string | Building;
}

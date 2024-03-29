interface Thread extends MongooseBaseModel<null> {
  title: string;
  images: Upload[] | [];
  description: string;
  attachments?: Upload[] | [];
  tags?: string[];
  rating?: number;
  listViewType: 'default' | 'bigImage';
  articleType:
    | 'default'
    | 'blog'
    | 'news'
    | 'event'
    | 'announcement'
    | 'poll'
    | 'survey'
    | 'question'
    | 'discussion';
  building?: string | IBuilding;
  createdBy: IUser | string;
  isImportant: boolean;
  owner: IOwner | string;
  /** formatted in some way. from api schema level */
  _createdAt: string;
}

interface Thread extends MongooseBaseModel<null> {
  title: string;
  images: Upload[];
  description: string;
  attachments?: string[] | undefined;
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
  owner: IOwner | string;
}

interface MaintenanceModel extends MongooseBaseModel {
  title: string;
  images: UploadModel[] | [];
  description: string;
  attachments?: UploadModel[] | [];
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
  headSpace?: string | SpaceModel;
  user: IUser | string;
  isImportant: boolean;
  owner: IOwner | string;
  /** formatted in some way. from api schema level */
  _createdAt: string;
}

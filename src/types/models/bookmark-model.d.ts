interface BookmarkModel extends MongooseBaseModel {
  date?: string | undefined;
  threads?: string[] | ThreadModel[] | undefined;
  note?: string | undefined;
  headSpace?: string | SpaceModel;
}

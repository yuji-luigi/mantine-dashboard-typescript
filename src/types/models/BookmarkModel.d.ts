interface Bookmark extends MongooseBaseModel {
  date?: string | undefined;
  threads?: string[] | IThread[] | undefined;
  note?: string | undefined;
  headSpace?: string | ISpace;
}

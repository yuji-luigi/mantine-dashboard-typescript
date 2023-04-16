interface TagModel extends MongooseBaseModel {
  description?: string;
  color?: string;
  building?: string | Building;
}

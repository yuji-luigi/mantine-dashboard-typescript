 interface Tag extends MongooseBaseModel {
  description?: string;
  color?: string;
  building?: string | Building;
}

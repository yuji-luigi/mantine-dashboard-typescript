interface UserSettingModel extends MongooseBaseModel {
  pushNotification: boolean;
  smsNotification: boolean;
  administrator: string | UserModel;
}

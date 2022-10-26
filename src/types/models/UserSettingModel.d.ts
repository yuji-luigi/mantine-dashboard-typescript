 interface IUserSetting extends MongooseBaseModel {
  pushNotification: boolean;
  smsNotification: boolean;
  administrator: string | User;
}

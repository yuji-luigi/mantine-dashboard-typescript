type Roles = 'user' | 'admin' | 'super_admin';

interface UserModel extends MongooseBaseModel {
  surname: string;
  name: string;
  email: string;
  active: boolean;
  role: Roles;
  rootSpaces: Array<string>;
  password: string;
  phone?: string;
  avatar?: UploadModel;
}

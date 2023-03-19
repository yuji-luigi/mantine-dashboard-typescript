type Roles = 'user' | 'admin' | 'super_admin';

interface User extends MongooseBaseModel {
  surname: string;
  name: string;
  email: string;
  active: boolean;
  role: Roles;
  password: string;
  phone?: string;
  avatar?: Upload;
}

type Roles = 'user' | 'admin' | 'super_admin';

interface User extends MongooseBaseModel {
  surname: string;
  email: string;
  active: boolean;
  role: Roles;
  password: string;
  phone?: string;
}

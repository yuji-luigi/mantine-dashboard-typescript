export interface LoginFormValues {
  email: string;
  password: string;
  termsOfService: Boolean;
}

export interface RegisterFormValues extends LoginFormValues {
  name: string;
  surname: string;
}

export interface IInitialValues {
  email: string;
  password: string;
  password2: string;
  name: string;
  surname: string;
  organization: string;
  purpose: 'condoAdmin' | 'flatAdmin' | 'companyAdmin' | '';
  space: {
    maxUsers: number;
    name: string;
    address: string;
    password: string;
  };
}

export const initialValues: IInitialValues = {
  email: '',
  password: '',
  password2: '',
  name: '',
  surname: '',
  purpose: '',
  organization: '',
  space: {
    maxUsers: 0,
    name: '',
    address: '',
    password: '',
  },
};

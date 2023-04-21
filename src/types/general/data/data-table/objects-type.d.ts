type UsersTableRow = {
  // index color returns string | undefined
  [key: string]:
    | string
    | Record<string, string>
    | Record<string, string | Record<string | string>>[];
  _id: string;
  avatar: string;
  name: string;
  job: { text: string; color: string };
  email: string;
  phone: string;
};

interface SectionDataJson {
  entity: string;
  title: string;
  subtitle: string;
  navbarTitle: string;
  link: string;
  createButton: string;
  icon: string;
  hide?: boolean;
}
[];
interface SectionDataJsonWithRoles extends SectionDataJson {
  roles: string[];
}
[];

interface a {
  roles: string[];
  entity: string;
  title: string;
  subtitle: string;
  navbarTitle: string;
  link: string;
  createButton: string;
  icon: string;
  hide?: undefined;
}

interface ISectionDataObject {
  [key: Sections]: SectionDataJson;
  // home: SectionDataJson
  // statistics: SectionDataJson
  // notifications: SectionDataJson
  // billing: SectionDataJson
  // users: SectionDataJson
  // buildings: SectionDataJson
  // bookmarks: SectionDataJson
  // home: SectionDataJson
  // home: SectionDataJson
  // home: SectionDataJson
  // home: SectionDataJson
  // home: SectionDataJson
  // home: SectionDataJson
  // home: SectionDataJson
}

// interface SectionDataJson {
//   [key: Sections]: {
//     slice: string;
//     navbar: string;
//     link: string;
//     title: string;
//     subtitle: string;
//     createButton?: boolean;
//   };
// }

// type FieldType =
//   | "text"
//   | "long-text"
//   | "boolean"
//   | "select"
//   | "static-select"
//   | "date"
//   | "number"
//   | "currency"
//   | "avatar"
//   | "date-picker"
//   | "attachment"
//   | "color-picker";

type CellStyles = 'badge' | '';
// type FieldType = FieldTypes[FieldTypes[keyof typeof FieldTypes]];

type FormFieldsType = {
  [key: string]: Array<FormFieldInterFace>;
};

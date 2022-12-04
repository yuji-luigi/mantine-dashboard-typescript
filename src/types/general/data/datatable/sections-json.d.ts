
/**
 * state.reduxdb[Section]
 * Sections are Entities in the DB. Also should match with the redux entity.
 * returns {
 *   entity: "Sections"
 * }
 */
type Sections =
  | "home"
  | "statistics"
  | "notifications"
  | "billing"
  | "users"
  | "buildings"
  | "bookmarks"
  | "comments"
  | "funds"
  | "areas"
  | "floors"
  | "fundRules"
  | "instances"
  | "notifications"
  | "proposals"
  | "tags"
  | "threads"
  | "userSettings"
  | "wallets"
  | "owners"
  | "events";

interface SectionDataJson {
    slice: string;
    navbar: string;
    link: string;
    title: string;
    subtitle: string;
    createButton?: boolean;
}[];

interface ISectionDataObject {
  [key:  Sections]: SectionDataJson
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

type CellStyles = "badge" | "";
// type FieldType = FieldTypes[FieldTypes[keyof typeof FieldTypes]];

type FormFieldsType = {
  [key: string]: Array<FormFieldInterFace>;
};

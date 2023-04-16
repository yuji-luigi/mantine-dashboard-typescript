interface OrganizationModel extends MongooseBaseModel {
  phone: string;
  email: string;
  address: string;
  homepage: string;
  logoBanner?: string;
  logoSquare?: string;
  /** decides if everyone in the world can see or only under the organization. */
  isPublic: boolean;
}

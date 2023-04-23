import beta from '../../json/dataTable/section/sectionData.json';

const en: string[][] = beta.map((data) => data.contents.map((content) => content.entity));

// export const sectionData = beta.map(data => data.contents.map(content => content))
// .reduce((arr, cur) => arr.concat(cur) ,[])

/** all the sections. d */
export const sections: string[] = en.reduce((arr, cur) => arr.concat(cur), []);

export const flattenSectionData = beta.flatMap((sectionData) => sectionData.contents);

export const superAdminEntities = beta
  .filter((sectionData) => sectionData.roles.includes('super_admin'))
  .flatMap((sectionData) => sectionData.contents.map((content) => content.entity));
export const adminEntities = beta
  .filter((sectionData) => sectionData.roles.includes('admin'))
  .flatMap((sectionData) => sectionData.contents.map((content) => content.entity));

// set programmatically the roles for every sections
export const allSectionArrayWithRoles = beta.flatMap((sectionData) => {
  return sectionData.contents.map((content) => {
    const modifiedContent = {
      ...content,
      roles: sectionData.roles,
    };
    return modifiedContent;
  });
});

export const entities = flattenSectionData.map((sectionData) => sectionData.entity);
export const sectionData = beta;

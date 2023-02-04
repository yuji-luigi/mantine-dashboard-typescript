/**
 * state.reduxdb[Section]
 * Sections are Entities in the DB. Also should match with the redux entity.
 * returns {
 *   entity: "Sections"
 * }
 */
type Sections =
  | 'home'
  | 'statistics'
  | 'notifications'
  | 'billing'
  | 'users'
  | 'buildings'
  | 'bookmarks'
  | 'comments'
  | 'funds'
  | 'areas'
  | 'floors'
  | 'fundRules'
  | 'instances'
  | 'notifications'
  | 'proposals'
  | 'tags'
  | 'threads'
  | 'userSettings'
  | 'wallets'
  | 'owners'
  | 'events'
  | 'spaces'
  | '';

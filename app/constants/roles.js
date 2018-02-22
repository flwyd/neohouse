export const ADMIN            = 1;   // Super user! Change anything
export const VIEW_PII         = 2;   // See email, address, phone
export const VIEW_EMAIL       = 3;   // See email
export const GRANT_POSITION   = 4;   // Grand/Revoke Positions
export const EDIT_ACCESS_DOCS = 5;   // Edit Access Documents
export const EDIT_BMIDS       = 6;   // Edit BMIDs
export const LOGIN            = 11;  // Person allowed to login
export const MANAGE           = 12;  // Ranger HQ: access other schedule, asset checkin/out, send messages
export const MENTOR           = 101; // Mentor - access mentor section
export const TRAINER          = 102; // Trainer
export const VC               = 103; // Volunteer Coordinator -

export const StringToRole = {
  'admin':            ADMIN,
  'view-pii':         VIEW_PII,
  'view-email':       VIEW_EMAIL,
  'grant-position':   GRANT_POSITION,
  'edit-access-docs': EDIT_ACCESS_DOCS,
  'edit-bmids':       EDIT_BMIDS,
  'login':            LOGIN,
  'manage':           MANAGE,
  'mentor':           MENTOR,
  'trainer':          TRAINER,
  'vc':               VC,
};

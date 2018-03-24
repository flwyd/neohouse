const ADMIN            = 1; // Super user! Change anything
const VIEW_PII         = 2; // See email, address, phone
const VIEW_EMAIL       = 3; // See email
const GRANT_POSITION   = 4; // Grand/Revoke Positions
const EDIT_ACCESS_DOCS = 5; // Edit Access Documents
const EDIT_BMIDS       = 6; // Edit BMIDs
const EDIT_SLOTS       = 7; // Edit Slots

const LOGIN            = 11; // Person allowed to login
const MANAGE           = 12; // Ranger HQ: access other schedule, asset checkin/out, send messages
const MENTOR           = 101; // Mentor - access mentor section
const TRAINER          = 102; // Trainer
const VC               = 103; // Volunteer Coordinator
const ART_TRAINER      = 104; // ART Trainer

const Role = {
  ADMIN,
  VIEW_PII,
  VIEW_EMAIL,
  GRANT_POSITION,
  EDIT_ACCESS_DOCS,
  EDIT_BMIDS,
  EDIT_SLOTS,
  LOGIN,
  MANAGE,
  MENTOR,
  TRAINER,
  VC,
  ART_TRAINER
};

const StringToRole = {
  'admin':            ADMIN,
  'view-pii':         VIEW_PII,
  'view-email':       VIEW_EMAIL,
  'grant-position':   GRANT_POSITION,
  'edit-access-docs': EDIT_ACCESS_DOCS,
  'edit-bmids':       EDIT_BMIDS,
  'edit-slots':       EDIT_SLOTS,
  'login':            LOGIN,
  'manage':           MANAGE,
  'mentor':           MENTOR,
  'trainer':          TRAINER,
  'vc':               VC
};

const RoleToString = {
  [ADMIN]:            'admin',
  [VIEW_PII]:         'view-pii',
  [VIEW_EMAIL]:       'view-email',
  [GRANT_POSITION]:   'grant-position',
  [EDIT_ACCESS_DOCS]: 'edit-access-docs',
  [EDIT_BMIDS]:       'edit-bmids',
  [EDIT_SLOTS]:       'edit-slots',
  [LOGIN]:            'login',
  [MANAGE]:           'manage',
  [MENTOR]:           'mentor',
  [TRAINER]:          'trainer',
  [VC]:               'vc'
};

function roleName(role) {
  return (RoleToString[role] || role);
}

export {
  roleName,
  StringToRole,
  RoleToString,
  Role
};

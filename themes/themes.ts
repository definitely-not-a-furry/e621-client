interface TextColorTheme {
  positive: string
  negative: string
  rating: {
    safe: string
    questionable: string
    explicit: string
  }
  artist: string
  artistAlt: string
  contributor: string
  contributorAlt: string
  species: string
  speciesAlt: string
  character: string
  characterAlt: string
  general: string
  generalAlt: string
  meta: string
  metaAlt: string
  invalid: string
  invalidAlt: string
  copyright: string
  copyrightAlt: string
  lore: string
  loreAlt: string
  pool: string
  poolAlt: string
}

interface UserStatusColorTheme {
  member: string
  memberAlt: string
  privileged: string
  privilegedAlt: string
  blocked: string
  blockedAlt: string
  formerStaff: string
  formerStaffAlt: string
  janitor: string
  janitorAlt: string
  moderator: string
  moderatorAlt: string
  admin: string
  adminAlt: string
}

interface Theme {
  background: string
  foreground: string
  section: string
  sectionLightenHalf: string
  sectionLighten: string
  sectionDarken: string
  text: TextColorTheme
  font: string
  userStatus: UserStatusColorTheme
}

const defaultTextColorTheme: TextColorTheme = {
  positive: '#3e9e49',
  negative: '#dd3127',
  rating: {
    explicit: '#e45f5f',
    questionable: '#ffe666',
    safe: '#3e9e49'
  },
  general: '#ffee95',
  generalAlt: '#f68b00',
  contributor: '#0a0',
  contributorAlt: '#2bff2b',
  character: '#0a0',
  characterAlt: '#2bff2b',
  species: '#ff3d3d',
  speciesAlt: '#f6b295',
  artist: '#f2ac08',
  artistAlt: '#fbd67f',
  meta: '#fff',
  metaAlt: '#666',
  invalid: '#ff3d3d',
  invalidAlt: '#ffbdbd',
  copyright: '#d0d',
  copyrightAlt: '#ff5eff',
  lore: '#282',
  loreAlt: '#5fdb5f',
  pool: '#f5deb3',
  poolAlt: '#d0b27a'
}

export const darkTheme: Theme = {
  background: '#000',
  foreground: '#222',
  section: '#333',
  sectionLightenHalf: '#404040',
  sectionLighten: '#4d4d4d',
  sectionDarken: '#262626',
  text: defaultTextColorTheme,
  font: 'Verdana',
  userStatus: {
    member: '#ffee95',
    memberAlt: '#f68b00',
    privileged: '#ffee95',
    privilegedAlt: '#f68b00',
    blocked: '#ffee95',
    blockedAlt: '#f68b00',
    formerStaff: '#78dca5',
    formerStaffAlt: '#4da073',
    janitor: '#d82828',
    janitorAlt: '#cc5151',
    moderator: '#d82828',
    moderatorAlt: '#cc5151',
    admin: '#e69500',
    adminAlt: '#9d6703'
  }
}

export const hexagonTheme: Theme = {
  background: '#020f23',
  foreground: '#152f56',
  section: '#1f3c67',
  sectionLightenHalf: '#25477b',
  sectionLighten: '#2b538e',
  sectionDarken: '#193153',
  text: defaultTextColorTheme,
  font: 'Verdana',
  userStatus: {
    member: '#b4c7d9',
    memberAlt: '#2e76b4',
    privileged: '#b4c7d9',
    privilegedAlt: '#2e76b4',
    blocked: '#b4c7d9',
    blockedAlt: '#2e76b4',
    formerStaff: '#78dca5',
    formerStaffAlt: '#4da073',
    janitor: '#d82828',
    janitorAlt: '#cc5151',
    moderator: '#d82828',
    moderatorAlt: '#cc5151',
    admin: '#e69500',
    adminAlt: '#9d6703'
  }
}

export const themeStrings = {
  'dark': darkTheme,
  'hexagon': hexagonTheme
}

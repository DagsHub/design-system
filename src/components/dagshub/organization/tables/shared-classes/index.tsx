export enum UserPermissionForTeam {
  AdminAccess = 'Admin access',
  WriteAccess = 'Write access',
  ReadAccess = 'Read access'
}

export interface Member {
  userName: string;
  homeLink: string;
  relAvatarLink: string;
  removeLink?:string;
}


export enum UserPermissionForTeam {
    AdminAccess = 'Admin access',
    WriteAccess = 'Write access',
    ReadAccess =  'Read access'
}

export interface Member{
    userName:string;
    fullName:string;
    homeLink:string;
    relAvatarLink:string;
}


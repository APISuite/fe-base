import { ErrorReason } from "../../util/request";
import { AUTH_EVENTS } from "./events";

export type AuthEvents = {
  [AUTH_EVENTS.AUTH_WORK]: boolean,
  [AUTH_EVENTS.LOGIN]: { email: string; password: string },
  [AUTH_EVENTS.LOGIN_SUCCESS]: { profile: Profile },
  [AUTH_EVENTS.LOGIN_ERROR]: ErrorReason,
  [AUTH_EVENTS.LOGOUT]: undefined,
}

export interface AuthStore {
  working: boolean,
  error: null | ErrorReason,
  members: TeamMembers[],
  org: null | (Organization & Pick<OrgInfo,
    "description" | "logo" | "privacyUrl" | "supportUrl" | "tosUrl" | "vat" | "websiteUrl" | "youtubeUrl">),
  profile: null | Profile,
  roleOptions: Role[],
}

export type Profile = {
  current_org: Organization & {
    member_since: string,
    role: Role,
  },
  orgs_member: Organization[],
  ssoAccountURL: string,
  user: User,
}

export type Role = {
  id: string,
  name: "admin" | "organizationOwner" | "developer" | "baseUser",
}

export type User = {
  id: string,
  email: string,
  name: string,
  avatar?: string,
  bio?: string,
  last_login: string,
  mobile?: string,
  oidcProvider: string | null,
}

export type Organization = {
  id: string,
  name: string,
}

export type OrgInfo = {
  createdAt?: string,
  description: string | null,
  logo: string,
  org_code?: string,
  privacyUrl: string,
  supportUrl: string,
  tosUrl: string,
  updatedAt?: string,
  vat?: string | null,
  websiteUrl: string,
  youtubeUrl: string,
}

export type TeamMembers = {
  Organization: Organization,
  Role: Role,
  User: Pick<User, "id"> & { name: string },
}


import { ConfigState } from "./types";

export const __DEV__ = process.env.NODE_ENV === "development";

export const LOCALE_KEY = "lng";

export const fallbackLng = "en-US";

export enum apiDefaults {
  settings = "settings",
  owner = "owner"
}

export const defaultState: ConfigState = {
  initialized: false,
  failedToFetch: false,
  portalName: "",
  clientName: "",
  supportURL: "",
  documentationURL: "",
  providerSignupURL: "",
  sso: [],
  socialURLs: [],
  i18nOptions: [],
  infra: {
    hydra: "",
    sandbox: "",
    remoteAPI: "",
  },
  ownerInfo: {
    name: "",
    description: "",
    vat: "",
    website: "",
    logo: "",
    org_code: "",
    app_count: 0,
    tosUrl: "",
    privacyUrl: "",
    youtubeUrl: "",
    websiteUrl: "",
    supportUrl: "",
  },
  pages: {
    landing: {
      components: [],
    },
  },
};

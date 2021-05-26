import { ConfigState } from "./types";

export const __DEV__ = process.env.NODE_ENV === "development";
export const __TEST__ = process.env.NODE_ENV === "test";

export const LOCALE_KEY = "lng";

export const fallbackLng = "en-US";

export enum apiDefaults {
  settings = "settings",
  owner = "owner",
  translations = "translations",
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
  navigation: {
    title: {
      route: "/",
      iconFallbackName: "circle",
    },
    admin: {
      tabs: [],
      events: {
        afterLogin: "",
      },
    },
    organizationOwner: {
      tabs: [],
      events: {
        afterLogin: "",
      },
    },
    developer: {
      tabs: [],
      events: {
        afterLogin: "",
      },
    },
    baseUser: {
      tabs: [],
      events: {
        afterLogin: "",
      },
    },
    anonymous: {
      tabs: [],
      events: {
        afterLogin: "",
      },
    },
  },
};

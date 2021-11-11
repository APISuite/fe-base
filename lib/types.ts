import { Palette } from "@material-ui/core/styles/createPalette";

export interface ConfigContextProps extends Omit<ConfigState, "initialized" | "failedToFetch"> {
  provider: boolean,
}

export interface ConfigProviderProps {
  /** API endpoints */
  api: {
    base: string,
    settings?: string,
    owner?: string,
    translations?: string,
  },
  /**
   * Translation dynamic imports object
   *
   * @example
   * export default {
   *  "en-US": import("./en-US"),
   *  "pt-PT": import("./pt-PT"),
   * }
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  translations: Record<string, any>,
}

export interface ConfigState extends Omit<DefaultConfig, "theme"> {
  initialized: boolean,
  failedToFetch: boolean,
  ownerInfo: Owner,
}

export type Locale = "en-US" | "pt-PT"

export type LocaleOption = {
  locale: Locale,
  label: string,
}

export interface SocialUrl {
  name: string,
  url: string,
}

export interface Owner {
  name: string,
  description: string,
  vat: string,
  website: string,
  logo: string,
  org_code: string,
  app_count: 0,
  tosUrl: string,
  privacyUrl: string,
  youtubeUrl: string,
  websiteUrl: string,
  supportUrl: string,
}

export interface TabConfig {
  /** if parent will not drop one level when navigation is expanded */
  fixed: boolean,
  label: {
    /** use iconName if `icon`. Key and fallback if `text`  */
    type: "text" | "icon" | "avatar",
    fallback?: string,
    key?: string,
    iconName?: string,
  },
  /**
   * start with `/` or `http` for route and `$` for action
   * @example "https://apisuite.io"
   * @example "/profile"
   * @example "$logout"
   */
  action: string,
  backAction?: {
    /**
     * where to go
     * @example "/profile"
     */
    route: string,
    /**
     * Default text in case of missing i18n key
     * @example "Back to Profile"
     */
    fallback: string,
    /**
     * i18n key
     * @example "profile.back"
     */
    key?: string,
    iconName?: string,
  },
  subTabs?: TabConfig[],
}

export interface NavigationRole {
  tabs: TabConfig[],
  events: {
    /** `/` prefixed for routing - "/dashboard". Leave empty otherwise  */
    afterLogin: string,
  },
}

export interface DefaultConfig {
  portalName: string,
  clientName: string,
  supportURL: string,
  documentationURL: string,
  providerSignupURL: string,
  sso: string[],
  socialURLs: SocialUrl[],
  i18nOptions: LocaleOption[],
  theme: Palette,
  infra: {
    hydra: string,
    sandbox: string,
    remoteAPI: string,
  },
  // TODO: there is no real use for this setting atm - will probably be deprecated in the future
  pages: {
    landing: {
      components: [],
    },
  },
  navigation: {
    title: {
      route: string,
      iconFallbackName: string,
    },
    admin: NavigationRole,
    organizationOwner: NavigationRole,
    developer: NavigationRole,
    baseUser: NavigationRole,
    anonymous: NavigationRole,
  },
}

export type i18nTranslationOptions = {
  serverUrl: string,
  localTranslations: ConfigProviderProps["translations"],
  loaded: string[],
}

declare module "@material-ui/core/styles/createPalette" {
  interface Palette {
    label: string,
    gradient: PaletteColor,
  }

  interface PaletteOptions {
    label: string,
    gradient: PaletteColor,
  }
}

declare module "@material-ui/core/styles/createTypography" {
  interface FontStyle {
    url: string;
  }

  interface FontStyleOptions {
    url: string;
  }
}

declare module "@material-ui/core/styles/createMuiTheme" {
  interface Theme {
    custom: {
      images: {
        headerBackground: string,
        homeSlider: {
          background: string,
          slide1: string,
          slide2: string,
          slide3: string,
        },
        auth: string,
        marketplace: {
          hero: string,
          background: string,
        },
      },
      button: {
        rounded: boolean,
      },
    },
  }

  interface ThemeOptions {
    custom?: {
      images?: {
        headerBackground?: string,
        homeSlider?: {
          background?: string,
          slide1?: string,
          slide2?: string,
          slide3?: string,
        },
        auth?: string,
        marketplace?: {
          hero?: string,
          background?: string,
        },
      },
      button?: {
        rounded?: boolean,
      },
    },
  }
}

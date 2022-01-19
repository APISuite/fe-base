import { Palette } from "@material-ui/core/styles/createPalette";
import { Location, State } from "history";
import { FC } from "react";
import { Role } from "./store/auth/types";

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

export type RouterState = { router: { location: Location<State>, sideNavEntries: SideNavigationEntry[] } }

export type SideNavigationEntry = {
  /**
   * Full path to this entry
   */
  to: string,
  /**
   * Is the content of this entry being render
   */
  active: boolean,
  /**
   * Default text in case of missing i18n key
   * @example "General Settings"
   */
  fallback: string,
  /**
   * i18n key
   * @example "extensions.sideNav.myKey"
   */
  key?: string,
}

export interface RouterConfig {
  /**
   * Path to match this configuration
   *
   * @example "/"
   * @example "/settings"
   */
  [key: string]: {
    /**
     * Which roles are allowed to render content at matched path
     */
    roles: Role["name"][],
    /**
     * `main` - Content will be rendered in the bigger right side of the screen.
     *
     *
     * `navigation` - Content will be rendered in the smaller left side of the screen.
     *
     * **Note:**
     *
     * Side navigation will be rendered in all subsequent segments of the path.
     *
     * The following examples are subsequent segments of `"/settings"`:
     *  - `"/settings/general"`
     *  - `"/settings/profile"`
     *  - `"/settings/profile/password"`
     *
     *
     * `modal` - Content will be rendered on top of the main screen.
     *
     * **Note:**
     *
     * Modal routes will always render their parent segment behind if not previous render information is available.
     * They should not be defined without parent segments or nothing will render under the modal.
     *
     * The following examples are valid paths for modals:
     *  - `"/settings-modal"`
     *  - `"/home/some-modal"`
     *  - `"/home/profile/password-modal"`
     */
    contentType: "main" | "navigation" | "modal",
    /**
     * Component to render at matched path
     */
    content: FC<RouterState>,
    /**
     * Default text in case of missing i18n key
     * @example "General Settings"
     */
    fallback: string,
    /**
     * i18n key
     * @example "extensions.sideNav.myKey"
     */
    key?: string,
  },
}

export interface RouterProps {
  /**
   * Routes configuration
   */
  config: RouterConfig,
  /**
   * Rendered in main content if a route is not found
   */
  NotFound: FC<RouterState>,
  /**
   * Useful for top navigation
   *
   * This component will always be present at the top.
   */
  Navigation?: FC<RouterState>,
  /**
   *  Useful for bottom navigation
   *
   * This component will always be present at the bottom.
   */
  Footer?: FC<RouterState>,
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

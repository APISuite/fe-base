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

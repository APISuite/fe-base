import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { fallbackLng, LOCALE_KEY, __DEV__, __TEST__ } from "./constants";
import { i18nTranslationOptions, Locale } from "./types";
import { localPut } from "./util/storage";

const coreNS = "translation";

let opt: i18nTranslationOptions = {
  serverUrl: "",
  localTranslations: {},
  loaded: [],
};

const fetchedCache: string[] = [];

export function setOptions(options: Omit<i18nTranslationOptions, "loaded">) {
  opt = {...opt, ...options};
}

/** registers new translations merging them deep */
export async function registerTranslations(locale: Locale, resource?: Record<string, unknown>) {
  // add local translation
  if (resource) {
    i18n.addResourceBundle(locale, coreNS, resource, true, true);

  // try load from translations configuration available
  } else if (opt.localTranslations.hasOwnProperty(locale) && !opt.loaded.includes(locale)) {
    i18n.addResourceBundle(locale, coreNS, await opt.localTranslations[locale], true, true);
    opt.loaded.push(locale);
  }

  // try to get translation from server - this is skipped on tests to avoid flakiness
  if (!__TEST__ && opt.serverUrl.length && !fetchedCache.includes(locale)) {
    try {
      const fromServer = await fetch(`${opt.serverUrl}/${locale}`).then((res) => res.json());

      i18n.addResourceBundle(locale, coreNS, fromServer, true, true);

      fetchedCache.push(locale);
    } catch (error) {
      console.error(`Failed to load locale ${locale} from server: ${error.message}`);
    }
  }
}

/** changes locales and optionally registers new translations merging them deep */
export async function changeLocale(locale: Locale, resource?: Record<string, unknown>) {
  await registerTranslations(locale, resource);
  i18n.changeLanguage(locale);
  localPut(LOCALE_KEY, locale);
}

i18n
  .use(initReactI18next)
  .init({
    resources: {
      [fallbackLng]: {
        [coreNS]: {
          "ConfigProvider": {
            "errorMessage": "Could not reach the server - please check your Internet connection.",
            "reloadCTA": "Reload Page",
          },
        },
      },
    },
    lng: fallbackLng,
    defaultNS: coreNS,
    fallbackLng: fallbackLng,
    debug: __DEV__,
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
    react: {
      useSuspense: false,
    },
  });

export default i18n;

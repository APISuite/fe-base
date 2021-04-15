import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { fallbackLng, LOCALE_KEY, __DEV__ } from "./constants";
import { Locale } from "./types";
import { localPut } from "./util/storage";

/** registers new translations merging them deep */
export function registerTranslations(locale: Locale, resource: Record<string, unknown>) {
  i18n.addResourceBundle(locale, "translation", resource, true, true);
}

/** changes locales and optionally registers new translations merging them deep */
export function changeLocale(locale: Locale, resource?: Record<string, unknown>) {
  if (resource) {
    registerTranslations(locale, resource);
  }

  i18n.changeLanguage(locale);
  localPut(LOCALE_KEY, locale);
}

i18n
  .use(initReactI18next)
  .init({
    resources: {
      [fallbackLng]: {
        translation: {
          "ConfigProvider": {
            "errorMessage": "Could not reach the server - please check your Internet connection.",
            "reloadCTA": "Reload Page",
          },
        },
      },
    },
    lng: fallbackLng,
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

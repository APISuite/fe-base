import React, { useEffect, useRef, useState } from "react";
import { createMuiTheme, ThemeProvider, Theme } from "@material-ui/core/styles";
import { Button, CircularProgress, Typography } from "@material-ui/core";
import { useTranslation } from "react-i18next";
import { safeMergeDeep } from "./util/safeMergeDeep";
import { localGet } from "./util/storage";
import AirDriftSrc from "./assets/adrift.svg";

import { setOptions, changeLocale, registerTranslations } from "./i18n";
import { ConfigContext } from "./context";
import { defaultState, apiDefaults, fallbackLng, LOCALE_KEY } from "./constants";
import useStyles from "./styles";
import { ConfigProviderProps, ConfigState, Locale } from "./types";
import { injectStylesheetLink } from "./util/injectStylesheetLink";

export const ConfigProvider: React.FC<ConfigProviderProps> = ({ children, api, translations, ...rest }) => {
  const classes = useStyles();
  const { t } = useTranslation();
  const appTheme = useRef<Theme>();
  const [state, setState] = useState<ConfigState>(defaultState);

  useEffect(() => {
    const bootstrap = async () => {
      try {
        // initialize translations
        setOptions({
          serverUrl: `${api.base}/${api.translations || apiDefaults.translations}`,
          localTranslations: translations,
        });

        // always get fallback translations
        await registerTranslations(fallbackLng);
        const selectedLocale = localGet<Locale>(LOCALE_KEY);

        // change locale in case the selected one is not the same as fallback
        if (selectedLocale != null && selectedLocale !== fallbackLng) {
          await changeLocale(selectedLocale);
        }

        // fetch settings
        const responses = await Promise.all([
          // settings config
          await fetch(`${api.base}/${api.settings || apiDefaults.settings}`),
          // owner info
          await fetch(`${api.base}/${api.owner || apiDefaults.owner}`),
        ]);

        // unwrap responses
        const [{ theme, ...rest }, ownerInfo] = await Promise.all(
          responses.map((r) => r.json()),
        );

        const fontUrls = theme?.typography?.urls;

        // load fonts
        if (Array.isArray(fontUrls)) {
          fontUrls.forEach((url) => injectStylesheetLink(url));
        }

        // create theme from API configurations
        appTheme.current = createMuiTheme(theme);

        // initialize state with API configurations
        setState((s) => safeMergeDeep(s, { ...rest, ownerInfo, initialized: true }));
      } catch (error) {
        setState((s) => ({ ...s, failedToFetch: true }));
      }
    };

    bootstrap();
  }, [api, translations]);

  // wait for api configurations fetch
  const { failedToFetch, initialized, ...contextState } = state;

  // show message if fail to fetch configurations
  if (failedToFetch) {
    return (
      <div className={classes.container}>
        <img
          className={classes.errorImg}
          src={AirDriftSrc}
          alt='failed to fetch'
        />

        <Typography variant='h5'>
          {t("ConfigProvider.errorMessage")}
        </Typography>

        <br />

        <Button onClick={() => location.reload()}>{t("ConfigProvider.reloadCTA")}</Button>
      </div>
    );
  }

  // show spinner while request is in progress
  if (!initialized) {
    return (
      <div className={classes.container}>
        <CircularProgress color='inherit' />
      </div>
    );
  }

  // render children wrapped in config and theme providers
  return (
    <ConfigContext.Provider
      {...rest}
      value={{
        ...contextState,
        provider: true,
      }}
    >
      <ThemeProvider theme={appTheme.current!}>
        {children}
      </ThemeProvider>
    </ConfigContext.Provider>
  );
};

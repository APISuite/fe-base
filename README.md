# @apisuite/fe-base

API Suite frontend provider for settings, style and i18n.

### Installation
```bash
npm install @apisuite/fe-base
```

## Usage

### ConfigProvider

The provider should wrap all other components.

| prop | required | example value | description |
|------|----------|-------|-------------|
| api | Yes | `{ base: <ROOT_ENDPOINT>, settings?: <SETTINGS_ROUTE>, owner?: <OWNER_ROUTE> }` | API endpoints to fetch settings. Only base is required, the other routes will default to it's property names. |
| translations | Yes | `{ "en-US": import("./en-US"), "pt-PT": import("./pt-PT") }` | Dynamic imports mapping for translations . |

Have access to settings and style context. Wrap your App with the `ConfigProvider`.

```tsx
const translations = {
  "en-US": import("./en-US"),
  "pt-PT": import("./pt-PT"),
  ...
}

...

<ConfigProvider api={{ base: "https://my-api.io" }} translations={translations}>
  <App />
</ConfigProvider>

...
```

Using settings:

```tsx
import { useConfig } from "@apisuite/fe-base";

export const MyComponent = () => {
  const { portalName } = useConfig();

  return (
    <span>Welcome to {portalName}</span>
  );
};
```

## Internationalization

i18n is provided using [react-i18next](https://react.i18next.com/). This package re-exports the necessary bits no need to install it.

| method | description |
|--------|-------------|
| changeLocale | Changes current locale and optionally registers new translations merging them deep. |
| registerTranslations | Registers new translations merging them deep. |
| useTranslation | Hook to access translations. see [react-i18next docs](https://react.i18next.com/latest/usetranslation-hook).

```tsx
import React, { useEffect } from "react";
import { useConfig, useTranslation, registerTranslations, changeLocale } from "@apisuite/fe-base";

export const MyComponent = () => {
  const { portalName } = useConfig();
  const { t, i18n } = useTranslation();

  useEffect(() => {
    // add translations programmatically
    registerTranslations("nl-BE", await import("./nl-BE.json"));

    // change selected locale
    changeLocale("nl-BE");

    console.log("Current Locale:", i18n.language);
  }, []);

  return (
    <span>{t("MyComponent.welcome", { portalName })}</span>
  );
};
```

## Style System

Styles and theme are provided using [MUI-UI](https://material-ui.com/). This package re-exports the `@material-ui/core` package no need to install it.

**Note**: You still have to handle fonts in your project. It's not handle by this package to give more flexibility in this matter.

Make styles:

```ts
// styles.ts
import { makeStyles } from "@apisuite/fe-base";

export default makeStyles((theme) => ({
  container: {
    backgroundColor: theme.palette.background.default,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});
```

Use styles:

```tsx
import { useTheme, Button } from "@apisuite/fe-base";
import useStyles from "./styles";

export const MyComponent = () => {
  const classes = useStyles();
  const { palette } = useTheme();

  return (
    <div className={classes.container}>
      <span style={{ color: palette.primary.main }}>Hello</span>
      <Button>Dummy</Button>
    </div>
  );
};
```

## Tools

### convert-translation

A `convert-translation` script is provided to help convert `json` translation files into `csv` format and back.

To use it run it from the bin folder `./node_modules/.bin/convert-translation` with a file path as argument or add it to your scripts:

```json
...
"scripts": {
  ...
  "convert-translation": "./node_modules/.bin/convert-translation"
}
...
```

Then in your terminal run:

```bash
npm run convert-translation ./translations/en-US.json # npm run convert-translation ./en-US.csv
```

**JSON File**

Normal `[key]: value` pairs object.

**CSV File**

The CSV file follows google translation service requirements, which consists in two columns without a header, where the first is the `key` and the second is the `value`. You can add more columns to give more context to the translators, `convert-translation` will only handle this two columns.

| | |
|-|-|
| MyComponent.welcome | welcome to {{portalName}}! |
| MyComponent.registerCTA | register |
| MyPage.hello | Hello World! |

<a name="release-irrelevant"></a>

<br />

## Example / Demo

@TODO

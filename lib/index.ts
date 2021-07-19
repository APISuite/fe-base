// core
export { useConfig } from "./context";
export { ConfigProvider } from "./Provider";
// TODO: this is part of a POC not yet complete
export { Router, history } from "./Router";

// translations
export { Trans, useTranslation } from "react-i18next";
export { default as i18n, changeLocale, registerTranslations } from "./i18n";

// re-exports all mui-ui core package so this is the source of truth across implementations
export * from "@material-ui/core";

// types
export * from "./types";

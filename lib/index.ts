// core
export { useConfig } from "./context";
export { ConfigProvider } from "./Provider";

// translations
export { Trans, useTranslation } from "react-i18next";
export { default as i18n, changeLocale, registerTranslations } from "./i18n";

// re-exports all mui-ui core package so this is the source of truth across implementations
export * from "@material-ui/core";
// this Button will overwrite material-ui/core/Button export
export { Button } from "./components/Button";
export { ButtonBase } from "./components/ButtonBase";

// types
export * from "./types";

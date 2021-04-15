// core
export { useConfig } from "./context";
export { ConfigProvider } from "./Provider";

// translations
export { useTranslation } from "react-i18next";
export { changeLocale, registerTranslations } from "./i18n";

// re-exports all mui-ui core package so this is the source of truth across implementations
export * from "@material-ui/core";

// types
export * from "./types";

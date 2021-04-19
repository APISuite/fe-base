import React, { FC, ReactElement } from "react";
import { render, RenderOptions } from "@testing-library/react";
import { ConfigProvider } from "../lib";

function mockImport() {
  return Promise.resolve({});
}

const Provider: FC = (props) => {
  return (
    <ConfigProvider
      api={{ base: "https://example.com" }}
      translations={{ "en-US": mockImport() }}
      {...props}
    />
  );
};

const customRender = (
  ui: ReactElement,
  options?: RenderOptions
) => render(ui, { wrapper: Provider, ...options });

export * from "@testing-library/react";
export { customRender as render };

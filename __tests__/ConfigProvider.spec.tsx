import "jest-fetch-mock";
import React from "react";
import { render, screen, waitFor } from "./test-utils";
import { DisplaySettings } from "./__mocks__/components/DisplaySettings";

import settingsMock from "./__mocks__/settings.json";
import ownerMock from "./__mocks__/owner.json";

// Reset any runtime request handlers we may add during the tests.
beforeEach(() => {
  fetchMock.resetMocks();
});

describe("ConfigProvider", () => {
  describe("settings", () => {
    test("Renders info from useConfig", async () => {
      fetchMock.mockResponses(
        [JSON.stringify(settingsMock), { status: 200 }],
        [JSON.stringify(ownerMock), { status: 200 }],
      );

      await waitFor(() => {
        render(<DisplaySettings />);
      });

      const portalName = await screen.findByTestId("portal-name");
      const ownerName = await screen.findByTestId("owner-name");

      expect(portalName.innerHTML).toBe(settingsMock.portalName);
      expect(ownerName.innerHTML).toBe(ownerMock.name);
    });
  });

  describe("i18n", () => {
    // TODO: test translations
  });

  describe("style system", () => {
    // TODO: test style system
  });
});

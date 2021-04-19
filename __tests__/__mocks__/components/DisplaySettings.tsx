import React from "react";
import { useConfig } from "../../../lib";

export function DisplaySettings() {
  const { portalName, ownerInfo } = useConfig();

  return (
    <div>
      <div data-testid="portal-name">{portalName}</div>
      <div data-testid="owner-name">{ownerInfo.name}</div>
    </div>
  );
}

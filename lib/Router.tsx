import React, { FC, useCallback, useEffect, useRef, useState } from "react";
import { Box } from "@material-ui/core";
import { RouteProps, RouterProps } from "./types";
import { createBrowserHistory, Location, State } from "history";

export const history = createBrowserHistory();

function matchComponent(route: RouteProps, levels: string[]): RouterProps["routes"]["content"] | null {
  const [curLevel, ...restLevels] = levels;
  const foundRoute = route.subRoutes?.find((subRoute) => subRoute.path === curLevel);

  if (!foundRoute) return null;

  if (levels.length > 1) {
    return matchComponent(foundRoute, restLevels);
  }

  return foundRoute.content;
}

// TODO: this is part of a POC not yet complete
export const Router: FC<RouterProps> = ({ navigation, footer, routes }) => {
  const [location, setLocation] = useState(history.location);

  const getContent = useCallback((location: Location<State>) => {
    const content = [];

    if (location.pathname === "/") {
      content.push(routes.content);
    } else {
      const levels = location.pathname.split("/").slice(1);
      const comp = matchComponent(routes, levels);

      if (comp) {
        content.push(comp);
      }
    }

    return content;
  }, [routes]);

  // Content components to render in current location
  const content = useRef<RouterProps["routes"]["content"][]>(getContent(location));

  // sync browser history with router
  useEffect(() => {
    const cleanup = history.listen(({ location }) => {
      content.current = getContent(location);

      setLocation(location);
    });

    return () => {
      cleanup();
    };
  }, [getContent]);

  console.log(location);

  return (
    <Box minHeight="100%" width="100%">
      {/* top nav */}
      <Box>{navigation}</Box>

      <Box display="flex" minHeight="100%">
        {/* side nav */}
        <Box height="100%">
          {/* TODO: get content for side nav */}
        </Box>

        {/* content */}
        <Box flex={1}>
          {content.current.map((Component, idx) => <Component key={`content-${idx}`} location={location} />)}
        </Box>
      </Box>

      {/* footer */}
      <Box>{footer}</Box>
    </Box>
  );
};

import React, { FC, useCallback, useEffect, useRef, useState } from "react";
import { Box, Dialog, Slide } from "@material-ui/core";
import { TransitionProps } from "@material-ui/core/transitions";
import { createBrowserHistory, Location, State } from "history";
import { RouterProps, SideNavigationEntry, RouterState } from "./types";

export const history = createBrowserHistory();

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

type RouterRenderInfo = {
  Content: FC<RouterState>,
  Modal: FC<RouterState> | null,
  SideNavigation: FC<RouterState> | null,
  entries: SideNavigationEntry[],
}

export const Router: FC<RouterProps> = ({ config, NotFound, Navigation, Footer }) => {
  const [location, setLocation] = useState(history.location);

  const getRenderInfo = useCallback((location: Location<State>, previousInfo?: RouterRenderInfo) => {
    const target = config[location.pathname];

    if (target) {
      const segments = location.pathname === "/" ? ["/"] : location.pathname.split("/").slice(1);
      let Content: FC<RouterState> | null = null;
      let Modal: FC<RouterState> | null = null;
      let SideNavigation: FC<RouterState> | null = null;
      let entries: SideNavigationEntry[] = [];

      // modals render content behind them so we need fallback content from config if no previous info provided
      if (target.contentType === "modal") {
        // if previous info we only need to change modal information
        if (previousInfo) {
          return {...previousInfo, Modal: target.content};
        }

        // build from config
        Modal = target.content;

        // pop the modal segment and normalize the main content rendering
        segments.pop();
        Content = config[`/${segments.join("/")}`]?.content ?? NotFound;
      } else {
        Content = target.content;
      }

      // find the first navigation type in segments
      let path = "";

      for (let i = 0; i < segments.length; i++) {
        path += `/${segments[i]}`;

        if (config[path]?.contentType === "navigation") {
          SideNavigation = config[path].content;

          // find all entries under this navigation - only contentType === "main" are eligible
          const keys = Object.keys(config)
            .filter((key) => key.startsWith(`${path}/`) && config[key]?.contentType === "main");
          entries = keys.map((key) => ({
            to: key,
            active: key === location.pathname,
            fallback: config[key].fallback,
            key: config[key].key,
          }));

          // default content to the next key content or `NotFound` component, if in exact path of navigation.
          if (path === location.pathname) {
            Content = config[keys[0]]?.content ?? NotFound;
          }

          break;
        }
      }

      return { Content, SideNavigation, Modal, entries };
    } else {
      return { Content: NotFound, SideNavigation: null, Modal: null, entries: [] };
    }
  }, [config, NotFound]);

  const renderInfo = useRef(getRenderInfo(location));

  // sync browser history with router
  useEffect(() => {
    const cleanup = history.listen(({ location }) => {
      renderInfo.current = getRenderInfo(location, renderInfo.current);

      setLocation(location);
    });

    return () => {
      cleanup();
    };
  }, [getRenderInfo]);

  const { Content, SideNavigation, Modal, entries } = renderInfo.current;

  return (
    <>
      <Box minHeight="100%" width="100%">
        {Navigation && (
          <Box>
            <Navigation router={{ location, sideNavEntries: [] }} />
          </Box>
        )}

        <Box display="flex" minHeight="100%">
          {SideNavigation && (
            <Box height="100%">
              <SideNavigation router={{ location, sideNavEntries: entries }} />
            </Box>
          )}

          <Box flex={1}>
            <Content router={{ location, sideNavEntries: [] }} />
          </Box>
        </Box>

        {Footer && (
          <Box>
            <Footer router={{ location, sideNavEntries: [] }} />
          </Box>
        )}
      </Box>

      <Dialog
        open={!!Modal}
        fullScreen
        TransitionComponent={Transition}
        onClose={() => history.back()}
      >
        {Modal && <Modal router={{ location, sideNavEntries: [] }} />}
      </Dialog>
    </>
  );
};

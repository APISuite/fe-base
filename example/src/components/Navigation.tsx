import React, { FC } from "react";
import { RouterState, Box, Typography, useTheme, history } from "@apisuite/fe-base";

export const Navigation: FC<RouterState> = () => {
  const { palette } = useTheme();
  return (
    <Box
      display="flex"
      p={2}
      color={palette.secondary.contrastText}
      style={{ background: palette.secondary.main }}
    >
      <Typography variant="h3">
        Portal Name
      </Typography>
      <Box flex={1} />
      <Box
        clone
        style={{ cursor: "pointer" }}
        onClick={() => history.push("/login")}
      >
        <Typography variant="button">Login</Typography>
      </Box>
    </Box>
  );
};

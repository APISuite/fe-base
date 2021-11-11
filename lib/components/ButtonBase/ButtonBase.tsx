import React, { FC } from "react";
import { ButtonBase as Btn, ButtonBaseProps, makeStyles, useTheme } from "@material-ui/core";
import clsx from "clsx";

export const ButtonBase: FC<{ rounded?: boolean } & ButtonBaseProps> = ({
  children,
  className,
  rounded = false,
  ...rest
}) => {
  const { custom } = useTheme();
  const useStyles = makeStyles({
    rounded: {
      // using a high value for large buttons, for most cases a 28px should be enough
      borderRadius: "250px",
    },
  });
  const classes = useStyles();

  return (
    <Btn {...rest} className={clsx(className, { [classes.rounded]: rounded || custom?.button?.rounded })}>
      {children}
    </Btn>
  );
};

import React, { FC } from "react";
import { Button as Btn, ButtonProps, makeStyles, useTheme } from "@material-ui/core";
import clsx from "clsx";

export const Button: FC<{ rounded?: boolean } & ButtonProps> = ({
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

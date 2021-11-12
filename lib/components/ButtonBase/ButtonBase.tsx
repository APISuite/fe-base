import React, { FC } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import MuiButtonBase, { ButtonBaseProps as MuiButtonBaseProps } from "@material-ui/core/ButtonBase";
import clsx from "clsx";

interface Props {
  rounded?: boolean;
}

export const ButtonBase: FC<Props & MuiButtonBaseProps<React.ElementType, { component?: React.ElementType }>> = ({
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
    <MuiButtonBase
      className={clsx(className, { [classes.rounded]: rounded || custom?.button?.rounded })}
      {...rest}
    />
  );
};

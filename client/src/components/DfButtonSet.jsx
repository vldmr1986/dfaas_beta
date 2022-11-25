import React, { useContext } from "react";
import { Box, ResponsiveContext } from "grommet";
import { isSmallSize } from "../utils";

export const DfButtonSet = (props) => {
  const { children, justify, stack } = props;
  const size = useContext(ResponsiveContext);

  const getDirection = () => {
    let direction = "row";
    if (isSmallSize(size) && stack) {
      if (justify === "end") {
        direction = "column";
      } else {
        direction = "column-reverse";
      }
    }
    return direction;
  };

  return (
    <Box
      flex={false}
      direction={getDirection()}
      justify={justify}
      gap="small"
      pad={{ top: "medium" }}
    >
      {children}
    </Box>
  );
};

DfButtonSet.defaultProps = {
  justify: "start",
  stack: false,
};

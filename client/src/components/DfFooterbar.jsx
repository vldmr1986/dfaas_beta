import React, { useContext } from "react";
import { Box, Footer, ResponsiveContext, Text } from "grommet";
import { isSmallSize } from "../utils";

const DfFooterbar = () => {
  const size = useContext(ResponsiveContext);
  return (
    <Footer
      direction={!isSmallSize(size) ? "row" : "column"}
      align={!isSmallSize(size) ? "center" : undefined}
      pad={{ vertical: "small" }}
      fill="horizontal"
    >
      <Box align={isSmallSize(size) ? "center" : undefined}>
        <Text size="small">
          © 2022 Hewlett Packard Enterprise Development LP
        </Text>
      </Box>
    </Footer>
  );
};

export { DfFooterbar };
